import streamlit as st
import os

def run_script(script_name):
    os.system(f"python {script_name}")

st.set_page_config(page_title="Camera Dashboard", layout="wide")

st.title("Camera Control Panel")

# Define camera scripts
camera_scripts = {
    "Front Camera 1": "front.py",
    "Front Camera 2": "pot.py",
    "Rear Camera": "rear.py",
    "Drowsy Camera": "drowzy.py"
}

# Layout for cards
col1, col2 = st.columns(2)
col3, col4 = st.columns(2)

with col1:
    if st.button("📷 Front Camera 1", key="fc1"):
        run_script(camera_scripts["Front Camera 1"])

with col2:
    if st.button("📷 Front Camera 2", key="fc2"):
        run_script(camera_scripts["Front Camera 2"])

with col3:
    if st.button("📷 Rear Camera", key="rc"):
        run_script(camera_scripts["Rear Camera"])

with col4:
    if st.button("😴 Drowsy Camera", key="dc"):
        run_script(camera_scripts["Drowsy Camera"])

st.success("Click a button to execute the corresponding camera script.")
