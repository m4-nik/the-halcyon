"""Tiny static file server for local preview.

Reads its port from the PORT environment variable (falls back to 8000) so
it works with tooling that assigns a port dynamically. Serves the folder
this script lives in.
"""
import functools
import http.server
import os
import socketserver


class NoCacheHandler(http.server.SimpleHTTPRequestHandler):
    """Disables browser caching so edits show up on a normal reload during
    development, instead of the browser silently reusing a stale copy of
    an HTML/CSS/JS file it fetched earlier in the session."""

    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate")
        self.send_header("Pragma", "no-cache")
        super().end_headers()


port = int(os.environ.get("PORT", "8000"))
directory = os.path.dirname(os.path.abspath(__file__))
handler = functools.partial(NoCacheHandler, directory=directory)

with socketserver.TCPServer(("127.0.0.1", port), handler) as httpd:
    print(f"Serving {directory} at http://127.0.0.1:{port}")
    httpd.serve_forever()
