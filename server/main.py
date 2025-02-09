from playsound import playsound
import asyncio

async def play_audio():
    playsound(r"sounds/beep.mp3")  # Replace with your MP3 file
    
async def main():
    asyncio.create_task(play_audio())
    
asyncio.run(main())
    
