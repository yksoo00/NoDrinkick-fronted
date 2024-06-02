from flask import Flask, request
import new_try2 as new_try2
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins='http://localhost:3000')  

@app.route('/')
def hello_world():
    return '<p>Hello, World!</p>'

@app.route('/mypageUpload', methods=['POST'])
def upload_mypage():
    if 'file' not in request.files or 'id' not in request.form:
        return 'File or ID missing', 400

    file = request.files['file']
    id = request.form['id']
    file.save(f'C:/NoDrinkick-fronted/python/picture/my{id}.jpg')

    return 'File uploaded successfully', 200

@app.route('/fileUpload', methods=['POST'])
def upload_file():
    if request.method == 'POST':
        f = request.files['file']
        id = request.form['id']
        f.save(f'./picture/raspi{id}.jpg')
              
        known = new_try2.get_face_encoding(f'./picture/my{id}.jpg')
        captured = new_try2.get_face_encoding(f'./picture/raspi{id}.jpg')
        res = new_try2.compare(known, captured)

        if res == False:
            return 'false'

        return 'true'

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080)
