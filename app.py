from markupsafe import escape
from flask import Response
from flask import Flask
import requests

app = Flask(__name__)

@app.route('/')
def main():
    requests.get("https://roblox-town-gen.onrender.com/legacy/")
    return open("./html/index.html","r").read()

@app.route('/legacy/')
def legacy():
    return open("./html/legacy/index.html","r").read()