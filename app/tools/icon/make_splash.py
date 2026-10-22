"""make_splash.py — the iPhone and iPad launch screens (apple-touch-startup-image), and the <link> tags for them.

    python3 app/tools/icon/make_splash.py      (needs Pillow)

An app opened from the iOS Home Screen shows a launch image until the page's first paint. iOS ignores the manifest's
background colour and icons for this (Android builds its splash from them), so without these images the screen stays
blank white. iOS uses an image only when its <link media> names the device's exact CSS size and pixel ratio, so there
is one image per screen size: iPhones in portrait only (the iPhone Home Screen does not rotate, so a Home Screen app
always starts upright), iPads in both orientations.

Each image is the app icon (public/icons/icon-512.png) centred on the page's own background, light or dark, so the
launch image turns into the app's first screen without a jump. The light links carry no colour-scheme condition and
come first; the dark ones add (prefers-color-scheme: dark) and come after, so a dark phone takes the dark image and an
iOS that ignored the condition would still show the light one, never white. iOS reads these when the app is added to
the Home Screen, so an app added before they existed shows them once it is removed and added again.

The script writes public/splash/*.png and rewrites the block between the splash markers in public/index.html.
The images are not precached by the service worker (build-site.mjs): a phone fetches only its own when it is added.
"""
from pathlib import Path

from PIL import Image

APP = Path(__file__).resolve().parents[2]
ICON = APP / "public/icons/icon-512.png"
OUT = APP / "public/splash"
INDEX = APP / "public/index.html"
START, END = "<!-- splash:start (tools/icon/make_splash.py) -->", "<!-- splash:end -->"

# the page's background (app.css --bg, as Chromium renders it): light oklch(97.4% 0.006 85), dark oklch(11.5% 0.012 150)
THEMES = {"light": (0xF8, 0xF6, 0xF2), "dark": (0x03, 0x06, 0x04)}

# CSS size in portrait (device-width x device-height), pixel ratio. Apple's launch screen sizes (Human Interface
# Guidelines), reduced to the distinct CSS sizes iOS matches on; the 12 mini and 13 mini report 375x812 at 3x.
IPHONES = [
    (440, 956, 3),   # 18 Pro Max, 17 Pro Max, 16 Pro Max
    (402, 874, 3),   # 18 Pro, 17, 17 Pro, 16 Pro
    (420, 912, 3),   # Air
    (430, 932, 3),   # 16 Plus, 15 Plus, 15 Pro Max, 14 Pro Max
    (393, 852, 3),   # 16, 15, 15 Pro, 14 Pro
    (390, 844, 3),   # 16e, 14, 13, 13 Pro, 12, 12 Pro
    (428, 926, 3),   # 14 Plus, 13 Pro Max, 12 Pro Max
    (375, 812, 3),   # X, XS, 11 Pro, 12 mini, 13 mini
    (414, 896, 3),   # XS Max, 11 Pro Max
    (414, 896, 2),   # XR, 11
    (414, 736, 3),   # 6s Plus, 7 Plus, 8 Plus
    (375, 667, 2),   # 6s, 7, 8, SE (2nd and 3rd generation)
    (320, 568, 2),   # SE (1st generation)
]
IPADS = [
    (1032, 1376, 2),  # Pro 13-inch (M4 and later)
    (1024, 1366, 2),  # Pro 12.9-inch, Air 13-inch
    (834, 1210, 2),   # Pro 11-inch (M4 and later)
    (834, 1194, 2),   # Pro 11-inch (1st to 4th generation)
    (834, 1112, 2),   # Pro 10.5-inch, Air 10.5-inch
    (820, 1180, 2),   # Air 10.9-inch and 11-inch, iPad 10th generation and 11-inch
    (810, 1080, 2),   # iPad 10.2-inch
    (768, 1024, 2),   # iPad 9.7-inch, mini 7.9-inch
    (744, 1133, 2),   # mini 8.3-inch
]
LOGO_PT = {"phone": 120, "tablet": 160}   # the icon's size in CSS points: a third of a phone's width, smaller on an iPad


def screens():
    """(kind, css w, css h, ratio, orientation) for every image, in the order the links are written: landscape before
    portrait for each iPad (with an iOS that ignored the orientation, the later portrait link wins)."""
    for w, h, r in IPADS:
        yield "tablet", w, h, r, "landscape"
        yield "tablet", w, h, r, "portrait"
    for w, h, r in IPHONES:
        yield "phone", w, h, r, "portrait"


def name(w, h, r, orient, theme):
    return f"{w}x{h}@{r}x-{orient}{'-dark' if theme == 'dark' else ''}.png"


def image(kind, w, h, r, orient, theme, icon):
    pw, ph = (h * r, w * r) if orient == "landscape" else (w * r, h * r)
    canvas = Image.new("RGB", (pw, ph), THEMES[theme])
    s = LOGO_PT[kind] * r
    logo = icon.resize((s, s), Image.LANCZOS)
    canvas.paste(logo, ((pw - s) // 2, (ph - s) // 2), logo)
    # 256 colours, dithered: the same picture at about a third of the bytes (the gloss has few distinct colours); the
    # background must stay the page's exact colour, or the launch image would not blend into the first screen
    q = canvas.quantize(256, method=Image.Quantize.MEDIANCUT, dither=Image.Dither.FLOYDSTEINBERG)
    rgb = q.convert("RGB")
    return q if all(rgb.getpixel(p) == THEMES[theme] for p in ((0, 0), (pw - 1, ph - 1), (pw // 2, ph // 10))) else canvas


def media(w, h, r, orient, theme):
    m = f"screen and (device-width: {w}px) and (device-height: {h}px) and (-webkit-device-pixel-ratio: {r}) and (orientation: {orient})"
    return m + (" and (prefers-color-scheme: dark)" if theme == "dark" else "")


def main():
    icon = Image.open(ICON).convert("RGBA")
    OUT.mkdir(parents=True, exist_ok=True)
    for old in OUT.glob("*.png"):
        old.unlink()
    links, total = [], 0
    for theme in ("light", "dark"):
        for kind, w, h, r, orient in screens():
            f = OUT / name(w, h, r, orient, theme)
            image(kind, w, h, r, orient, theme, icon).save(f, optimize=True)
            total += f.stat().st_size
            links.append(f'  <link rel="apple-touch-startup-image" href="./splash/{f.name}" media="{media(w, h, r, orient, theme)}">')
    html = INDEX.read_text()
    a, b = html.index(START), html.index(END)
    INDEX.write_text(html[:a] + START + "\n" + "\n".join(links) + "\n  " + html[b:])
    print(f"{len(links)} launch images, {total // 1024} KB in {OUT.relative_to(APP)}; links written to {INDEX.relative_to(APP)}")


if __name__ == "__main__":
    main()
