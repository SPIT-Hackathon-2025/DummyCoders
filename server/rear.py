# import cv2
# import numpy as np
# import torch
# from ultralytics import YOLO
# from filterpy.kalman import KalmanFilter

# # Load YOLO model
# model = YOLO("yolov8n.pt")  

# # Initialize video capture for REAR camera
# cap = cv2.VideoCapture("c.mp4")

# # Thresholds for warning
# DANGER_DISTANCE_THRESHOLD = 50  # Minimum safe distance (in pixels)
# SPEED_THRESHOLD = 5  # Speed threshold for warning
# LANE_MARGIN = 50  # Margin to check lane position

# # Kalman Filter for smoothing distance and velocity
# kf = KalmanFilter(dim_x=2, dim_z=1)
# kf.x = np.array([[0.], [0.]])  # Initial state (distance, velocity)
# kf.F = np.array([[1., 1.], [0., 1.]])  # State transition matrix
# kf.H = np.array([[1., 0.]])  # Measurement function
# kf.P *= 1000.  # Covariance matrix
# kf.R = 3  # Reduced measurement noise
# kf.Q = 0.05  # Reduced process noise

# # Store previous positions for velocity estimation
# previous_positions = {}

# def estimate_distance(width, height):
#     """Estimate distance using a refined formula based on object width and height."""
#     if width > 0 and height > 0:
#         return (4500 / width + 3500 / height) / 2  # Weighted average
#     return 9999  # Large value for far objects

# def smooth_distance(distance):
#     """Smooth distance using Kalman Filter."""
#     kf.predict()
#     kf.update(distance)
#     return kf.x[0][0]

# # Open video in full-screen mode
# cv2.namedWindow("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN)
# cv2.setWindowProperty("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         print("⚠️ No frame read. Check if the video file exists.")
#         break

#     # Resize frame for faster processing
#     frame = cv2.resize(frame, (640, 360))

#     # Get YOLO detections
#     results = model(frame)

#     warning_status = "Safe"
#     alert_color = (0, 255, 0)  # Green by default

#     for result in results:
#         boxes = result.boxes.xyxy.cpu().numpy()  
#         class_ids = result.boxes.cls.cpu().numpy()  

#         for i in range(len(boxes)):
#             x1, y1, x2, y2 = map(int, boxes[i])  
#             class_id = int(class_ids[i])  

#             if class_id in [1, 2, 3, 5, 7]:  # Detect vehicles (car, bus, truck, etc.)
#                 width = x2 - x1
#                 height = y2 - y1
#                 distance = estimate_distance(width, height)
#                 smoothed_distance = smooth_distance(distance)

#                 # Track vehicle movement for speed estimation
#                 center_x = (x1 + x2) // 2
#                 center_y = (y1 + y2) // 2
#                 if class_id not in previous_positions:
#                     previous_positions[class_id] = (center_x, center_y)
#                 else:
#                     prev_x, prev_y = previous_positions[class_id]
#                     velocity = ((center_x - prev_x) ** 2 + (center_y - prev_y) ** 2) ** 0.5
#                     previous_positions[class_id] = (center_x, center_y)

#                 # Get velocity estimate from Kalman Filter
#                 velocity = kf.x[1][0]  

#                 # Dynamic danger distance based on velocity
#                 dynamic_danger_threshold = DANGER_DISTANCE_THRESHOLD + (velocity * 3)

#                 if smoothed_distance < dynamic_danger_threshold:
#                     warning_status = "Warning ⚠️"
#                     alert_color = (0, 165, 255)  # Orange warning

#                 # Draw bounding box
#                 cv2.rectangle(frame, (x1, y1), (x2, y2), alert_color, 2)

#     # Display warning status
#     cv2.putText(frame, f"Status: {warning_status}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, alert_color, 2)

#     # Show full-screen output
#     cv2.imshow("Rear Bicycle Safety System", frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


# import cv2
# import numpy as np
# import torch
# from ultralytics import YOLO
# from filterpy.kalman import KalmanFilter
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime

# cred = credentials.Certificate(r"j.json")  # Path to your Firebase service account JSON file
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://collaboro-dcd87-default-rtdb.firebaseio.com/'
# })

# # Load YOLO model
# model = YOLO("yolov8n.pt")  

# # Initialize video capture for REAR camera
# cap = cv2.VideoCapture("c.mp4")

# # Thresholds for warning
# DANGER_DISTANCE_THRESHOLD = 50  # Minimum safe distance (in pixels)
# SPEED_THRESHOLD = 5  # Speed threshold for warning
# LANE_MARGIN = 50  # Margin to check lane position
# CUT_IN_THRESHOLD = 100  # Distance threshold for cut-in event

# # Kalman Filter for smoothing distance and velocity
# kf = KalmanFilter(dim_x=2, dim_z=1)
# kf.x = np.array([[0.], [0.]])  # Initial state (distance, velocity)
# kf.F = np.array([[1., 1.], [0., 1.]])  # State transition matrix
# kf.H = np.array([[1., 0.]])  # Measurement function
# kf.P *= 1000.  # Covariance matrix
# kf.R = 3  # Reduced measurement noise
# kf.Q = 0.05  # Reduced process noise

# # Store previous positions for velocity estimation
# previous_positions = {}

# def estimate_distance(width, height):
#     """Estimate distance using a refined formula based on object width and height."""
#     if width > 0 and height > 0:
#         return (4500 / width + 3500 / height) / 2  # Weighted average
#     return 9999  # Large value for far objects

# def smooth_distance(distance):
#     """Smooth distance using Kalman Filter."""
#     kf.predict()
#     kf.update(distance)
#     return kf.x[0][0]

# # Open video in full-screen mode
# cv2.namedWindow("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN)
# cv2.setWindowProperty("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         print("⚠️ No frame read. Check if the video file exists.")
#         break

#     # Resize frame for faster processing
#     frame = cv2.resize(frame, (640, 360))
#     frame_height, frame_width, _ = frame.shape
    
#     # Define cut-in regions
#     left_cut_zone = (0, frame_height - 100, LANE_MARGIN, frame_height)
#     right_cut_zone = (frame_width - LANE_MARGIN, frame_height - 100, frame_width, frame_height)
    
#     # Get YOLO detections
#     results = model(frame)

#     warning_status = "Safe"
#     alert_color = (0, 255, 0)  # Green by default

#     for result in results:
#         boxes = result.boxes.xyxy.cpu().numpy()  
#         class_ids = result.boxes.cls.cpu().numpy()  

#         for i in range(len(boxes)):
#             x1, y1, x2, y2 = map(int, boxes[i])  
#             class_id = int(class_ids[i])  

#             if class_id in [1, 2, 3, 5, 7]:  # Detect vehicles (car, bus, truck, etc.)
#                 width = x2 - x1
#                 height = y2 - y1
#                 distance = estimate_distance(width, height)
#                 smoothed_distance = smooth_distance(distance)

#                 # Track vehicle movement for speed estimation
#                 center_x = (x1 + x2) // 2
#                 center_y = (y1 + y2) // 2
#                 if class_id not in previous_positions:
#                     previous_positions[class_id] = (center_x, center_y)
#                 else:
#                     prev_x, prev_y = previous_positions[class_id]
#                     velocity = ((center_x - prev_x) ** 2 + (center_y - prev_y) ** 2) ** 0.5
#                     previous_positions[class_id] = (center_x, center_y)

#                 # Get velocity estimate from Kalman Filter
#                 velocity = kf.x[1][0]  

#                 # Dynamic danger distance based on velocity
#                 dynamic_danger_threshold = DANGER_DISTANCE_THRESHOLD + (velocity * 3)

#                 # Check if vehicle is too close and approaching fast
#                 if smoothed_distance < dynamic_danger_threshold:
#                     warning_status = "Warning ⚠️"
#                     alert_color = (0, 165, 255)  # Orange warning
#                     bot_ref = db.reference("1/rear")
#                     today = datetime.today().strftime('%Y-%m-%d')
#                     bot_data = bot_ref.get()
#                     if bot_data and today in bot_data:
#                         # Retrieve today's count, increment and update
#                         count = bot_data[today] + 1
#                     else:
#                         # If today’s data does not exist, start with 1
#                         count = 1

#                     # Update the database
#                     bot_ref.update({today: count})
                    
                    

#                 # Check for cut-in event
#                 if (x1 < left_cut_zone[2] and y2 > left_cut_zone[1]) or (x2 > right_cut_zone[0] and y2 > right_cut_zone[1]):
#                     if velocity > SPEED_THRESHOLD:
#                         warning_status = "CUT-IN ALERT 🚨"
#                         alert_color = (255, 0, 0)  # Blue alert

#                 # Draw bounding box
#                 cv2.rectangle(frame, (x1, y1), (x2, y2), alert_color, 2)

#     # Display warning status
#     cv2.putText(frame, f"Status: {warning_status}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, alert_color, 2)

#     # Show full-screen output
#     cv2.imshow("Rear Bicycle Safety System", frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()




# import cv2
# import numpy as np
# import torch
# import threading
# import time
# from ultralytics import YOLO
# from filterpy.kalman import KalmanFilter
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime

# # Initialize Firebase
# cred = credentials.Certificate(r"j.json")  # Path to Firebase service account JSON
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://collaboro-dcd87-default-rtdb.firebaseio.com/'
# })

# # Load YOLO model
# model = YOLO("yolov8n.pt")

# # Initialize video capture for REAR camera
# cap = cv2.VideoCapture("c.mp4")

# # Safety thresholds
# DANGER_DISTANCE_THRESHOLD = 50  # Minimum safe distance (in pixels)
# SPEED_THRESHOLD = 5  # Speed threshold for warning
# LANE_MARGIN = 50  # Margin for lane position detection
# CUT_IN_THRESHOLD = 100  # Distance threshold for cut-in event

# # Kalman Filter for smoothing distance and velocity
# kf = KalmanFilter(dim_x=2, dim_z=1)
# kf.x = np.array([[0.], [0.]])  # Initial state (distance, velocity)
# kf.F = np.array([[1., 1.], [0., 1.]])  # State transition matrix
# kf.H = np.array([[1., 0.]])  # Measurement function
# kf.P *= 1000.  # Covariance matrix
# kf.R = 3  # Reduced measurement noise
# kf.Q = 0.05  # Reduced process noise

# # Store previous positions for velocity estimation
# previous_positions = {}

# def estimate_distance(width, height):
#     """Estimate distance using a refined formula based on object size."""
#     if width > 0 and height > 0:
#         return (4500 / width + 3500 / height) / 2  # Weighted average
#     return 9999  # Large value for far objects

# def smooth_distance(distance):
#     """Smooth distance using Kalman Filter."""
#     kf.predict()
#     kf.update(distance)
#     return kf.x[0][0]

# def update_firebase():
#     """Update Firebase warning count without blocking the detection loop."""
#     bot_ref = db.reference("1/rear/")
#     today = datetime.today().strftime('%Y-%m-%d')
#     bot_data = bot_ref.get()

#     if bot_data and today in bot_data:
#         count = bot_data[today] + 1
#     else:
#         count = 1

#     # Update Firebase
#     bot_ref.update({today: count})

#     # Delay for 60 seconds without blocking the main thread
#     time.sleep(60)

# # Open video in full-screen mode
# cv2.namedWindow("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN)
# cv2.setWindowProperty("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

# while cap.isOpened():
#     ret, frame = cap.read()
#     if not ret:
#         print("⚠️ No frame read. Check if the video file exists.")
#         break

#     # Resize frame for faster processing
#     frame = cv2.resize(frame, (640, 360))
#     frame_height, frame_width, _ = frame.shape

#     # Define cut-in regions
#     left_cut_zone = (0, frame_height - 100, LANE_MARGIN, frame_height)
#     right_cut_zone = (frame_width - LANE_MARGIN, frame_height - 100, frame_width, frame_height)

#     # Get YOLO detections
#     results = model(frame)

#     warning_status = "Safe"
#     alert_color = (0, 255, 0)  # Green by default

#     for result in results:
#         boxes = result.boxes.xyxy.cpu().numpy()
#         class_ids = result.boxes.cls.cpu().numpy()

#         for i in range(len(boxes)):
#             x1, y1, x2, y2 = map(int, boxes[i])
#             class_id = int(class_ids[i])

#             if class_id in [1, 2, 3, 5, 7]:  # Detect vehicles (car, bus, truck, etc.)
#                 width = x2 - x1
#                 height = y2 - y1
#                 distance = estimate_distance(width, height)
#                 smoothed_distance = smooth_distance(distance)

#                 # Track vehicle movement for speed estimation
#                 center_x = (x1 + x2) // 2
#                 center_y = (y1 + y2) // 2
#                 if class_id not in previous_positions:
#                     previous_positions[class_id] = (center_x, center_y)
#                 else:
#                     prev_x, prev_y = previous_positions[class_id]
#                     velocity = ((center_x - prev_x) ** 2 + (center_y - prev_y) ** 2) ** 0.5
#                     previous_positions[class_id] = (center_x, center_y)

#                 # Get velocity estimate from Kalman Filter
#                 velocity = kf.x[1][0]

#                 # Dynamic danger distance based on velocity
#                 dynamic_danger_threshold = DANGER_DISTANCE_THRESHOLD + (velocity * 3)

#                 # Check if vehicle is too close and approaching fast
#                 if smoothed_distance < dynamic_danger_threshold:
#                     warning_status = "Warning ⚠️"
#                     alert_color = (0, 165, 255)  # Orange warning

#                     # Run Firebase update in a separate thread
#                     threading.Thread(target=update_firebase, daemon=True).start()

#                 # Check for cut-in event
#                 if (x1 < left_cut_zone[2] and y2 > left_cut_zone[1]) or (x2 > right_cut_zone[0] and y2 > right_cut_zone[1]):
#                     if velocity > SPEED_THRESHOLD:
#                         warning_status = "CUT-IN ALERT 🚨"
#                         alert_color = (255, 0, 0)  # Red alert

#                 # Draw bounding box
#                 cv2.rectangle(frame, (x1, y1), (x2, y2), alert_color, 2)

#     # Display warning status
#     cv2.putText(frame, f"Status: {warning_status}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, alert_color, 2)

#     # Show full-screen output
#     cv2.imshow("Rear Bicycle Safety System", frame)

#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()


# import cv2
# import numpy as np
# import torch
# import asyncio
# from ultralytics import YOLO
# from filterpy.kalman import KalmanFilter
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime

# # Initialize Firebase
# cred = credentials.Certificate(r"j.json")  
# firebase_admin.initialize_app(cred, {
#     'databaseURL': 'https://collaboro-dcd87-default-rtdb.firebaseio.com/'
# })

# # Load YOLO model
# model = YOLO("yolov8n.pt")  

# # Video capture
# cap = cv2.VideoCapture("c.mp4")

# # Warning thresholds
# DANGER_DISTANCE_THRESHOLD = 50  
# SPEED_THRESHOLD = 5  
# LANE_MARGIN = 50  
# CUT_IN_THRESHOLD = 100  

# # Kalman Filter
# kf = KalmanFilter(dim_x=2, dim_z=1)
# kf.x = np.array([[0.], [0.]])  
# kf.F = np.array([[1., 1.], [0., 1.]])  
# kf.H = np.array([[1., 0.]])  
# kf.P *= 1000.  
# kf.R = 3  
# kf.Q = 0.05  

# previous_positions = {}  # For tracking vehicle movement

# # Async control variables
# db_lock = asyncio.Lock()  # Lock for Firebase updates
# last_update_time = None  # Track last update time

# async def update_database():
#     """Handles Firebase update once per minute asynchronously."""
#     global last_update_time
#     async with db_lock:
#         current_time = datetime.now()
#         if last_update_time and (current_time - last_update_time).total_seconds() < 60:
#             return  # Prevent multiple updates within 1 minute
        
#         last_update_time = current_time  # Update last update time
#         bot_ref = db.reference("1/rear")
#         today = datetime.today().strftime('%Y-%m-%d')
#         bot_data = bot_ref.get()

#         if bot_data and today in bot_data:
#             count = bot_data[today] + 1
#         else:
#             count = 1

#         bot_ref.set({today: count})
#         print("🚀 Database Updated")

# async def process_video():
#     """Processes the video stream asynchronously."""
#     global last_update_time

#     # Open full-screen window
#     cv2.namedWindow("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN)
#     cv2.setWindowProperty("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             print("⚠️ No frame read. Check if the video file exists.")
#             break

#         # Resize frame
#         frame = cv2.resize(frame, (640, 360))
#         frame_height, frame_width, _ = frame.shape

#         # Define cut-in regions
#         left_cut_zone = (0, frame_height - 100, LANE_MARGIN, frame_height)
#         right_cut_zone = (frame_width - LANE_MARGIN, frame_height - 100, frame_width, frame_height)

#         # Get YOLO detections
#         results = model(frame)
#         warning_status = "Safe"
#         alert_color = (0, 255, 0)  # Default: Green

#         for result in results:
#             boxes = result.boxes.xyxy.cpu().numpy()  
#             class_ids = result.boxes.cls.cpu().numpy()  

#             for i in range(len(boxes)):
#                 x1, y1, x2, y2 = map(int, boxes[i])  
#                 class_id = int(class_ids[i])  

#                 if class_id in [1, 2, 3, 5, 7]:  # Detect vehicles (car, bus, truck, etc.)
#                     width = x2 - x1
#                     height = y2 - y1
#                     distance = (4500 / width + 3500 / height) / 2 if width > 0 and height > 0 else 9999
#                     kf.predict()
#                     kf.update(distance)
#                     smoothed_distance = kf.x[0][0]

#                     # Velocity estimation
#                     center_x, center_y = (x1 + x2) // 2, (y1 + y2) // 2
#                     if class_id not in previous_positions:
#                         previous_positions[class_id] = (center_x, center_y)
#                     else:
#                         prev_x, prev_y = previous_positions[class_id]
#                         velocity = ((center_x - prev_x) ** 2 + (center_y - prev_y) ** 2) ** 0.5
#                         previous_positions[class_id] = (center_x, center_y)

#                     velocity = kf.x[1][0]  
#                     dynamic_danger_threshold = DANGER_DISTANCE_THRESHOLD + (velocity * 3)

#                     # Check if vehicle is too close
#                     if smoothed_distance < dynamic_danger_threshold:
#                         warning_status = "Warning ⚠️"
#                         alert_color = (0, 165, 255)  # Orange

#                         # Async database update
#                         asyncio.create_task(update_database())

#                     # Check for cut-in event
#                     if (x1 < left_cut_zone[2] and y2 > left_cut_zone[1]) or (x2 > right_cut_zone[0] and y2 > right_cut_zone[1]):
#                         if velocity > SPEED_THRESHOLD:
#                             warning_status = "CUT-IN ALERT 🚨"
#                             alert_color = (255, 0, 0)  # Blue

#                     # Draw bounding box
#                     cv2.rectangle(frame, (x1, y1), (x2, y2), alert_color, 2)

#         # Display warning status
#         cv2.putText(frame, f"Status: {warning_status}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, alert_color, 2)

#         # Show full-screen output
#         cv2.imshow("Rear Bicycle Safety System", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # Run the video processing asynchronously
# asyncio.run(process_video())


import cv2
import numpy as np
import torch
import asyncio
from ultralytics import YOLO
from filterpy.kalman import KalmanFilter
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
from playsound import playsound

async def play_audio():
    playsound(r"sounds/beep.mp3")  # Replace with your MP3 file

    # Async update to Firebase after audio finishes

# Initialize Firebase
cred = credentials.Certificate(r"video.json")  
firebase_admin.initialize_app(cred, {
    'databaseURL': 'https://spit-failure-default-rtdb.firebaseio.com/'
})

# Load YOLO model
model = YOLO("models/yolov8n.pt")  

# Video capture
cap = cv2.VideoCapture("videos/c.mp4")

# Warning thresholds
DANGER_DISTANCE_THRESHOLD = 50  
SPEED_THRESHOLD = 5  # Velocity threshold for warnings  
LANE_MARGIN = 50  
CUT_IN_THRESHOLD = 100  

# Kalman Filter for distance estimation
kf = KalmanFilter(dim_x=2, dim_z=1)
kf.x = np.array([[0.], [0.]])  
kf.F = np.array([[1., 1.], [0., 1.]])  
kf.H = np.array([[1., 0.]])  
kf.P *= 1000.  
kf.R = 3  
kf.Q = 0.05  

previous_positions = {}  # Store previous vehicle positions for velocity calculation

# Async control variables
db_lock = asyncio.Lock()  # Lock for Firebase updates
last_update_time = None  # Track last update time

async def update_database():
    asyncio.create_task(play_audio())
    """Handles Firebase update once per minute asynchronously."""
    global last_update_time

    current_time = datetime.now()
    if last_update_time and (current_time - last_update_time).total_seconds() < 60:
        return  # Prevent multiple updates within 1 minute
    
    last_update_time = current_time  # Update last update time
    bot_ref = db.reference("1/rear")
    today = datetime.today().strftime('%Y-%m-%d')
    bot_data = bot_ref.get()

    if bot_data and today in bot_data:
        count = bot_data[today] + 1
    else:
        count = 1

    bot_ref.update({today: count})
    print("🚀 Database Updated")

async def process_video():
    """Processes the video stream asynchronously."""
    global last_update_time

    # Open full-screen window
    cv2.namedWindow("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN)
    cv2.setWindowProperty("Rear Bicycle Safety System", cv2.WND_PROP_FULLSCREEN, cv2.WINDOW_FULLSCREEN)

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            print("⚠️ No frame read. Check if the video file exists.")
            break

        # Resize frame
        frame = cv2.resize(frame, (640, 360))
        frame_height, frame_width, _ = frame.shape

        # Define cut-in regions
        left_cut_zone = (0, frame_height - 100, LANE_MARGIN, frame_height)
        right_cut_zone = (frame_width - LANE_MARGIN, frame_height - 100, frame_width, frame_height)

        # Get YOLO detections
        results = model(frame)
        warning_status = "Safe"
        alert_color = (0, 255, 0)  # Default: Green

        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()  
            class_ids = result.boxes.cls.cpu().numpy()  

            for i in range(len(boxes)):
                x1, y1, x2, y2 = map(int, boxes[i])  
                class_id = int(class_ids[i])  

                if class_id in [1, 2, 3, 5, 7]:  # Detect vehicles (car, bus, truck, etc.)
                    width = x2 - x1
                    height = y2 - y1
                    distance = (4500 / width + 3500 / height) / 2 if width > 0 and height > 0 else 9999
                    kf.predict()
                    kf.update(distance)
                    smoothed_distance = kf.x[0][0]

                    # Velocity estimation
                    center_x, center_y = (x1 + x2) // 2, (y1 + y2) // 2
                    if class_id not in previous_positions:
                        previous_positions[class_id] = (center_x, center_y)
                        velocity = 0  # Initialize velocity
                    else:
                        prev_x, prev_y = previous_positions[class_id]
                        velocity = ((center_x - prev_x) ** 2 + (center_y - prev_y) ** 2) ** 0.5
                        previous_positions[class_id] = (center_x, center_y)

                    velocity = kf.x[1][0]  # Kalman-filtered velocity
                    dynamic_danger_threshold = DANGER_DISTANCE_THRESHOLD + (velocity * 3)

                    # Check if vehicle is too close and moving fast
                    if smoothed_distance < dynamic_danger_threshold and velocity > SPEED_THRESHOLD-10:
                        warning_status = "Warning ⚠️"
                        alert_color = (0, 165, 255)  # Orange
                        # Play MP3 file
                        await update_database()

                    # Check for cut-in event with velocity threshold
                    if ((x1 < left_cut_zone[2] and y2 > left_cut_zone[1]) or 
                        (x2 > right_cut_zone[0] and y2 > right_cut_zone[1])) and velocity > SPEED_THRESHOLD:
                        warning_status = "CUT-IN ALERT 🚨"
                        alert_color = (255, 0, 0)  # Blue

                    # Draw bounding box
                    cv2.rectangle(frame, (x1, y1), (x2, y2), alert_color, 2)

        # Display warning status
        cv2.putText(frame, f"Status: {warning_status}", (10, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, alert_color, 2)

        # Show full-screen output
        cv2.imshow("Rear Bicycle Safety System", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

# Run the video processing asynchronously
asyncio.run(process_video())
