from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from typing import List, Optional
import os
import shutil
import uuid
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/admin",
    tags=["admin"],
)

UPLOAD_DIR = "static/uploads"

# Ensure upload directory exists
if not os.path.exists(UPLOAD_DIR):
    os.makedirs(UPLOAD_DIR)

@router.get("/image-slots", response_model=List[schemas.ImageSlot])
def get_image_slots(db: Session = Depends(get_db)):
    slots = db.query(models.ImageSlot).all()
    # If no slots exist, seed some defaults for the homepage
    if not slots:
        default_slots = [
            {"slot_key": "explore_kodai_1", "title": "Neelakurinji Bloom", "description": "The 12-Year Miracle...", "image_url": "/assets/destination_1.png", "category": "homepage"},
            {"slot_key": "explore_kodai_2", "title": "The Star-Shaped Lake", "description": "Created in 1863...", "image_url": "/assets/hero.png", "category": "homepage"},
            {"slot_key": "explore_kodai_3", "title": "Solar Observatory", "description": "Established 1899...", "image_url": "/assets/destination_2.png", "category": "homepage"},
            {"slot_key": "explore_kodai_4", "title": "7,200 ft", "description": "Elevation Above Sea Level", "image_url": None, "category": "homepage"},
        ]
        for s in default_slots:
            db_slot = models.ImageSlot(**s)
            db.add(db_slot)
        db.commit()
        slots = db.query(models.ImageSlot).all()
    return slots

@router.post("/image-slots/upload")
async def upload_slot_image(
    slot_key: str = Form(...),
    title: Optional[str] = Form(None),
    description: Optional[str] = Form(None),
    file: Optional[UploadFile] = File(None),
    db: Session = Depends(get_db)
):
    db_slot = db.query(models.ImageSlot).filter(models.ImageSlot.slot_key == slot_key).first()
    if not db_slot:
        db_slot = models.ImageSlot(slot_key=slot_key)
        db.add(db_slot)

    if title is not None:
        db_slot.title = title
    if description is not None:
        db_slot.description = description

    if file:
        # Generate unique filename
        file_extension = os.path.splitext(file.filename)[1]
        filename = f"{uuid.uuid4()}{file_extension}"
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        
        # Update image URL in DB
        db_slot.image_url = f"/uploads/{filename}"

    db.commit()
    db.refresh(db_slot)
    return db_slot

@router.post("/image-slots/update", response_model=schemas.ImageSlot)
def update_slot(slot_update: schemas.ImageSlotBase, db: Session = Depends(get_db)):
    db_slot = db.query(models.ImageSlot).filter(models.ImageSlot.slot_key == slot_update.slot_key).first()
    if not db_slot:
        db_slot = models.ImageSlot(slot_key=slot_update.slot_key)
        db.add(db_slot)
    
    db_slot.title = slot_update.title
    db_slot.description = slot_update.description
    db_slot.category = slot_update.category
    if slot_update.image_url:
        db_slot.image_url = slot_update.image_url

    db.commit()
    db.refresh(db_slot)
    return db_slot
