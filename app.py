from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
  return render_template("index.html")

@app.route("/login")
def login():
  return render_template("login.html")

@app.route("/cadastro")
def cadastro():
  tipo = request.args.get("tipo")
  papeis_marcados = [tipo] if tipo in ("contratante", "prestador") else []
  return render_template("cadastro.html")

@app.route("/contratante")
def contratante():
  return render_template("contratante.html")


if __name__ == "__main__":
  app.run(debug=True)