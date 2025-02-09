# from ultralytics import YOLO
# import cv2
# import numpy as np
# import torch

# # Load YOLO model
# model = YOLO("best.pt")
# class_names = model.names

# # Open video file
# cap = cv2.VideoCapture('p.mp4')

# # Skip frames to optimize performance
# frame_skip = 2  # Process every 2nd frame
# frame_count = 0

# while cap.isOpened():
#     ret, img = cap.read()
#     if not ret:
#         break
    
#     frame_count += 1
#     if frame_count % frame_skip != 0:
#         continue  # Skip frames to speed up

#     # Resize frame for faster processing
#     img = cv2.resize(img, (640, 360))  # Reduce resolution for faster inference
#     h, w, _ = img.shape

#     # Run YOLO segmentation
#     results = model.predict(img, device='cuda' if torch.cuda.is_available() else 'cpu')

#     for r in results:
#         boxes = r.boxes  # Bounding boxes
#         masks = r.masks  # Segmentation masks

#     if masks is not None:
#         masks = masks.data.cpu().numpy()  # Convert masks to NumPy
#         for seg, box in zip(masks, boxes):
#             seg = cv2.resize(seg, (w, h))  # Resize segmentation mask
#             contours, _ = cv2.findContours(seg.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#             for contour in contours:
#                 d = int(box.cls)
#                 c = class_names[d]
#                 x, y, width, height = cv2.boundingRect(contour)

#                 # Draw segmentation contour
#                 cv2.polylines(img, [contour], True, (0, 0, 255), 2)
#                 cv2.putText(img, c, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

#     # Display frame
#     cv2.imshow('Segmentation Output', img)

#     # Reduce lag with a non-blocking key check
#     if cv2.waitKey(1) & 0xFF == ord('q'):
#         break

# cap.release()
# cv2.destroyAllWindows()

# import cv2
# import numpy as np
# import torch
# import asyncio
# from ultralytics import YOLO
# from firebase_admin import credentials, db, initialize_app
# from datetime import datetime

# # Initialize Firebase
# cred = credentials.Certificate("j.json")  
# initialize_app(cred, {'databaseURL': 'https://collaboro-dcd87-default-rtdb.firebaseio.com/'})

# # Load YOLO model
# model = YOLO("best.pt")
# class_names = model.names

# # Open video file
# cap = cv2.VideoCapture('p.mp4')

# # Frame skipping for performance optimization
# frame_skip = 2  # Process every 2nd frame
# frame_count = 0

# # Async lock for Firebase updates
# db_lock = asyncio.Lock()

# async def update_database(detected_class):
#     """Asynchronously updates Firebase with detected objects."""
#     async with db_lock:
#         ref = db.reference(f"1/rear2/{'pot_holes':{detected_class}}")
#         today = datetime.today().strftime('%Y-%m-%d')
#         data = ref.get()

#         count = data[today] + 1 if data and today in data else 1
#         ref.set({today: count})
#         print(f"🔥 Updated Firebase: {detected_class} -> {count}")

# async def process_video():
#     """Processes video frames and updates Firebase asynchronously."""
#     global frame_count

#     while cap.isOpened():
#         ret, img = cap.read()
#         if not ret:
#             break

#         frame_count += 1
#         if frame_count % frame_skip != 0:
#             continue  # Skip frames to optimize performance

#         # Resize for faster processing
#         img = cv2.resize(img, (640, 360))
#         h, w, _ = img.shape

#         # Run YOLO segmentation
#         results = model.predict(img, device='cuda' if torch.cuda.is_available() else 'cpu')

#         for r in results:
#             boxes = r.boxes  # Bounding boxes
#             masks = r.masks  # Segmentation masks

#         if masks is not None:
#             masks = masks.data.cpu().numpy()
#             for seg, box in zip(masks, boxes):
#                 seg = cv2.resize(seg, (w, h))  
#                 contours, _ = cv2.findContours(seg.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

#                 for contour in contours:
#                     d = int(box.cls)
#                     detected_class = class_names[d]
#                     x, y, width, height = cv2.boundingRect(contour)

#                     # Draw segmentation contour
#                     cv2.polylines(img, [contour], True, (0, 0, 255), 2)
#                     cv2.putText(img, detected_class, (x, y - 10), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (255, 255, 255), 2)

#                     # Async Firebase update
#                     asyncio.create_task(update_database(detected_class))

#         # Display frame
#         cv2.imshow('Segmentation Output', img)

#         # Non-blocking key check
#         if cv2.waitKey(1) & 0xFF == ord('q'):
#             break

#     cap.release()
#     cv2.destroyAllWindows()

# # Run the async video processing
# asyncio.run(process_video())


import cv2
import numpy as np
import torch
import asyncio
from ultralytics import YOLO
from firebase_admin import credentials, db, initialize_app
from datetime import datetime

# Initialize Firebase
cred = credentials.Certificate("video.json")  
initialize_app(cred, {'databaseURL': 'https://spit-failure-default-rtdb.firebaseio.com/'})

# Load YOLO model
model = YOLO("models/best.pt")
class_names = model.names

# Open video file
cap = cv2.VideoCapture('videos/p.mp4')

# Frame skipping for performance optimization
frame_skip = 2  # Process every 2nd frame
frame_count = 0

# Async lock for Firebase updates
db_lock = asyncio.Lock()

async def update_database():
    """Asynchronously updates Firebase with the total pothole count."""

    today = datetime.today().strftime('%Y-%m-%d')
    ref = db.reference(f"1/pot_holes")

    # Get current count from Firebase
    data = ref.get()
    count = data.get(today, 0) + 1 if data else 1

    # Update the database with the incremented count
    ref.update({today: count})
    # print(f"🔥 Updated Firebase: Pothole count -> {count}")

async def process_video():
    """Processes video frames and updates Firebase asynchronously."""
    global frame_count

    while cap.isOpened():
        ret, img = cap.read()
        if not ret:
            print("❌ Video frame not read, exiting loop...")
            break

        frame_count += 1
        if frame_count % frame_skip != 0:
            continue  # Skip frames for optimization

        # Resize for faster processing
        img = cv2.resize(img, (640, 360))
        h, w, _ = img.shape

        # Run YOLO segmentation
        # print("🚀 Running YOLO model...")
        results = model.predict(img, device='cuda' if torch.cuda.is_available() else 'cpu')

        pothole_detected = False  # Flag to track detection

        for r in results:
            boxes = r.boxes  # Bounding boxes
            masks = r.masks  # Segmentation masks

            if masks is None or boxes is None:
                # print("⚠️ No potholes detected in this frame.")
                continue  # Skip to the next frame

            # print(f"✅ Detected {len(boxes)} potholes!")
            masks = masks.data.cpu().numpy()
            
            for seg, box in zip(masks, boxes):
                seg = cv2.resize(seg, (w, h))  
                contours, _ = cv2.findContours(seg.astype(np.uint8), cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

                for contour in contours:
                    pothole_detected = True  # Mark detection
                    x, y, width, height = cv2.boundingRect(contour)

                    # Draw segmentation contour
                    cv2.polylines(img, [contour], True, (0, 0, 255), 2)

                    # Ensure text visibility
                    cv2.putText(img, "Pothole", 
                                (x, y - 10 if y > 20 else y + 20),
                                cv2.FONT_HERSHEY_SIMPLEX, 
                                0.6, 
                                (255, 255, 255),  
                                2, 
                                cv2.LINE_AA)

        if pothole_detected:
            # print("🔵 Pothole detected! Updating Firebase...")
            asyncio.create_task(update_database())  # Explicitly await instead of using create_task

        # Display frame
        cv2.imshow('Segmentation Output', img)

        # Non-blocking key check
        if cv2.waitKey(1) & 0xFF == ord('q'):
            print("🔴 Exiting...")
            break

    cap.release()
    cv2.destroyAllWindows()

# Run the async video processing
asyncio.run(process_video())
