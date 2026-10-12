"""make_icons.py — build every app icon from tools/icon/source.png (the owner-supplied artwork).

    python3 app/tools/icon/make_icons.py      (needs Pillow, numpy, scipy)

The artwork is a glossy rounded tile drawn on a baked-in checkerboard. Two families come out of it:
  * bezel   — the tile exactly as drawn, background made transparent, for "any"-purpose icons (browser,
              desktop install, favicon). Platforms show these as-is.
  * full    — the tile's face filling the whole square with the drawn bezel removed, for platforms that
              apply their own mask (iOS home screen, Android adaptive/maskable, App Store, Play Store).
              A drawn rounded edge inside the platform's own rounded mask would show as a double frame.
Only public/icons/* is shipped (and precached); store-icons/ is for store listings and never deployed.
"""
from collections import deque
from pathlib import Path

import numpy as np
from PIL import Image, ImageDraw, ImageFilter
from scipy import ndimage

APP = Path(__file__).resolve().parents[2]
SRC = APP / "tools/icon/source.png"
PUB = APP / "public/icons"
STORE = APP / "store-icons"
L = Image.LANCZOS
CROP = 34         # px (source scale) cut from each side of the tile for the full-bleed face
KEEP = 96         # px (source scale): face pixels closer than this to the outline (rim, bevel, bottom lip) are rebuilt
SCALE = 0.74      # maskable: face size relative to the icon, so the brackets clear Android's 80% safe circle


def tile_alpha(rgb):
    """Flood-fill the checkerboard (bright, unsaturated) from the image border; everything else is the tile."""
    H, W, _ = rgb.shape
    bg = (rgb.max(2) - rgb.min(2) < 18) & (rgb.min(2) > 200)
    seen = np.zeros((H, W), bool)
    q = deque([(y, x) for x in range(W) for y in (0, H - 1)] + [(y, x) for y in range(H) for x in (0, W - 1)])
    while q:
        y, x = q.popleft()
        if 0 <= y < H and 0 <= x < W and bg[y, x] and not seen[y, x]:
            seen[y, x] = True
            q.extend(((y + 1, x), (y - 1, x), (y, x + 1), (y, x - 1)))
    alpha = np.where(seen, 0, 255).astype(np.uint8)
    soft = np.asarray(Image.fromarray(alpha).filter(ImageFilter.GaussianBlur(0.8)))
    edge = (alpha == 255) & (soft < 255)
    return np.where(edge, np.maximum(soft, 128), alpha).astype(np.uint8)


def bezel_tile(rgb, alpha):
    """The tile cropped to its outline and squared (the drawing is 1221x1208; a 1% stretch makes it square)."""
    ys, xs = np.where(alpha > 0)
    box = (xs.min(), ys.min(), xs.max() + 1, ys.max() + 1)
    tile = Image.fromarray(np.dstack([rgb, alpha]), "RGBA").crop(box)
    s = max(tile.size)
    return tile.resize((s, s), L)


def extend(rgb, keep, sigma, ramp=12.0, settle=None):
    """Replace pixels outside `keep` with a soft continuation of the nearest kept pixels. With `settle`, the
    continuation eases toward the median colour of the kept area's border over that many pixels, so a bright edge detail
    (the laser glow, the bottom light) fades out instead of being smeared to the border."""
    idx = ndimage.distance_transform_edt(~keep, return_distances=False, return_indices=True)
    filled = rgb[idx[0], idx[1]]
    # smooth only the rebuilt area so nearest-pixel streaks become a gentle continuation
    blur = np.stack([ndimage.gaussian_filter(filled[..., c], sigma) for c in range(3)], -1)
    d = ndimage.distance_transform_edt(~keep)[..., None]
    w = np.clip(d / ramp, 0, 1)
    out = filled * (1 - w) + blur * w
    if settle:
        k = np.clip(d / settle, 0, 1) ** 1.5
        ring = keep & ~ndimage.binary_erosion(keep, iterations=8)
        out = out * (1 - k) + np.median(rgb[ring], 0) * k
    return np.clip(out, 0, 255).astype(np.uint8)


def full_bleed(tile):
    """The tile's face filling the square: drop the drawn rim, bevel and lip, and rebuild that band (and the
    corners) as a soft continuation of the face colours just inside it."""
    a = np.asarray(tile)
    keep = ndimage.distance_transform_edt(a[..., 3] == 255) > KEEP
    s = tile.size[0]
    out = Image.fromarray(extend(a[..., :3].astype(np.float32), keep, 28), "RGB")
    return out.crop((CROP, CROP, s - CROP, s - CROP))


def maskable(face, size):
    """Android adaptive icon: launchers crop to anything from a circle to a square, and only the centred 80%
    circle is guaranteed visible. The face is scaled so the bracket corners sit inside that circle and its
    colours are continued out to the edges."""
    big = size * 2
    inner = round(big * SCALE)
    canvas = np.zeros((big, big, 3), np.float32)
    off = (big - inner) // 2
    canvas[off:off + inner, off:off + inner] = np.asarray(face.resize((inner, inner), L), np.float32)
    keep = np.zeros((big, big), bool)
    m = round(inner * 0.03)  # the face's own outermost pixels are already soft; rebuild from just inside them
    keep[off + m:off + inner - m, off + m:off + inner - m] = True
    return Image.fromarray(extend(canvas, keep, big / 20, ramp=big / 24, settle=big * (1 - SCALE) / 2), "RGB").resize((size, size), L)


def favicon(size):
    """At tab size the artwork's ten bars and glow blur to grey, so the favicon is the same motif redrawn with
    fewer, bolder strokes in the artwork's colours (green tile, pale brackets, white bars, green laser)."""
    S = 512
    grad = Image.linear_gradient("L").resize((S, S))
    tile = Image.composite(Image.new("RGB", (S, S), (6, 92, 24)), Image.new("RGB", (S, S), (28, 196, 44)), grad)
    m = Image.new("L", (S, S), 0)
    ImageDraw.Draw(m).rounded_rectangle((8, 8, S - 9, S - 9), 112, fill=255)
    img = Image.new("RGBA", (S, S), (0, 0, 0, 0))
    img.paste(tile, (0, 0), m)
    d = ImageDraw.Draw(img)
    w, a, b, arm = 40, 84, S - 84, 96          # bracket stroke, box edges, arm length
    for (x, y, sx, sy) in ((a, a, 1, 1), (b, a, -1, 1), (a, b, 1, -1), (b, b, -1, -1)):
        d.line([(x, y + sy * arm), (x, y), (x + sx * arm, y)], fill=(222, 255, 236), width=w, joint="curve")
        for px, py in ((x, y + sy * arm), (x + sx * arm, y)):
            d.ellipse((px - w / 2, py - w / 2, px + w / 2, py + w / 2), fill=(222, 255, 236))
    for x0, bw in ((150, 34), (204, 22), (246, 40), (306, 22), (346, 30)):
        d.rectangle((x0, 168, x0 + bw, S - 168), fill=(255, 255, 255))
    d.rectangle((112, S / 2 - 9, S - 112, S / 2 + 9), fill=(110, 255, 40))
    return img.resize((size, size), L)


def small(img, size, amount=60):
    """Downscale then restore edge contrast lost to Lanczos at small sizes (bars and brackets stay crisp)."""
    out = img.resize((size, size), L)
    if size <= 192:
        out = out.filter(ImageFilter.UnsharpMask(radius=0.6 if size <= 48 else 1.0, percent=amount, threshold=2))
    return out


def save(img, path):
    path.parent.mkdir(parents=True, exist_ok=True)
    img.save(path, optimize=True)
    print(f"{path.relative_to(APP)}  {img.size[0]}x{img.size[1]} {img.mode}  {path.stat().st_size // 1024} KB")


def main():
    rgb = np.asarray(Image.open(SRC).convert("RGB"))
    tile = bezel_tile(rgb, tile_alpha(rgb))
    face = full_bleed(tile)
    save(small(tile, 512), PUB / "icon-512.png")
    save(small(tile, 192), PUB / "icon-192.png")
    save(favicon(32), PUB / "favicon-32.png")
    save(small(face, 180), PUB / "apple-touch-icon.png")
    save(maskable(face, 512), PUB / "maskable-512.png")
    save(face.resize((1024, 1024), L), STORE / "app-store-1024.png")
    save(face.resize((512, 512), L).convert("RGBA"), STORE / "play-store-512.png")  # Play asks for 32-bit PNG


if __name__ == "__main__":
    main()
