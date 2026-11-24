"""Validate generated local links using the standard-library HTML parser."""
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote
import json

ROOT = Path(__file__).resolve().parents[1] / "dist"
ORIGIN = "https://local.test"


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.ids = set()
        self.links = []
        self.errors = []
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if attrs.get("id"):
            if attrs["id"] in self.ids:
                self.errors.append("Duplicate ID: " + attrs["id"])
            self.ids.add(attrs["id"])
        if tag == "img" and "alt" not in attrs:
            self.errors.append("Image missing alt")
        for key in ("href", "src"):
            if key in attrs:
                self.links.append(attrs[key])


pages = {"/" + str(p.relative_to(ROOT)).replace("index.html", ""): Page(p.read_text()) for p in ROOT.rglob("*.html")}
errors = []
links = 0
for route, page in pages.items():
    errors.extend(f"{route}: {error}" for error in page.errors)
    for href in page.links:
        if not href or href.startswith(("mailto:", "https://", "http://", "data:", "ipfs://")):
            continue
        target = urlsplit(urljoin(ORIGIN + route, href))
        local = ROOT / unquote(target.path).lstrip("/")
        if target.path.endswith("/"):
            local = local / "index.html"
        if not local.is_file():
            errors.append(f"{route}: missing {href}")
        if target.fragment and target.path in pages and unquote(target.fragment) not in pages[target.path].ids:
            errors.append(f"{route}: missing fragment {href}")
        links += 1
if errors:
    raise SystemExit("\n".join(errors))
print(json.dumps({"htmlPages": len(pages), "localLinksAndAssetsChecked": links, "errors": 0}))
