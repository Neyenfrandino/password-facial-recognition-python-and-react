from fastapi import APIRouter
from app.recognition_face.face_recognition import compare_images



router = APIRouter(prefix="/user", tags=["user"])

@router.get("/")
async def root():
    return {"message": "Hello World"}


@router.post("/img")
async def upload_image(imageData: dict):
    received_text = imageData.get("imageData")
    response = compare_images(received_text)
    return response
    
    