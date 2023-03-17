from markupsafe import escape
from flask import Response
from flask import Flask
from time import sleep
import threading
import requests

app = Flask(__name__)

@app.route('/')
def main():
    
    return open("./html/index.html","r").read()

@app.route('/legacy/')
def legacy():
    return open("./html/legacy/index.html","r").read()

@app.route('/cdn/<test>/<ex>')
def get(test,ex):
    return open(f"./html/{test}.{ex}","r").read()

@app.route('/cdn/legacy/<test>/<ex>')
def getlegacy(test,ex):
    return open(f"./html/legacy/{test}.{ex}","r").read()

def keepalive():
    while True:
        print(requests.get("https://roblox-town-gen.onrender.com/").status_code)
        sleep(5)

threading.Thread(target=keepalive).start()