from app.database import SessionLocal
from app.models import CabRoute, Vehicle, CabPricing

def seed_vehicles():
    """Create vehicle types"""
    db = SessionLocal()
    
    vehicles_data = [
        {
            "name": "Sedan",
            "capacity": 4,
            "luggage_capacity": "2 large bags",
            "features": "AC, Music System, Comfortable seats"
        },
        {
            "name": "SUV",
            "capacity": 6,
            "luggage_capacity": "4 large bags",
            "features": "AC, Music System, Extra legroom, Spacious"
        },
        {
            "name": "Tempo Traveller",
            "capacity": 12,
            "luggage_capacity": "8 large bags",
            "features": "AC, Music System, Reclining seats, Ample luggage space"
        }
    ]
    
    vehicles = []
    for data in vehicles_data:
        existing = db.query(Vehicle).filter(Vehicle.name == data["name"]).first()
        if not existing:
            vehicle = Vehicle(**data)
            db.add(vehicle)
            vehicles.append(vehicle)
        else:
            vehicles.append(existing)
    
    db.commit()
    print(f"✅ Created {len(vehicles_data)} vehicle types")
    return vehicles

def seed_routes_and_pricing():
    """Create cab routes and pricing"""
    db = SessionLocal()
    
    # Get vehicles
    sedan = db.query(Vehicle).filter(Vehicle.name == "Sedan").first()
    suv = db.query(Vehicle).filter(Vehicle.name == "SUV").first()
    tempo = db.query(Vehicle).filter(Vehicle.name == "Tempo Traveller").first()
    
    routes_data = [
        {
            "from_location": "Bangalore",
            "to_location": "Ooty",
            "distance_km": 270,
            "duration_hours": 6.5,
            "pricing": {
                sedan.id: 5500,
                suv.id: 7500,
                tempo.id: 12000
            }
        },
        {
            "from_location": "Bangalore",
            "to_location": "Kodaikanal",
            "distance_km": 460,
            "duration_hours": 9,
            "pricing": {
                sedan.id: 9000,
                suv.id: 12000,
                tempo.id: 18000
            }
        },
        {
            "from_location": "Bangalore",
            "to_location": "Munnar",
            "distance_km": 520,
            "duration_hours": 10,
            "pricing": {
                sedan.id: 10000,
                suv.id: 13500,
                tempo.id: 20000
            }
        },
        {
            "from_location": "Bangalore",
            "to_location": "Coonoor",
            "distance_km": 280,
            "duration_hours": 7,
            "pricing": {
                sedan.id: 5800,
                suv.id: 7800,
                tempo.id: 12500
            }
        },
        {
            "from_location": "Coimbatore",
            "to_location": "Ooty",
            "distance_km": 90,
            "duration_hours": 2.5,
            "pricing": {
                sedan.id: 2500,
                suv.id: 3500,
                tempo.id: 5500
            }
        },
        {
            "from_location": "Coimbatore",
            "to_location": "Kodaikanal",
            "distance_km": 175,
            "duration_hours": 4.5,
            "pricing": {
                sedan.id: 4500,
                suv.id: 6000,
                tempo.id: 9000
            }
        },
        {
            "from_location": "Chennai",
            "to_location": "Ooty",
            "distance_km": 560,
            "duration_hours": 11,
            "pricing": {
                sedan.id: 11000,
                suv.id: 14500,
                tempo.id: 22000
            }
        },
        {
            "from_location": "Kochi",
            "to_location": "Munnar",
            "distance_km": 130,
            "duration_hours": 4,
            "pricing": {
                sedan.id: 3500,
                suv.id: 4800,
                tempo.id: 7500
            }
        },
        {
            "from_location": "Ooty",
            "to_location": "Coonoor",
            "distance_km": 19,
            "duration_hours": 0.5,
            "pricing": {
                sedan.id: 800,
                suv.id: 1200,
                tempo.id: 2000
            }
        },
        {
            "from_location": "Madurai",
            "to_location": "Kodaikanal",
            "distance_km": 120,
            "duration_hours": 3,
            "pricing": {
                sedan.id: 3000,
                suv.id: 4200,
                tempo.id: 6500
            }
        }
    ]
    
    for data in routes_data:
        existing = db.query(CabRoute).filter(
            CabRoute.from_location == data["from_location"],
            CabRoute.to_location == data["to_location"]
        ).first()
        
        if existing:
            print(f"⏭️  Route '{data['from_location']} → {data['to_location']}' already exists, skipping...")
            continue
        
        # Extract pricing
        pricing_data = data.pop("pricing")
        
        # Create route
        route = CabRoute(**data)
        db.add(route)
        db.flush()  # Get the route ID
        
        # Add pricing for each vehicle
        for vehicle_id, price in pricing_data.items():
            pricing = CabPricing(
                route_id=route.id,
                vehicle_id=vehicle_id,
                price=price
            )
            db.add(pricing)
        
        print(f"✅ Created route: {data['from_location']} → {data['to_location']}")
    
    db.commit()
    db.close()
    print("\n🎉 Database seeding complete!")

if __name__ == "__main__":
    print("🌱 Seeding database with cab routes and vehicles...\n")
    seed_vehicles()
    seed_routes_and_pricing()
