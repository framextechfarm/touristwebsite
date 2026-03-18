from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/stays", tags=["stays"])

@router.get("/", response_model=List[schemas.StayList])
def get_stays(
    location: Optional[str] = None,
    property_type: Optional[str] = None,
    min_price: Optional[float] = None,
    max_price: Optional[float] = None,
    min_capacity: Optional[int] = None,
    db: Session = Depends(get_db)
):
    """
    Get all stays with optional filters:
    - location: Filter by location
    - property_type: cottage, villa, tent, homestay
    - min_price/max_price: Price range per night
    - min_capacity: Minimum guest capacity
    """
    query = db.query(models.Stay)
    
    if location:
        query = query.filter(models.Stay.location.ilike(f"%{location}%"))
    if property_type:
        query = query.filter(models.Stay.property_type == property_type)
    if min_price is not None:
        query = query.filter(models.Stay.price_per_night >= min_price)
    if max_price is not None:
        query = query.filter(models.Stay.price_per_night <= max_price)
    if min_capacity is not None:
        query = query.filter(models.Stay.capacity >= min_capacity)
    
    stays = query.all()
    return stays

@router.get("/{stay_id}", response_model=schemas.Stay)
def get_stay(stay_id: int, db: Session = Depends(get_db)):
    """Get a single stay by ID with full details including amenities"""
    stay = db.query(models.Stay).filter(models.Stay.id == stay_id).first()
    if not stay:
        raise HTTPException(status_code=404, detail="Stay not found")
    return stay

@router.post("/", response_model=schemas.Stay)
def create_stay(stay: schemas.StayCreate, db: Session = Depends(get_db)):
    """Create a new stay (Admin only - auth to be added later)"""
    
    # Create the stay
    db_stay = models.Stay(
        name=stay.name,
        slug=stay.slug,
        property_type=stay.property_type,
        description=stay.description,
        location=stay.location,
        price_per_night=stay.price_per_night,
        capacity=stay.capacity,
        bedrooms=stay.bedrooms,
        bathrooms=stay.bathrooms,
        rating=stay.rating,
        is_featured=stay.is_featured
    )
    
    # Add images
    for img in stay.images:
        db_img = models.StayImage(url=img.url)
        db_stay.images.append(db_img)
    
    # Add amenities
    if stay.amenity_ids:
        amenities = db.query(models.Amenity).filter(models.Amenity.id.in_(stay.amenity_ids)).all()
        db_stay.amenities = amenities
    
    db.add(db_stay)
    db.commit()
    db.refresh(db_stay)
    return db_stay
