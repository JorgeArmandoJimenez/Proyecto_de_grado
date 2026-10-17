import os

from quiron.server import create_app


app = create_app()
server = app.server
# Vercel reconoce el objeto WSGI exportado por este módulo.
handler = server


if __name__ == "__main__":
    app.run(
        debug=False,
        host="0.0.0.0",
        port=int(os.environ.get("PORT", "8050")),
    )
