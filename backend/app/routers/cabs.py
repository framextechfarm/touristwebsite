from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List, Optional
from .. import models, schemas
from ..database import get_db

router = APIRouter(prefix="/cabs", tags=["cabs"])

@router.get("/routes", response_model=List[schemas.CabRoute])
def get_routes(db: Session = Depends(get_db)):
    """Get all available cab routes"""
    routes = db.query(models.CabRoute).filter(models.CabRoute.is_active == True).all()
    return routes

@router.get("/vehicles", response_model=List[schemas.Vehicle])
def get_vehicles(db: Session = Depends(get_db)):
    """Get all available vehicle types"""
    vehicles = db.query(models.Vehicle).filter(models.Vehicle.is_active == True).all()
    return vehicles

@router.post("/search", response_model=List[schemas.CabSearchResult])
def search_cabs(
    search: schemas.CabSearchRequest,
    db: Session = Depends(get_db)
):
    """
    Search for available cabs between two locations.
    Returns all vehicle options with pricing for the route.
    """
    # Find the route
    route = db.query(models.CabRoute).filter(
        models.CabRoute.from_location.ilike(f"%{search.from_location}%"),
        models.CabRoute.to_location.ilike(f"%{search.to_location}%"),
        models.CabRoute.is_active == True
    ).first()
    
    if not route:
        raise HTTPException(status_code=404, detail="No route found between these locations")
    
    # Get all pricing for this route
    pricing_list = db.query(models.CabPricing).filter(
        models.CabPricing.route_id == route.id
    ).all()
    
    # Build results
    results = []
    for pricing in pricing_list:
        vehicle = db.query(models.Vehicle).filter(
            models.Vehicle.id == pricing.vehicle_id,
            models.Vehicle.is_active == True
        ).first()
        
        if vehicle:
            results.append({
                "route": route,
                "vehicle": vehicle,
                "price": pricing.price
            })
    
    return results

@router.post("/routes", response_model=schemas.CabRoute)
def create_route(route: schemas.CabRouteCreate, db: Session = Depends(get_db)):
    """Create a new cab route (Admin only - auth to be added later)"""
    db_route = models.CabRoute(**route.dict())
    db.add(db_route)
    db.commit()
    db.refresh(db_route)
    return db_route

@router.post("/vehicles", response_model=schemas.Vehicle)
def create_vehicle(vehicle: schemas.VehicleCreate, db: Session = Depends(get_db)):
    """Create a new vehicle type (Admin only - auth to be added later)"""
    db_vehicle = models.Vehicle(**vehicle.dict())
    db.add(db_vehicle)
    db.commit()
    db.refresh(db_vehicle)
    return db_vehicle
