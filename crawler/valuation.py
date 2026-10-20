"""Price sanity and equivalent values (docs/DECISIONS.md, 2026-10-08).

An item price outside a plausible range for its department is withheld: it stays in the snapshot as Walmart listed it
(`price`, for history and audits) but the app never shows it. The row carries `price_withheld` and an equivalent value
(`equiv`) instead, so a scan of that item is never blank:

  1. the closest comparable item (same category, the most name tokens in common, same base unit), scaled to this item's
     size when both have a per-unit price;
  2. else the median per-unit price of comparable items (qa.unit_price_medians) times this item's size;
  3. else the median price of the same kind of item (the product noun of its title, within its category);
  4. else the median price of the item's category in its department.
Whenever the item's kind has a median, a value more than 10x away from it is rejected and the next method is tried, so
a massage chair is never valued like a bottle of aspirin.

A price is withheld when it is outside [floor, min(cap, over_p99 x the department's 99th percentile price)] for its
department (data/gates.json "price_sanity"), or when both the price and the price per unit are more than 20x below
comparable items (the price against the same kind of item; the per-unit price against the aisle and against the same kind): Pampers 162 ct at $0.98, melatonin 90 ct at $0.16. A low
price alone is not enough: a single ramen cup is meant to cost less than the 12-packs around it. Placeholder listings
(barcode only) whose own price fails the range are dropped instead: there is nothing to show for them.

Since 2026-10-19 a price more than HIGH_FACTOR times the median price of the same kind of item in its category (the
product noun of its title; at least KIND_MIN rows) is withheld as well, unless the row's per-unit price sits within
HIGH_FACTOR of its kind's per-unit median (a large size, not an error): 24 allergy tablets at $460.58 beside tablets
around $15. The crawl itself keeps no consumable listing above $150 (data/categories.json consumable_rules.max_price),
so this rule covers what the ceiling leaves.

Since 2026-10-19 a price is also withheld when it is more than SIBLING_FACTOR times the median price of the item's own
in-stock siblings: the same brand, kind, weight or volume (never a count: too coarse), pack and variant words (flavours
and colours aside), at least SIBLING_MIN of them in stock. Walmart's feed carries stale flavour listings of one product line at several times the line's price
(a single 12 fl oz CELSIUS can at $7.69-$9.37 beside twenty flavours at $2.28-$2.57); the equivalent value is then the
closest comparable item, in practice a sibling. Only the high side: a lower price may be a real rollback, and the
measured spread within families is wide enough (battery sizes, razor models sharing one count) that a tighter or
two-sided rule would overwrite real prices.
"""
import math, re, statistics
from collections import Counter, defaultdict

from .identify import tokens as name_tokens, WALMART_STORE_BRANDS

MATCH_MIN = 0.45
KIND_MIN = 30          # rows of one kind of item before its median price is used
KIND_BAND = 10         # an equivalent value within 10x of its kind's median
LOW_FACTOR = 20        # a price and a per-unit price both this far below comparable items are withheld
HIGH_FACTOR = 10       # a price this far above the median of the same kind of item (and its per-unit price, when it has one) is withheld
SIBLING_FACTOR = 2.5   # a price this far above the in-stock listings of the same item (brand, kind, size, pack, variants) is withheld
SIBLING_MIN = 3        # ... when at least this many in-stock siblings set the reference


def kind_medians(rows):
    """{(category, kind): median price} over trusted rows (rows carry `_kind` while process.build runs)."""
    groups = defaultdict(list)
    for r in rows:
        k = r.get("_kind")
        if k and not r.get("price_withheld") and "placeholder" not in r.get("flags", []) and isinstance(r.get("price"), (int, float)):
            groups[(r["cat"], k)].append(r["price"])
    return {k: statistics.median(v) for k, v in groups.items() if len(v) >= KIND_MIN}


def _quantile(sorted_vals, q):
    if not sorted_vals:
        return None
    return sorted_vals[min(len(sorted_vals) - 1, int(q * len(sorted_vals)))]


def bounds(rows, cfg):
    """{department: (low, high, p99)} from this snapshot's prices."""
    sanity = cfg.get("price_sanity") or {}
    floor = float(sanity.get("floor", 0.10))
    over = float(sanity.get("over_p99", 5))
    caps = sanity.get("caps") or {}
    prices = defaultdict(list)
    for r in rows:
        if "placeholder" not in r.get("flags", []) and isinstance(r.get("price"), (int, float)) and r["price"] > 0:
            prices[r["dept"]].append(r["price"])
    out = {}
    for dept, vals in prices.items():
        vals.sort()
        p99 = _quantile(vals, 0.99)
        cap = float(caps.get(dept, caps.get("default", 5000)))
        out[dept] = (floor, round(min(cap, over * p99), 2), p99)
    return out


def _confidence(score):
    return "high" if score >= 0.7 else "medium" if score >= 0.55 else "low"


class Valuer:
    """Equivalent values for withheld rows, from the rows whose prices are trusted."""

    def __init__(self, rows, group_min=50, cats=None):
        """cats: the categories that hold rows to value. Only their trusted rows get a token index (a comparable item
        is always looked up within the row's own category); medians cover every trusted row. On the real crawl the
        index over every row was the build's largest allocation (4.2 -> 6.8 GB) for ~2k withheld rows."""
        from .qa import unit_price_medians
        self.trusted = [r for r in rows if not r.get("price_withheld") and "placeholder" not in r.get("flags", [])
                        and "unit_price_suspect" not in r.get("flags", []) and isinstance(r.get("price"), (int, float))]
        self.median_lookup = unit_price_medians(self.trusted, group_min)
        self.index = defaultdict(list)
        self.toks = {}
        by_cat = defaultdict(list)
        for i, r in enumerate(self.trusted):
            by_cat[(r["dept"], r["cat"])].append(r["price"])
            if cats is not None and r["cat"] not in cats:
                continue
            t = name_tokens(r["name"], r.get("brand"))
            self.toks[i] = t
            for w in t:
                self.index[(r["cat"], w)].append(i)
        self.df = Counter({k: len(v) for k, v in self.index.items()})
        self.cat_median = {k: statistics.median(v) for k, v in by_cat.items() if v}
        self.kind_median = kind_medians(self.trusted)

    def value(self, row, low, high):
        """{"price", "method", "confidence", "basis_id", "basis_name"} for a withheld row; never None."""
        km = self.kind_median.get((row.get("cat"), row.get("_kind")))
        if km:                                        # every method's value must be believable for this kind of item
            low, high = max(low, km / KIND_BAND), min(high, km * KIND_BAND)
        qty, pack = row.get("base_qty"), row.get("pack") or 1
        pt = name_tokens(row["name"], row.get("brand"))
        cands = set()
        for w in sorted(pt, key=lambda w: self.df.get((row["cat"], w), 0))[:4]:
            n = self.df.get((row["cat"], w), 0)
            if 0 < n < 20000:
                cands.update(self.index[(row["cat"], w)])
        best, best_score = None, 0.0
        for i in cands:
            r = self.trusted[i]
            if r["id"] == row["id"]:
                continue
            if qty and r.get("base_unit") and r["base_unit"] != row.get("base_unit"):
                continue
            j = len(pt & self.toks[i]) / max(1, len(pt | self.toks[i]))
            rb, b = (r.get("brand") or "").lower(), (row.get("brand") or "").lower()
            if b and rb == b:
                j += 0.2
            elif rb in WALMART_STORE_BRANDS and b in WALMART_STORE_BRANDS:
                j += 0.1
            if qty and r.get("base_qty"):
                j += 0.1 * min(qty, r["base_qty"]) / max(qty, r["base_qty"])
            if j > best_score:
                best, best_score = r, j
        if best is not None and best_score >= MATCH_MIN:
            est = best["unit_price"] * qty * pack if qty and best.get("unit_price") else best["price"]
            if low <= est <= high:
                return {"price": round(est, 2), "method": "comparable item", "confidence": _confidence(best_score),
                        "basis_id": best["id"], "basis_name": best["name"]}
        if qty:
            med = self.median_lookup(row)[0]
            if med:
                est = med * qty * pack
                if low <= est <= high:
                    return {"price": round(est, 2), "method": "median per-unit price of comparable items",
                            "confidence": "low", "basis_id": None, "basis_name": None}
        if km:
            return {"price": round(km, 2), "method": "median price of the same kind of item", "confidence": "rough",
                    "basis_id": None, "basis_name": None}
        med = self.cat_median.get((row["dept"], row["cat"]))
        if med is None:
            pool = [p for (d, _), p in self.cat_median.items() if d == row["dept"]]
            med = statistics.median(pool) if pool else low
        return {"price": round(min(max(med, low), high), 2), "method": "median price of its category",
                "confidence": "rough", "basis_id": None, "basis_name": None}


def apply(rows, cfg, group_min=50):
    """Withhold implausible prices and attach equivalent values. rows is a dict id -> row and is changed in place.
    Returns (withheld list for the report, bounds, dropped placeholder ids)."""
    b, dropped = withhold(rows, cfg, group_min)
    withhold_sibling_outliers(rows.values())
    withhold_kind_outliers(rows.values())
    return attach_values(rows, b, group_min), {d: {"low": lo, "high": hi, "p99": p99} for d, (lo, hi, p99) in b.items()}, dropped


POS_NAME_MAX = 20          # Walmart's register names are cut at 20 characters


def withhold(rows, cfg, group_min=50):
    """Flag every price outside its department's plausible range (price_withheld, no per-unit price) and drop
    placeholder listings with such a price. Runs before the per-unit outlier check so an absurd price is not counted
    as a parsing problem. Returns (bounds, dropped (id, department, reason) triples)."""
    b = bounds(rows.values(), cfg)
    dropped = []
    for iid, r in list(rows.items()):
        lo, hi, _ = b.get(r["dept"], (0.10, 5000, None))
        p = r.get("price")
        if isinstance(p, (int, float)) and lo <= p <= hi:
            continue
        if "placeholder" in r.get("flags", []):
            dropped.append((iid, r["dept"], "placeholder_price"))  # barcode-only listings need a plausible price
            del rows[iid]
            continue
        if isinstance(p, (int, float)) and p > hi and len(r.get("name") or "") <= POS_NAME_MAX:
            # a register-length name priced far above anything in its department ("Old El Paso Bold/Pri" at $1,042,
            # "Premier Protein 6pk" at $1,783): a pre-packed display or pallet listed under its truncated POS name
            dropped.append((iid, r["dept"], "store_display"))
            del rows[iid]
            continue
        _withhold(r)
    # far below comparable items in both price and price per unit: a feed error, not a cheap product
    from .qa import unit_price_medians
    kmed = kind_medians(rows.values())
    priced = [r for r in rows.values() if isinstance(r.get("unit_price"), (int, float)) and r["unit_price"] > 0]
    umed = unit_price_medians(priced, group_min)
    kind_units = defaultdict(list)                     # per-unit price of the same kind of item, same unit
    for r in priced:
        if r.get("_kind") and not r.get("price_withheld") and "placeholder" not in r.get("flags", []):
            kind_units[(r["cat"], r["_kind"], r["base_unit"])].append(r["unit_price"])
    kumed = {k: statistics.median(v) for k, v in kind_units.items() if len(v) >= KIND_MIN}
    peers = defaultdict(list)                          # same brand, same kind of item: corroborating listings
    for r in rows.values():
        if r.get("brand") and r.get("_kind") and isinstance(r.get("price"), (int, float)):
            peers[(r["brand"].strip().lower(), r["_kind"])].append(r)
    for r in priced:
        if r.get("price_withheld") or "placeholder" in r.get("flags", []):
            continue
        km, um = kmed.get((r["cat"], r.get("_kind"))), umed(r)[0]
        kum = kumed.get((r["cat"], r.get("_kind"), r.get("base_unit")))
        # all three: the item price against its kind, its per-unit price against its aisle and against its kind (a
        # 1 L tonic water is cheap per ounce next to the aisle's 7.5 oz cans, but not next to other tonic water)
        if km and um and kum and r["price"] < km / LOW_FACTOR and r["unit_price"] < um / LOW_FACTOR and r["unit_price"] < kum / LOW_FACTOR \
                and not _corroborated(r, peers):
            _withhold(r)
    return b, dropped


def withhold_sibling_outliers(rows):
    """Withhold the rows priced far above their own in-stock siblings (the other flavours of one product line): stale
    listings. Runs after process.resolve_packs, so a case whose pack count the name supports is read as a case first.
    Returns the rows withheld."""
    out = sibling_outliers(rows)
    for r in out:
        _withhold(r)
        r["_why"] = "far above the same item's other variants"
    return out


def withhold_kind_outliers(rows):
    """Withhold every price far above the same kind of item (2026-10-19): a stale or mislabelled listing, such as 24
    allergy tablets at $460.58 beside 2,000 listings of tablets around $15, or a box of dryer sheets at $489.60. The item
    price is judged against its kind's median and, when the row has a per-unit price and its kind a per-unit median,
    that too, so a large size (a 34 oz salon conditioner at ten times the 8.5 oz price) is not mistaken for an error.
    Runs after process.resolve_packs, so a case the name supports is read as a case first; durable goods (process.build
    marks `_durable`) are left alone. Measured on the published snapshot under the $150 ceiling, bundles read as units:
    4,269 rows (0.17%), 97% of them out of stock. rows: an iterable of rows."""
    rows = list(rows)
    kmed = kind_medians(rows)
    kind_units = defaultdict(list)
    for r in rows:
        if r.get("_kind") and not r.get("price_withheld") and "placeholder" not in r.get("flags", []) \
                and isinstance(r.get("unit_price"), (int, float)) and r["unit_price"] > 0:
            kind_units[(r["cat"], r["_kind"], r["base_unit"])].append(r["unit_price"])
    kumed = {k: statistics.median(v) for k, v in kind_units.items() if len(v) >= KIND_MIN}
    for r in rows:
        if r.get("price_withheld") or "placeholder" in r.get("flags", []) or not isinstance(r.get("price"), (int, float)):
            continue
        if r.get("_durable"):
            continue                    # an electric toothbrush beside manual ones, a hair dryer: a model, not an error
        km = kmed.get((r["cat"], r.get("_kind")))
        if not km or r["price"] <= km * HIGH_FACTOR:
            continue
        kum = kumed.get((r["cat"], r.get("_kind"), r.get("base_unit")))
        up = r.get("unit_price")
        if isinstance(up, (int, float)) and up > 0 and kum and up <= kum * HIGH_FACTOR:
            continue
        _withhold(r)
        r["_why"] = "far above the same kind of item"


# ---- variant families (2026-10-20): the flavours, scents and colours of one product line
FAMILY_MAX_GROUP = 400     # brand+size groups larger than this are a catalogue, not a line (and the pairing is quadratic)
FAMILY_MIN_AGREE = 3       # in-stock members that must share one price before it is the line's price
FAMILY_TOL = 0.02          # a member within this of the line's price is at the line's price
_TOK = re.compile(r"[a-z0-9]+")


def _one_run_diff(a, b):
    """Two token lists that are equal except for one contiguous run of at most three tokens on each side (a flavour,
    a scent, a colour), with at least three tokens shared around it."""
    i = 0
    while i < len(a) and i < len(b) and a[i] == b[i]:
        i += 1
    j = 0
    while j < len(a) - i and j < len(b) - i and a[-1 - j] == b[-1 - j]:
        j += 1
    ra, rb = len(a) - i - j, len(b) - i - j
    return 0 <= ra <= 3 and 0 <= rb <= 3 and (ra or rb) and (i + j) >= 3


def variant_families(rows, consumable_depts=None):
    """Lists of rows that are one product line: same brand, category, size and pack, names that differ in one run of
    at most three tokens. Placeholders, withheld rows and rows priced from the store's shelf are left out; so is every
    department outside `consumable_depts` when given."""
    groups = defaultdict(list)
    for r in rows:
        flags = r.get("flags") or []
        if "placeholder" in flags or "store_price" in flags or r.get("price_withheld"):
            continue
        if not r.get("brand") or not r.get("base_qty") or not isinstance(r.get("price"), (int, float)) or r["price"] <= 0:
            continue
        if consumable_depts is not None and r.get("dept") not in consumable_depts:
            continue
        groups[(r["brand"].strip().lower(), r.get("cat"), r.get("base_unit"), round(r["base_qty"], 2), r.get("pack") or 1)].append(r)
    fams = []
    for rs in groups.values():
        if len(rs) < FAMILY_MIN_AGREE or len(rs) > FAMILY_MAX_GROUP:
            continue
        toks = [_TOK.findall((r.get("name") or "").lower()) for r in rs]
        parent = list(range(len(rs)))

        def find(x):
            while parent[x] != x:
                parent[x] = parent[parent[x]]
                x = parent[x]
            return x
        for i in range(len(rs)):
            for j in range(i + 1, len(rs)):
                if _one_run_diff(toks[i], toks[j]):
                    parent[find(i)] = find(j)
        by = defaultdict(list)
        for i in range(len(rs)):
            by[find(i)].append(rs[i])
        fams.extend(v for v in by.values() if len(v) >= FAMILY_MIN_AGREE)
    return fams


def apply_family_prices(rows, consumable_depts=None):
    """Give every out-of-stock member of a product line the price its in-stock members agree on (owner's case,
    2026-10-20: 32 CELSIUS flavours, every in-stock one at $2.57, the out-of-stock ones at $2.28 and $4.40-$9.37).
    Measured on the published snapshot: across true variant families, out-of-stock members sit off the line's price
    70% of the time, in-stock members 37%, and flagged rollbacks explain 3 of 7,000; an out-of-stock listing's price is
    simply old. The line's price is the most common price among in-stock members when at least FAMILY_MIN_AGREE of
    them, and half or more, share it; in-stock members keep their own price (it is current, and may be a real rollback).
    The listing's own price stays in `family_price_from`; the row is flagged `family_price`. Returns (rows changed,
    families used)."""
    changed = used = 0
    for fam in variant_families(rows, consumable_depts):
        ins = [r for r in fam if r.get("stock") == "Available"]
        if len(ins) < FAMILY_MIN_AGREE:
            continue
        mode, n = Counter(r["price"] for r in ins).most_common(1)[0]
        if n < FAMILY_MIN_AGREE or n * 2 < len(ins):
            continue
        used += 1
        for r in fam:
            if r.get("stock") == "Available" or abs(r["price"] - mode) / mode <= FAMILY_TOL:
                continue
            r["family_price_from"] = r["price"]
            r["price"] = mode
            if isinstance(r.get("unit_price"), (int, float)) and r.get("base_qty"):
                r["unit_price"] = round(mode / (r["base_qty"] * (r.get("pack") or 1)), 4)
            if "pack_listing" in r.get("flags", []) and r.get("listing_pack"):
                r["listing_price"] = round(mode * r["listing_pack"], 2)      # the bundle's price follows its unit
            r["flags"].append("family_price")
            changed += 1
    return changed, used


def _sibling_key(r):
    # a weight or volume names the item precisely enough; a count does not (an Oral-B iO electric brush and a manual one
    # are both "toothbrush, 1 ct": measured 2026-10-19, the count-sized families are where the rule would be wrong)
    if not r.get("brand") or not r.get("_kind") or not r.get("base_qty") or r.get("base_unit") not in ("oz", "fl oz"):
        return None
    return (r["brand"].strip().lower(), r["_kind"], r["base_unit"], round(float(r["base_qty"]), 2), r.get("pack") or 1,
            tuple(r.get("variants") or ()), r.get("dept"))


def sibling_outliers(rows, factor=SIBLING_FACTOR, min_in_stock=SIBLING_MIN):
    """Rows priced more than `factor` times the median of their in-stock siblings (same brand, kind, weight or volume,
    pack and variant words; at least `min_in_stock` of them in stock, placeholders and withheld rows aside). Measured on
    the 2026-10-13 snapshot at 2.5x: about 1,000 rows once bundle listings are read as units, stale flavour and scent
    listings of consumer lines (a 12 fl oz CELSIUS can at $7.69-$9.37, Softsoap 7.5 fl oz at $3.18 beside $1.24)."""
    fam = defaultdict(list)
    for r in rows:
        if r.get("price_withheld") or "placeholder" in (r.get("flags") or ()) or not isinstance(r.get("price"), (int, float)):
            continue
        k = _sibling_key(r)
        if k:
            fam[k].append(r)
    out = []
    for members in fam.values():
        in_stock = [m["price"] for m in members if (m.get("store_stock") or m.get("stock")) == "Available"]
        if len(in_stock) < min_in_stock:
            continue
        ref = statistics.median(in_stock)
        out.extend(m for m in members if ref > 0 and m["price"] > factor * ref)
    return out


def _corroborated(r, peers):
    """Another listing of the same brand, kind and size (within 10%) at a similar price (within 2x): the low price is
    the brand's real price, not a feed error (Great Value Tonic Water and Diet Tonic Water, 33.8 fl oz, both $0.67)."""
    if not r.get("brand") or not r.get("base_qty"):
        return False
    for o in peers.get((r["brand"].strip().lower(), r.get("_kind")), ()):
        if o is r or not o.get("base_qty") or o.get("base_unit") != r.get("base_unit"):
            continue
        same_size = abs(o["base_qty"] * (o.get("pack") or 1) - r["base_qty"] * (r.get("pack") or 1)) <= 0.1 * r["base_qty"] * (r.get("pack") or 1)
        if same_size and r["price"] / 2 <= o["price"] <= r["price"] * 2:
            return True
    return False


def _withhold(r):
    r["price_withheld"] = True
    r["unit_price"] = None
    if "price_withheld" not in r["flags"]:
        r["flags"].append("price_withheld")


def attach_values(rows, b, group_min=50):
    """Value every withheld row at an equivalent (Valuer), once per-unit prices are final. Returns the withheld list
    for the report, sorted by department and raw price."""
    withheld = []
    todo = [r for r in rows.values() if r.get("price_withheld")]
    if not todo:
        return withheld
    valuer = Valuer(rows.values(), group_min, cats={r["cat"] for r in todo})
    for r in todo:
        lo, hi, _ = b.get(r["dept"], (0.10, 5000, None))
        r["equiv"] = valuer.value(r, lo, hi)
        why = r.pop("_why", None) or ("above range" if r["price"] > hi else "below range" if r["price"] < lo else "far below comparable items")
        withheld.append({"id": r["id"], "upc": r.get("upc"), "name": r["name"], "dept": r["dept"], "raw_price": r["price"], "why": why,
                         "range": [lo, hi], "value": r["equiv"]["price"], "method": r["equiv"]["method"],
                         "basis": r["equiv"]["basis_name"]})
    withheld.sort(key=lambda w: (w["dept"], -(w["raw_price"] or 0)))
    return withheld
