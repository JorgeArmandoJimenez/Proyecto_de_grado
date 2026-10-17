"""Entry point WSGI para servir Dash en Vercel."""

from quiron.server import create_app


app = create_app()
# Vercel detecta esta aplicación WSGI como el handler de la función Python.
handler = app.server
