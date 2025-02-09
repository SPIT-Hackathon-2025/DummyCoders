# # import cv2
# # import mediapipe as mp
# # import numpy as np
# # import time

# # # Initialize MediaPipe Face Mesh
# # mp_face_mesh = mp.solutions.face_mesh
# # face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# # # Function to calculate the Euclidean distance between two points
# # def euclidean_distance(point1, point2):
# #     return np.linalg.norm(np.array(point1) - np.array(point2))

# # # Function to calculate the Eye Aspect Ratio (EAR)
# # def calculate_ear(landmarks, eye_indices):
# #     # Extract the coordinates of the eye landmarks
# #     eye = [landmarks[i] for i in eye_indices]
# #     # Calculate the distances between the vertical eye landmarks
# #     A = euclidean_distance(eye[1], eye[5])
# #     B = euclidean_distance(eye[2], eye[4])
# #     # Calculate the distance between the horizontal eye landmarks
# #     C = euclidean_distance(eye[0], eye[3])
# #     # Compute the EAR
# #     ear = (A + B) / (2.0 * C)
# #     return ear

# # # Indices for the left and right eyes from the MediaPipe Face Mesh
# # LEFT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
# # RIGHT_EYE_INDICES = [33, 160, 158, 133, 153, 144]

# # # Thresholds and consecutive frame length for drowsiness detection
# # EAR_THRESHOLD = 0.25
# # CONSECUTIVE_FRAMES = 20

# # # Initialize frame counters
# # frame_counter = 0

# # # Start video capture
# # cap = cv2.VideoCapture(0)
# # while cap.isOpened():
# #     ret, frame = cap.read()
# #     if not ret:
# #         break

# #     # Convert the BGR image to RGB
# #     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
# #     # Process the frame to detect face landmarks
# #     results = face_mesh.process(rgb_frame)

# #     if results.multi_face_landmarks:
# #         for face_landmarks in results.multi_face_landmarks:
# #             # Extract the landmark coordinates
# #             landmarks = [(lm.x, lm.y) for lm in face_landmarks.landmark]
# #             # Get the frame dimensions
# #             h, w, _ = frame.shape
# #             # Convert normalized coordinates to pixel coordinates
# #             landmarks = [(int(x * w), int(y * h)) for x, y in landmarks]

# #             # Calculate EAR for both eyes
# #             left_ear = calculate_ear(landmarks, LEFT_EYE_INDICES)
# #             right_ear = calculate_ear(landmarks, RIGHT_EYE_INDICES)
# #             ear = (left_ear + right_ear) / 2.0

# #             # Check if EAR is below the threshold
# #             if ear < EAR_THRESHOLD:
# #                 frame_counter += 1
# #                 # If eyes are closed for sufficient number of frames, alert
# #                 if frame_counter >= CONSECUTIVE_FRAMES:
# #                     cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
# #             else:
# #                 frame_counter = 0

# #     # Display the frame
# #     cv2.imshow('Drowsiness Detection', frame)

# #     # Break the loop if 'q' is pressed
# #     if cv2.waitKey(1) & 0xFF == ord('q'):
# #         break

# # # Release resources
# # cap.release()
# # cv2.destroyAllWindows()

# import cv2
# import mediapipe as mp
# import numpy as np
# import time
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime

# # Initialize Firebase
# cred = credentials.Certificate("your-firebase-adminsdk.json")  # Replace with your file
# firebase_admin.initialize_app(cred, {'databaseURL': 'https://your-database.firebaseio.com'})  # Replace with your URL
# ref = db.reference('/drowsiness_alerts')

# # Initialize MediaPipe Face Mesh
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# def euclidean_distance(point1, point2):
#     return np.linalg.norm(np.array(point1) - np.array(point2))

# def calculate_ear(landmarks, eye_indices):
#     eye = [landmarks[i] for i in eye_indices]
#     A = euclidean_distance(eye[1], eye[5])
#     B = euclidean_distance(eye[2], eye[4])
#     C = euclidean_distance(eye[0], eye[3])
#     ear = (A + B) / (2.0 * C)
#     return ear

# LEFT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
# RIGHT_EYE_INDICES = [33, 160, 158, 133, 153, 144]
# EAR_THRESHOLD = 0.25
# CONSECUTIVE_FRAMES = 20

# frame_counter = 0
# cap = cv2.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(rgb_frame)

#     if results.multi_face_landmarks:
#         for face_landmarks in results.multi_face_landmarks:
#             landmarks = [(lm.x, lm.y) for lm in face_landmarks.landmark]
#             h, w, _ = frame.shape
#             landmarks = [(int(x * w), int(y * h)) for x, y in landmarks]

#             left_ear = calculate_ear(landmarks, LEFT_EYE_INDICES)
#             right_ear = calculate_ear(landmarks, RIGHT_EYE_INDICES)
#             ear = (left_ear + right_ear) / 2.0

#             if ear < EAR_THRESHOLD:
#                 frame_counter += 1
#                 if frame_counter >= CONSECUTIVE_FRAMES:
#                     cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)

#                     # Store in Firebase
#                     alert_data = {
#                         "timestamp": str(datetime.now()),
#                         "ear_value": ear
#                     }
#                     ref.push(alert_data)
#             else:
#                 frame_counter = 0

#     cv2.imshow('Drowsiness Detection', frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


# import cv2
# import mediapipe as mp
# import numpy as np
# import firebase_admin
# from firebase_admin import credentials, db
# import asyncio
# from datetime import datetime
# import time

# # Firebase Setup
# cred = credentials.Certificate("j.json")  # Update with your credentials file path
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://collaboro-dcd87-default-rtdb.firebaseio.com/'  # Update with your Firebase database URL
# })

# # Reference to store drowsiness alerts


# # Initialize MediaPipe Face Mesh
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# # Function to calculate Euclidean distance
# def euclidean_distance(point1, point2):
#     return np.linalg.norm(np.array(point1) - np.array(point2))

# # Function to calculate Eye Aspect Ratio (EAR)
# def calculate_ear(landmarks, eye_indices):
#     eye = [landmarks[i] for i in eye_indices]
#     A = euclidean_distance(eye[1], eye[5])
#     B = euclidean_distance(eye[2], eye[4])
#     C = euclidean_distance(eye[0], eye[3])
#     return (A + B) / (2.0 * C)

# # Indices for left and right eyes
# LEFT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
# RIGHT_EYE_INDICES = [33, 160, 158, 133, 153, 144]

# # Thresholds for drowsiness detection
# EAR_THRESHOLD = 0.25
# CONSECUTIVE_FRAMES = 20

# # Initialize frame counter
# frame_counter = 0

# # Async function to store drowsiness alert in Firebase
# async def store_drowsiness_alert():
#     today = datetime.today().strftime('%Y-%m-%d')
#     time.sleep(1)
#     ref = db.reference("1/drowsy")
#     data = ref.get()
#     count = data.get(today, 0) + 1 if data else 1
#     ref.push({
#         today:count
#     })
#     print(f"🔥 Updated Firebase: Drowsiness count -> {count}")
# cap = cv2.VideoCapture(0)

# async def detect_drowsiness():
#     global frame_counter
    
#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#         results = face_mesh.process(rgb_frame)

#         if results.multi_face_landmarks:
#             for face_landmarks in results.multi_face_landmarks:
#                 landmarks = [(lm.x, lm.y) for lm in face_landmarks.landmark]
#                 h, w, _ = frame.shape
#                 landmarks = [(int(x * w), int(y * h)) for x, y in landmarks]

#                 left_ear = calculate_ear(landmarks, LEFT_EYE_INDICES)
#                 right_ear = calculate_ear(landmarks, RIGHT_EYE_INDICES)
#                 ear = (left_ear + right_ear) / 2.0

#                 if ear < EAR_THRESHOLD:
#                     frame_counter += 1
#                     if frame_counter >= CONSECUTIVE_FRAMES:
#                         cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
                        
#                         asyncio.create_task(store_drowsiness_alert())  # Run Firebase update asynchronously
#                 else:
#                     frame_counter = 0

#         cv2.imshow('Drowsiness Detection', frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # Run the async function
# asyncio.run(detect_drowsiness())




# import cv2
# import mediapipe as mp
# import numpy as np
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime

# # ✅ Firebase Setup
# cred = credentials.Certificate("video.json")  # Update with your Firebase key
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://spit-failure-default-rtdb.firebaseio.com/'  # Update with your Firebase DB URL
# })

# # ✅ Firebase Reference
# ref = db.reference("1/drowsy")

# # ✅ Initialize MediaPipe Face Mesh
# mp_face_mesh = mp.solutions.face_mesh
# face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# # ✅ Function to Calculate Euclidean Distance
# def euclidean_distance(point1, point2):
#     return np.linalg.norm(np.array(point1) - np.array(point2))

# # ✅ Function to Calculate Eye Aspect Ratio (EAR)
# def calculate_ear(landmarks, eye_indices):
#     eye = [landmarks[i] for i in eye_indices]
#     A = euclidean_distance(eye[1], eye[5])
#     B = euclidean_distance(eye[2], eye[4])
#     C = euclidean_distance(eye[0], eye[3])
#     return (A + B) / (2.0 * C)

# # ✅ Indices for Left and Right Eyes
# LEFT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
# RIGHT_EYE_INDICES = [33, 160, 158, 133, 153, 144]

# # ✅ Drowsiness Detection Thresholds
# EAR_THRESHOLD = 0.25
# CONSECUTIVE_FRAMES = 20

# # ✅ Frame Handling
# frame_counter = 0
# frame_skip = 2  # Skip frames for better performance

# # ✅ Function to Store Drowsiness Alert in Firebase
# def store_drowsiness_alert():
#     try:
#         today = datetime.today().strftime('%Y-%m-%d')
#         print(f"📡 Fetching Firebase data...")

#         data = ref.get()
#         print(f"📊 Current Firebase Data: {data}")

#         count = (data.get(today, 0) + 1) if data and isinstance(data, dict) else 1

#         print(f"📝 Updating Firebase: {today} -> {count}")
#         ref.update({today: count})
#         print(f"✅ Firebase updated successfully!")
#     except Exception as e:
#         print(f"❌ Firebase update failed: {e}")

# # ✅ Start Video Capture
# cap = cv2.VideoCapture(0)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         break

#     # ✅ Skip frames for better performance
#     if frame_counter % frame_skip != 0:
#         frame_counter += 1
#         continue

#     rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
#     results = face_mesh.process(rgb_frame)

#     if results.multi_face_landmarks:
#         for face_landmarks in results.multi_face_landmarks:
#             landmarks = [(lm.x, lm.y) for lm in face_landmarks.landmark]
#             h, w, _ = frame.shape
#             landmarks = [(int(x * w), int(y * h)) for x, y in landmarks]

#             left_ear = calculate_ear(landmarks, LEFT_EYE_INDICES)
#             right_ear = calculate_ear(landmarks, RIGHT_EYE_INDICES)
#             ear = (left_ear + right_ear) / 2.0

#             if ear < EAR_THRESHOLD:
#                 frame_counter += 1
#                 if frame_counter >= CONSECUTIVE_FRAMES:
#                     cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
                    
#                     # ✅ Call Firebase function synchronously
#                     store_drowsiness_alert()
#             else:
#                 frame_counter = 0

#     cv2.imshow('Drowsiness Detection', frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


import cv2
import mediapipe as mp
import numpy as np
import firebase_admin
import asyncio
from firebase_admin import credentials, db
from datetime import datetime
from playsound import playsound

async def play_audio():
    playsound(r"sounds/beep.mp3") 

# ✅ Firebase Setup
cred = credentials.Certificate("video.json")  # Update with your Firebase key
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://spit-failure-default-rtdb.firebaseio.com/'  # Update with your Firebase DB URL
})

# ✅ Firebase Reference
ref = db.reference("1/drowsy")

# ✅ Initialize MediaPipe Face Mesh
mp_face_mesh = mp.solutions.face_mesh
face_mesh = mp_face_mesh.FaceMesh(min_detection_confidence=0.5, min_tracking_confidence=0.5)

# ✅ Function to Calculate Euclidean Distance
def euclidean_distance(point1, point2):
    return np.linalg.norm(np.array(point1) - np.array(point2))

# ✅ Function to Calculate Eye Aspect Ratio (EAR)
def calculate_ear(landmarks, eye_indices):
    eye = [landmarks[i] for i in eye_indices]
    A = euclidean_distance(eye[1], eye[5])
    B = euclidean_distance(eye[2], eye[4])
    C = euclidean_distance(eye[0], eye[3])
    return (A + B) / (2.0 * C)

# ✅ Indices for Left and Right Eyes


# ✅ Async Function to Store Drowsiness Alert in Firebase
async def store_drowsiness_alert():
    try:
        today = datetime.today().strftime('%Y-%m-%d')
        print(f"📡 Fetching Firebase data...")

       
        data = ref.get()
        print(f"📊 Current Firebase Data: {data}")

        if data and today in data:
            count = data[today] + 1
        else:
            count = 1

        print(f"📝 Updating Firebase: {today} -> {count}")
        ref.update({today: count})
        print(f"✅ Firebase updated successfully!")
    except Exception as e:
        print(f"❌ Firebase update failed: {e}")


async def main():
    
    LEFT_EYE_INDICES = [362, 385, 387, 263, 373, 380]
    RIGHT_EYE_INDICES = [33, 160, 158, 133, 153, 144]

    # ✅ Drowsiness Detection Thresholds
    EAR_THRESHOLD = 0.25
    CONSECUTIVE_FRAMES = 20

    # ✅ Frame Handling
    frame_counter = 0
    frame_skip = 2  # Skip frames for better performance
        
    # ✅ Start Video Capture
    cap = cv2.VideoCapture(0)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        # ✅ Skip frames for better performance
        if frame_counter % frame_skip != 0:
            frame_counter += 1
            continue

        rgb_frame = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
        results = face_mesh.process(rgb_frame)

        if results.multi_face_landmarks:
            for face_landmarks in results.multi_face_landmarks:
                landmarks = [(lm.x, lm.y) for lm in face_landmarks.landmark]
                h, w, _ = frame.shape
                landmarks = [(int(x * w), int(y * h)) for x, y in landmarks]

                left_ear = calculate_ear(landmarks, LEFT_EYE_INDICES)
                right_ear = calculate_ear(landmarks, RIGHT_EYE_INDICES)
                ear = (left_ear + right_ear) / 2.0

                if ear < EAR_THRESHOLD:
                    frame_counter += 1
                    if frame_counter >= CONSECUTIVE_FRAMES:
                        cv2.putText(frame, "DROWSINESS ALERT!", (10, 30), cv2.FONT_HERSHEY_SIMPLEX, 1.0, (0, 0, 255), 2)
                        await play_audio()
                        # ✅ Call Firebase function asynchronously
                        await store_drowsiness_alert()
                        # print('hi')
                else:
                    frame_counter = 0

        cv2.imshow('Drowsiness Detection', frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()
    
asyncio.run(main())
