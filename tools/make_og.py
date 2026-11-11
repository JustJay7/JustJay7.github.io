"""Renders public/og.png, the 1200x630 card shown when the site link is shared.

Run after changing the name or headline:  python tools/make_og.py
Needs:  pip install playwright && playwright install chromium   (and `npm install` for the fonts)
"""
import os
from playwright.sync_api import sync_playwright

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
fonts = os.path.join(ROOT, "node_modules", "@fontsource-variable")
html = f"""<!doctype html><meta charset="utf-8"><style>
@font-face {{ font-family: B; font-weight: 200 800; font-stretch: 75% 100%;
  src: url('file://{fonts}/bricolage-grotesque/files/bricolage-grotesque-latin-wdth-normal.woff2'); }}
@font-face {{ font-family: M; font-weight: 100 800; font-stretch: 75% 112.5%;
  src: url('file://{fonts}/martian-mono/files/martian-mono-latin-wdth-normal.woff2'); }}
body {{ margin: 0; width: 1200px; height: 630px; background: #0d1117; color: #e6edf3; font-family: B;
  display: flex; flex-direction: column; justify-content: center; padding: 0 84px; box-sizing: border-box; }}
.who {{ font-size: 34px; font-weight: 700; font-stretch: 90%; }}
.who span {{ color: #9198a1; font-weight: 420; }}
h1 {{ font-size: 86px; font-weight: 800; font-stretch: 80%; line-height: .98; letter-spacing: -.018em; margin: 26px 0 34px; max-width: 980px; }}
.row {{ font-family: M; font-stretch: 80%; font-size: 24px; color: #9198a1; display: flex; align-items: center; gap: 14px; }}
i {{ width: 16px; height: 16px; border-radius: 50%; display: inline-block; }}
</style>
<div class="who">Jay Malhotra <span>AI/ML engineer</span></div>
<h1>I build AI products end to end, from the model to the app people use.</h1>
<div class="row"><i style="background:#3dd68c"></i><i style="background:#f2b544"></i><i style="background:#ff6b5e"></i>
<span style="margin-left:10px">Toronto or remote in Canada</span></div>"""

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={"width": 1200, "height": 630})
    # The page has to be a real file: a blank page is not allowed to load local font files.
    tmp = os.path.join(ROOT, "tools", "_og.html")
    with open(tmp, "w") as fh:
        fh.write(html)
    page.goto("file://" + tmp)
    page.evaluate("document.fonts.ready")
    page.wait_for_timeout(400)
    page.screenshot(path=os.path.join(ROOT, "public", "og.png"))
    browser.close()
    os.remove(tmp)
print("wrote public/og.png")
