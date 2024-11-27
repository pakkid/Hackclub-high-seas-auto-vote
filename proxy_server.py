from flask import Flask, request, jsonify
from flask_cors import CORS
import requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

@app.route('/api/generate', methods=['POST'])
def generate():
    data = request.json
    response = requests.post('http://localhost:11434/api/generate', json=data)
    return jsonify(response.json())

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)  # Use a different port