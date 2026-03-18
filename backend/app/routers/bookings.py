from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from datetime import datetime
import random
import string
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/bookings", tags=["bookings"])

def generate_booking_reference():
    """Generate a unique booking reference like BK-ABC123"""
    letters = ''.join(random.choices(string.ascii_uppercase, k=3))
    numbers = ''.join(random.choices(string.digits, k=3))
    return f"BK-{letters}{numbers}"

@router.post("/", response_model=schemas.Booking)
def create_booking(booking: schemas.BookingCreate, db: Session = Depends(get_db)):
    """Create a new booking"""
    
    # Validate booking type
    if booking.booking_type not in ['package', 'stay', 'cab']:
        raise HTTPException(status_code=400, detail="Invalid booking type")
    
    # Verify the item exists
    if booking.booking_type == 'package':
        item = db.query(models.Package).filter(models.Package.id == booking.item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Package not found")
    elif booking.booking_type == 'stay':
        item = db.query(models.Stay).filter(models.Stay.id == booking.item_id).first()
        if not item:
            raise HTTPException(status_code=404, detail="Stay not found")
    elif booking.booking_type == 'cab':
        route = db.query(models.CabRoute).filter(models.CabRoute.id == booking.item_id).first()
        if not route:
            raise HTTPException(status_code=404, detail="Cab route not found")
        if booking.vehicle_id:
            vehicle = db.query(models.Vehicle).filter(models.Vehicle.id == booking.vehicle_id).first()
            if not vehicle:
                raise HTTPException(status_code=404, detail="Vehicle not found")
    
    # Generate unique booking reference
    booking_ref = generate_booking_reference()
    while db.query(models.Booking).filter(models.Booking.booking_reference == booking_ref).first():
        booking_ref = generate_booking_reference()
    
    # Create booking
    db_booking = models.Booking(
        booking_reference=booking_ref,
        booking_type=booking.booking_type,
        item_id=booking.item_id,
        vehicle_id=booking.vehicle_id,
        customer_name=booking.customer_name,
        customer_email=booking.customer_email,
        customer_phone=booking.customer_phone,
        booking_date=datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
        travel_date=booking.travel_date,
        end_date=booking.end_date,
        total_amount=booking.total_amount,
        special_requests=booking.special_requests,
        booking_status="pending",
        payment_status="pending"
    )
    
    db.add(db_booking)
    db.commit()
    db.refresh(db_booking)
    return db_booking

@router.get("/{booking_id}", response_model=schemas.Booking)
def get_booking(booking_id: int, db: Session = Depends(get_db)):
    """Get booking details by ID"""
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    return booking

@router.get("/", response_model=List[schemas.BookingList])
def get_all_bookings(db: Session = Depends(get_db)):
    """Get all bookings (Admin only - auth to be added later)"""
    bookings = db.query(models.Booking).all()
    return bookings

@router.patch("/{booking_id}/status", response_model=schemas.Booking)
def update_booking_status(
    booking_id: int,
    status_update: schemas.BookingStatusUpdate,
    db: Session = Depends(get_db)
):
    """Update booking status"""
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    if status_update.booking_status:
        booking.booking_status = status_update.booking_status
    if status_update.payment_status:
        booking.payment_status = status_update.payment_status
    
    db.commit()
    db.refresh(booking)
    return booking

@router.post("/{booking_id}/confirm", response_model=schemas.Booking)
def confirm_payment(booking_id: int, db: Session = Depends(get_db)):
    """Confirm payment for a booking (Mock payment)"""
    booking = db.query(models.Booking).filter(models.Booking.id == booking_id).first()
    if not booking:
        raise HTTPException(status_code=404, detail="Booking not found")
    
    # Mock payment confirmation
    booking.payment_status = "completed"
    booking.booking_status = "confirmed"
    
    db.commit()
    db.refresh(booking)
    return booking
