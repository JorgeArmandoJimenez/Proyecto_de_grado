"""Entry point WSGI para servir Dash en Vercel."""

from quiron.server import create_app


app = create_app()
handler = app.server
