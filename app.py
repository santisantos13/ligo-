from flask import Flask

app = Flask(__name__)

@app.route("/")
def incio():
  return "Flask funcionando na LIGO!"

if __name__ == "__main__":
  app.run(debug=True)