from flask import Flask, render_template, request
import python.new_try2 as new_try2
import cv2
import face_recognition
app = Flask(__name__)
    
@app.route('/')
def hello_world():
    return '<p>Hellow, World!</p>'

@app.route('/mypageUpload', methods=['POST'])
def upload_mypage():
    if request.method == 'POST':
        f = request.files['file']
        id = request.fForm['id']
        f.save(f'./picture/my{id}.jpg')


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
