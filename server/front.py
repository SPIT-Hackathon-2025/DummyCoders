# import asyncio
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime
# import cv2
# import numpy as np
# from ultralytics import YOLO

# # Initialize Firebase Admin SDK
# cred = credentials.Certificate("j.json")
# firebase_admin.initialize_app(cred, {"databaseURL": "https://collaboro-dcd87-default-rtdb.firebaseio.com/"})

# # Load YOLO model
# model = YOLO("yolov8n.pt")

# # Initialize video capture
# cap = cv2.VideoCapture("v2.mp4")

# # Constants
# METERS_PER_PIXEL = 0.08  # Approximation
# SPEED_THRESHOLD = 15  # Speed threshold for rash driving (m/s)
# ROI_Y = 300  # Region of Interest (line for counting vehicles)
# FPS = 30  # Video FPS

# # Rash driving and bot count storage
# rash_driving_count = 0
# vehicle_data = {}  # Stores vehicle positions & speeds
# vehicle_counted = set()  # Tracks counted vehicles

# # Firebase reference for bot count
# bot_ref = db.reference("1/rash")

# async def update_bot_count():
#     """Update the rash driving count in Firebase."""
#     today = datetime.today().strftime('%Y-%m-%d')
#     bot_data = bot_ref.get()

#     if bot_data and today in bot_data:
#         count = bot_data[today] + 1  # Increment count
#     else:
#         count = 1  # Start count from 1 if today's data does not exist

#     # Update the database
#     bot_ref.update({today: count})
#     print(f"Updated bot count for {today}: {count}")

# def estimate_speed(prev, curr, fps):
#     """Estimate speed (m/s) from two positions."""
#     if prev is None or curr is None:
#         return 0  
#     displacement = np.sqrt((curr[0] - prev[0])**2 + (curr[1] - prev[1])**2)
#     speed_mps = displacement * METERS_PER_PIXEL * fps
#     return speed_mps

# async def process_video():
#     """Main function to process video and detect rash driving."""
#     global rash_driving_count, vehicle_data, vehicle_counted

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         frame = cv2.resize(frame, (640, 360))
#         results = model(frame)

#         new_vehicle_data = {}  # Store updated positions

#         for result in results:
#             boxes = result.boxes.xyxy.cpu().numpy()
#             class_ids = result.boxes.cls.cpu().numpy()

#             for i in range(len(boxes)):
#                 x1, y1, x2, y2 = map(int, boxes[i])  
#                 class_id = int(class_ids[i])

#                 if class_id in [1, 2, 3, 5, 7]:  # Vehicles only
#                     cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

#                     # Assign a unique ID using coordinates
#                     vehicle_id = f"{class_id}_{x1}_{y1}"

#                     prev_position = vehicle_data.get(vehicle_id, {}).get('pos', None)
#                     speed = estimate_speed(prev_position, (cx, cy), FPS) if prev_position else 0

#                     # Rash driving detection
#                     if speed > SPEED_THRESHOLD:
#                         rash_driving_count += 1  # Count rash driving
#                         await update_bot_count()  # Run Firebase update asynchronously


#                     # Count vehicle when it crosses the ROI
#                     if cy > ROI_Y and vehicle_id not in vehicle_counted:
#                         vehicle_counted.add(vehicle_id)  # Mark as counted
                       
#                     # Store updated position
#                     new_vehicle_data[vehicle_id] = {'pos': (cx, cy), 'speed': speed}

#                     # Draw bounding box
#                     color = (0, 255, 0) if speed <= SPEED_THRESHOLD else (0, 0, 255)
#                     cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

#         # Update tracking data
#         vehicle_data = new_vehicle_data

#         # Display rash driving count
#         cv2.putText(frame, f"Rash Driving Count: {rash_driving_count}", (10, 40),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

#         cv2.imshow("Rash Driving Detection", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # Run the event loop
# asyncio.run(process_video())


# import asyncio
# import firebase_admin
# from firebase_admin import credentials, db
# from datetime import datetime
# import cv2
# import numpy as np
# from ultralytics import YOLO

# # Initialize Firebase Admin SDK
# cred = credentials.Certificate("video.json")
# firebase_admin.initialize_app(cred, {"databaseURL": "https://spit-failure-default-rtdb.firebaseio.com/"})

# # Load YOLO model
# model = YOLO("yolov8n.pt")

# # Initialize video capture
# cap = cv2.VideoCapture("v2.mp4")

# # Constants
# METERS_PER_PIXEL = 0.08  # Approximation
# SPEED_THRESHOLD = 15  # Speed threshold for rash driving (m/s)
# ROI_Y = 300  # Region of Interest (line for counting vehicles)
# FPS = 30  # Video FPS

# # Rash driving and vehicle tracking
# rash_driving_count = 0
# vehicle_data = {}  # Stores vehicle positions & speeds
# vehicle_counted = set()  # Tracks counted vehicles

# # Firebase reference for bot count
# bot_ref = db.reference("1/rash")

# # Queue for Firebase updates
# rash_queue = asyncio.Queue()


# async def batch_update_firebase():
#     """Periodically update Firebase to reduce API calls."""
#     global rash_driving_count

#     while True:
#         await asyncio.sleep(5)  # Wait before updating
#         if rash_queue.empty():
#             continue

#         today = datetime.today().strftime('%Y-%m-%d')
#         bot_data = bot_ref.get()

#         # Get the latest count
#         current_count = bot_data.get(today, 0) if bot_data else 0
#         update_count = current_count + rash_queue.qsize()

#         # Clear the queue
#         while not rash_queue.empty():
#             rash_queue.get_nowait()

#         # Push to Firebase
#         bot_ref.update({today: update_count})
#         print(f"Updated rash driving count for {today}: {update_count}")


# def estimate_speed(prev, curr, fps):
#     """Estimate speed (m/s) from two positions."""
#     if prev is None or curr is None:
#         return 0  
#     displacement = np.sqrt((curr[0] - prev[0])**2 + (curr[1] - prev[1])**2)
#     return displacement * METERS_PER_PIXEL * fps


# async def process_video():
#     """Main function to process video and detect rash driving."""
#     global rash_driving_count, vehicle_data, vehicle_counted

#     while cap.isOpened():
#         ret, frame = cap.read()
#         if not ret:
#             break

#         frame = cv2.resize(frame, (640, 360))
#         results = model(frame)

#         new_vehicle_data = {}  # Store updated positions

#         for result in results:
#             boxes = result.boxes.xyxy.cpu().numpy()
#             class_ids = result.boxes.cls.cpu().numpy()

#             for i in range(len(boxes)):
#                 x1, y1, x2, y2 = map(int, boxes[i])  
#                 class_id = int(class_ids[i])

#                 if class_id in [1, 2, 3, 5, 7]:  # Vehicles only
#                     cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

#                     vehicle_id = f"{class_id}_{x1}_{y1}"

#                     prev_position = vehicle_data.get(vehicle_id, {}).get('pos', None)
#                     speed = estimate_speed(prev_position, (cx, cy), FPS) if prev_position else 0

#                     # Rash driving detection
#                     if speed > SPEED_THRESHOLD:
#                         rash_driving_count += 1  # Count rash driving
#                         await rash_queue.put(1)  # Add to queue (instead of direct Firebase call)

#                     # Count vehicle when it crosses the ROI
#                     if cy > ROI_Y and vehicle_id not in vehicle_counted:
#                         vehicle_counted.add(vehicle_id)

#                     # Store updated position
#                     new_vehicle_data[vehicle_id] = {'pos': (cx, cy), 'speed': speed}

#                     # Draw bounding box
#                     color = (0, 255, 0) if speed <= SPEED_THRESHOLD else (0, 0, 255)
#                     cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

#         # Update tracking data
#         vehicle_data = new_vehicle_data

#         # Display rash driving count
#         cv2.putText(frame, f"Rash Driving Count: {rash_driving_count}", (10, 40),
#                     cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

#         cv2.imshow("Rash Driving Detection", frame)

#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()


# async def main():
#     """Run video processing and Firebase updates in parallel."""
#     await asyncio.gather(process_video(), batch_update_firebase())

# # Run the event loop
# asyncio.run(main())

import asyncio
import firebase_admin
from firebase_admin import credentials, db
from datetime import datetime
import cv2
import numpy as np
from ultralytics import YOLO

# Initialize Firebase Admin SDK
cred = credentials.Certificate("video.json")
firebase_admin.initialize_app(cred, {"databaseURL": "https://spit-failure-default-rtdb.firebaseio.com/"})

# Load YOLO model
model = YOLO("models/yolov8n.pt")

# Initialize video capture
cap = cv2.VideoCapture("videos/v2.mp4")

# Constants
METERS_PER_PIXEL = 0.08  # Approximation
SPEED_THRESHOLD = 15  # Speed threshold for rash driving (m/s)
ROI_Y = 300  # Region of Interest (line for counting vehicles)
FPS = 30  # Video FPS

# Rash driving and vehicle tracking
rash_driving_count = 0
vehicle_data = {}  # Stores vehicle positions & speeds
vehicle_counted = set()  # Tracks counted vehicles

# Firebase reference for rash driving count
rash_ref = db.reference("1/rash")

async def store_rash_driving_alert():
    try:
        today = datetime.today().strftime('%Y-%m-%d')
        print("📡 Fetching Firebase data...")

        # loop = asyncio.get_running_loop()
        data = rash_ref.get()
        print(f"📊 Current Firebase Data: {data}")

        if data and today in data:
            count = data[today] + 1
        else:
            count = 1

        print(f"📝 Updating Firebase: {today} -> {count}")
        rash_ref.update({today: count})
        print("✅ Firebase updated successfully!")
    except Exception as e:
        print(f"❌ Firebase update failed: {e}")

async def process_video():
    global rash_driving_count, vehicle_data, vehicle_counted

    while cap.isOpened():
        ret, frame = cap.read()
        if not ret:
            break

        frame = cv2.resize(frame, (640, 360))
        results = model(frame)

        new_vehicle_data = {}  # Store updated positions

        for result in results:
            boxes = result.boxes.xyxy.cpu().numpy()
            class_ids = result.boxes.cls.cpu().numpy()

            for i in range(len(boxes)):
                x1, y1, x2, y2 = map(int, boxes[i])  
                class_id = int(class_ids[i])

                if class_id in [1, 2, 3, 5, 7]:  # Vehicles only
                    cx, cy = (x1 + x2) // 2, (y1 + y2) // 2

                    vehicle_id = f"{class_id}_{x1}_{y1}"

                    prev_position = vehicle_data.get(vehicle_id, {}).get('pos', None)
                    speed = np.sqrt((cx - prev_position[0])**2 + (cy - prev_position[1])**2) * METERS_PER_PIXEL * FPS if prev_position else 0

                    # Rash driving detection
                    if speed > SPEED_THRESHOLD:
                        rash_driving_count += 1
                        await store_rash_driving_alert()

                    # Count vehicle when it crosses the ROI
                    if cy > ROI_Y and vehicle_id not in vehicle_counted:
                        vehicle_counted.add(vehicle_id)

                    # Store updated position
                    new_vehicle_data[vehicle_id] = {'pos': (cx, cy), 'speed': speed}

                    # Draw bounding box
                    color = (0, 255, 0) if speed <= SPEED_THRESHOLD else (0, 0, 255)
                    cv2.rectangle(frame, (x1, y1), (x2, y2), color, 2)

        vehicle_data = new_vehicle_data

        cv2.putText(frame, f"Rash Driving Count: {rash_driving_count}", (10, 40),
                    cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)

        cv2.imshow("Rash Driving Detection", frame)

        if cv2.waitKey(1) & 0xFF == ord('q'):
            break

    cap.release()
    cv2.destroyAllWindows()

asyncio.run(process_video())
