from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from .. import models, schemas
from ..database import get_db

router = APIRouter(
    prefix="/packages",
    tags=["packages"],
    responses={404: {"description": "Not found"}},
)

@router.post("/", response_model=schemas.Package)
def create_package(package: schemas.PackageCreate, db: Session = Depends(get_db)):
    # 1. Create Package
    db_package = models.Package(
        title=package.title,
        slug=package.slug,
        duration=package.duration,
        description=package.description,
        price=package.price,
        location=package.location,
        is_featured=package.is_featured,
        rating=package.rating
    )
    db.add(db_package)
    db.commit()
    db.refresh(db_package)

    # 2. Add Images
    for img in package.images:
        db_image = models.PackageImage(url=img.url, package_id=db_package.id)
        db.add(db_image)
    
    # 3. Add Itinerary
    for item in package.itinerary:
        db_item = models.ItineraryItem(
            day=item.day, 
            title=item.title, 
            description=item.description, 
            package_id=db_package.id
        )
        db.add(db_item)
    
    db.commit()
    db.refresh(db_package)
    return db_package

@router.get("/", response_model=List[schemas.Package])
def read_packages(skip: int = 0, limit: int = 100, featured: bool = False, db: Session = Depends(get_db)):
    query = db.query(models.Package)
    if featured:
        query = query.filter(models.Package.is_featured == True)
    return query.offset(skip).limit(limit).all()

@router.get("/{package_id}", response_model=schemas.Package)
def read_package(package_id: int, db: Session = Depends(get_db)):
    db_package = db.query(models.Package).filter(models.Package.id == package_id).first()
    if db_package is None:
        raise HTTPException(status_code=404, detail="Package not found")
    return db_package
