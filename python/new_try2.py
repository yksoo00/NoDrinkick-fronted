import cv2
import face_recognition

# 얼굴 영역을 탐지하고 잘라내는 함수
def detect_and_crop_face(image):
    face_locations = face_recognition.face_locations(image)
    if face_locations:
        top, right, bottom, left = face_locations[0]
        face_image = image[top:bottom, left:right]
        return face_image
    else:
        return None

# 캡처된 이미지를 전처리 후 저장
def capture_and_preprocess_image():
    ret, frame = video_capture.read()
    if ret:
        try:
            # 얼굴 인식
            face_image = detect_and_crop_face(frame)
            if face_image is not None:  # 얼굴이 인식되었을 때만 이미지 처리
                # Convert to grayscale
                frame_gray = cv2.cvtColor(face_image, cv2.COLOR_BGR2GRAY)
                # Histogram equalization
                frame_gray = cv2.equalizeHist(frame_gray)
                # Convert back to RGB (required for face_recognition)
                frame_rgb = cv2.cvtColor(frame_gray, cv2.COLOR_GRAY2RGB)
                # Save the preprocessed image
                cv2.imwrite(captured_image_path, frame_rgb)
                return True
        except ValueError as e:
            print(e)
    else:
        raise ValueError("Failed to capture image")

# 캡처된 이미지 로드 및 얼굴 인코딩
def load_captured_image():
    captured_image = face_recognition.load_image_file(captured_image_path)
    captured_face_encodings = face_recognition.face_encodings(captured_image)
    if not captured_face_encodings:
        raise ValueError("No face found in the captured image")
    return captured_face_encodings[0]

def get_face_encoding(path):
    captured_image = face_recognition.load_image_file(path)
    captured_face_encodings = face_recognition.face_encodings(captured_image)
    if not captured_face_encodings:
        raise ValueError("No face found in the captured image")
    return captured_face_encodings[0]

def test(msg):
    print(msg)
    return True

# 얼굴 비교 함수 정의
def compare_faces(known_face_encoding, captured_face_encoding):
    # 얼굴 비교
    face_distances = face_recognition.face_distance([known_face_encoding], captured_face_encoding)
    return face_distances[0]

def compare(known_face_encoding, capture_face_encoding):
    face_distance = compare_faces(known_face_encoding, capture_face_encoding)
    similarity_percentage = (1 - face_distance) * 100
    print("얼굴 유사도:", similarity_percentage, "%")

    if similarity_percentage >= 63:  # 일치율 임계값 설정
        print("동일한 사용자입니다.")
        return True
    else:
        print("동일한 사용자가 아닙니다.")
        return False

# 비디오 캡처 초기화
video_capture = cv2.VideoCapture(0)

# 캡처된 이미지 저장 경로


# 미리 저장된 이미지 로드 및 전처리
#known_image_path = "C:/face2/captured_face.jpg"
#known_image = face_recognition.load_image_file(known_image_path)
#known_face_encodings = face_recognition.face_encodings(known_image)



'''
# 프로그램 실행
while True:
    ret, frame = video_capture.read()
    cv2.imshow('Video', frame)

    # 얼굴 인식 코드
    try:
        # 얼굴이 인식되면 함수 실행
        if capture_and_preprocess_image():
            captured_face_encoding = load_captured_image()
            face_distance = compare_faces(known_face_encoding, captured_face_encoding)
            similarity_percentage = (1 - face_distance) * 100
            print("얼굴 유사도:", similarity_percentage, "%")
            if similarity_percentage >= 63:  # 일치율 임계값 설정
                print("동일한 사용자입니다.")
                break  # 얼굴이 일치하면 종료
            else:
                print("다른 사용자입니다.")
    except ValueError as e:
        print(e)

    # 'q' 키를 누르면 종료
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

# 비디오 캡처 해제
video_capture.release()
cv2.destroyAllWindows()
'''