"""Serve the production build with local-only, DOM-visible browser QA telemetry."""
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


class Handler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT / "dist"), **kwargs)

    def do_GET(self):
        if self.path == "/__browser-audit.js":
            body = (ROOT / "tests/browser-audit.js").read_bytes()
            kind = "application/javascript"
        elif self.path == "/diagnostic/":
            body = (ROOT / "dist/diagnostic/index.html").read_text().replace(
                "</body>", '<script src="/__browser-audit.js"></script></body>'
            ).encode()
            kind = "text/html; charset=utf-8"
        else:
            return super().do_GET()
        self.send_response(200)
        self.send_header("Content-Type", kind)
        self.send_header("Content-Length", str(len(body)))
        self.end_headers()
        self.wfile.write(body)


if __name__ == "__main__":
    ThreadingHTTPServer(("127.0.0.1", 4174), Handler).serve_forever()
