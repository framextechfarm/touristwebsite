from app.database import SessionLocal
from app.models import Stay, StayImage, Amenity

def seed_amenities():
    """Create common amenities"""
    db = SessionLocal()
    
    amenities_data = [
        {"name": "WiFi", "icon": "Wifi"},
        {"name": "Parking", "icon": "Car"},
        {"name": "Kitchen", "icon": "ChefHat"},
        {"name": "Air Conditioning", "icon": "Wind"},
        {"name": "Heating", "icon": "Flame"},
        {"name": "TV", "icon": "Tv"},
        {"name": "Fireplace", "icon": "Flame"},
        {"name": "Mountain View", "icon": "Mountain"},
        {"name": "Garden", "icon": "Trees"},
        {"name": "Balcony", "icon": "Home"},
        {"name": "Hot Water", "icon": "Droplets"},
        {"name": "Pet Friendly", "icon": "Dog"},
    ]
    
    amenities = []
    for data in amenities_data:
        existing = db.query(Amenity).filter(Amenity.name == data["name"]).first()
        if not existing:
            amenity = Amenity(**data)
            db.add(amenity)
            amenities.append(amenity)
        else:
            amenities.append(existing)
    
    db.commit()
    print(f"✅ Created {len(amenities_data)} amenities")
    return amenities

def seed_stays():
    """Create sample stays"""
    db = SessionLocal()
    
    # Get amenities
    wifi = db.query(Amenity).filter(Amenity.name == "WiFi").first()
    parking = db.query(Amenity).filter(Amenity.name == "Parking").first()
    kitchen = db.query(Amenity).filter(Amenity.name == "Kitchen").first()
    ac = db.query(Amenity).filter(Amenity.name == "Air Conditioning").first()
    heating = db.query(Amenity).filter(Amenity.name == "Heating").first()
    tv = db.query(Amenity).filter(Amenity.name == "TV").first()
    fireplace = db.query(Amenity).filter(Amenity.name == "Fireplace").first()
    mountain_view = db.query(Amenity).filter(Amenity.name == "Mountain View").first()
    garden = db.query(Amenity).filter(Amenity.name == "Garden").first()
    balcony = db.query(Amenity).filter(Amenity.name == "Balcony").first()
    hot_water = db.query(Amenity).filter(Amenity.name == "Hot Water").first()
    
    stays_data = [
        {
            "name": "Misty Mountain Cottage",
            "slug": "misty-mountain-cottage",
            "property_type": "cottage",
            "description": "A cozy cottage nestled in the hills with breathtaking mountain views. Perfect for couples seeking a romantic getaway.",
            "location": "Kodaikanal",
            "price_per_night": 3500.0,
            "capacity": 2,
            "bedrooms": 1,
            "bathrooms": 1,
            "rating": 4.8,
            "is_featured": True,
            "images": [
                "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
                "https://images.unsplash.com/photo-1542718610-a1d656d1884c?w=800",
            ],
            "amenities": [wifi, parking, kitchen, heating, fireplace, mountain_view, hot_water]
        },
        {
            "name": "Valley View Villa",
            "slug": "valley-view-villa",
            "property_type": "villa",
            "description": "Luxurious 3-bedroom villa with panoramic valley views. Ideal for families and groups looking for premium comfort.",
            "location": "Ooty",
            "price_per_night": 8500.0,
            "capacity": 6,
            "bedrooms": 3,
            "bathrooms": 2,
            "rating": 4.9,
            "is_featured": True,
            "images": [
                "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
                "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
            ],
            "amenities": [wifi, parking, kitchen, ac, heating, tv, balcony, mountain_view, garden, hot_water]
        },
        {
            "name": "Riverside Glamping Tent",
            "slug": "riverside-glamping-tent",
            "property_type": "tent",
            "description": "Experience luxury camping by the riverside. Wake up to the sound of flowing water and chirping birds.",
            "location": "Munnar",
            "price_per_night": 2500.0,
            "capacity": 2,
            "bedrooms": 1,
            "bathrooms": 1,
            "rating": 4.6,
            "is_featured": False,
            "images": [
                "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800",
                "https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800",
            ],
            "amenities": [parking, hot_water, mountain_view, garden]
        },
        {
            "name": "Heritage Homestay",
            "slug": "heritage-homestay",
            "property_type": "homestay",
            "description": "Traditional homestay with authentic local cuisine. Experience the warmth of hill station hospitality.",
            "location": "Coonoor",
            "price_per_night": 2000.0,
            "capacity": 4,
            "bedrooms": 2,
            "bathrooms": 1,
            "rating": 4.7,
            "is_featured": False,
            "images": [
                "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800",
                "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800",
            ],
            "amenities": [wifi, parking, kitchen, tv, garden, hot_water]
        },
        {
            "name": "Pine Forest Retreat",
            "slug": "pine-forest-retreat",
            "property_type": "cottage",
            "description": "Secluded cottage surrounded by pine trees. Perfect for nature lovers and those seeking tranquility.",
            "location": "Kodaikanal",
            "price_per_night": 4000.0,
            "capacity": 4,
            "bedrooms": 2,
            "bathrooms": 1,
            "rating": 4.8,
            "is_featured": True,
            "images": [
                "https://images.unsplash.com/photo-1449158743715-0a90ebb6d2d8?w=800",
                "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
            ],
            "amenities": [wifi, parking, kitchen, heating, fireplace, balcony, mountain_view, hot_water]
        }
    ]
    
    for data in stays_data:
        existing = db.query(Stay).filter(Stay.slug == data["slug"]).first()
        if existing:
            print(f"⏭️  Stay '{data['name']}' already exists, skipping...")
            continue
        
        # Extract amenities and images
        amenities = data.pop("amenities")
        image_urls = data.pop("images")
        
        # Create stay
        stay = Stay(**data)
        
        # Add images
        for url in image_urls:
            stay.images.append(StayImage(url=url))
        
        # Add amenities
        stay.amenities = amenities
        
        db.add(stay)
        print(f"✅ Created stay: {data['name']}")
    
    db.commit()
    db.close()
    print("\n🎉 Database seeding complete!")

if __name__ == "__main__":
    print("🌱 Seeding database with stays and amenities...\n")
    seed_amenities()
    seed_stays()
