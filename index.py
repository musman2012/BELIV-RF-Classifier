from os.path import abspath
from flask import Flask, render_template, jsonify, request, send_from_directory
from main import *

template_directory = abspath("./")
app = Flask(__name__, template_folder=template_directory)

@app.route('/')
def index_page():
    return render_template("index.html")
    
@app.route('/run_RF/<string:target_feature>', methods=['POST'])
def run_RF(target_feature):
    result = run_classifier(target_feature)
    return jsonify(result)
    
@app.route('/importances/<int:number_of_predictors>', methods=['POST'])
def importances(number_of_predictors):
    importances = get_importances(number_of_predictors)
    j = jsonify(importances)
    print("IMPORTANCES:")
    print(importances)
    print("JSON:")
    print(j)
    return j
    
@app.route('/data/<string:file_name>', methods=['GET'])
def load_data_file(file_name):
    return send_from_directory("data", file_name)