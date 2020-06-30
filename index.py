from os.path import abspath
from flask import Flask, render_template, jsonify, request
from main import *

template_directory = abspath("./")
app = Flask(__name__, template_folder=template_directory)

@app.route('/')
def index_page():
    return render_template("index.html")
    
@app.route('/run_RF', methods=['POST'])
def run_RF():
    result = run_classifier()
    return jsonify(result)
    
@app.route('/importances', methods=['POST'])
def importances():
    importances = get_importances()
    j = jsonify(importances)
    print("IMPORTANCES:")
    print(importances)
    print("JSON:")
    print(j)
    return j