from os.path import abspath
from flask import Flask, render_template, jsonify, request
from main import run_classifier

template_directory = abspath("./")
app = Flask(__name__, template_folder=template_directory)

@app.route('/')
def index_page():
    return render_template("index.html")
    
@app.route('/run_RF', methods=['POST'])
def run_RF():
    result = run_classifier()
    print(result)
    return jsonify(result)