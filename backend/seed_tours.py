from app.database import SessionLocal, engine, Base
from app import models
import json

def init_db():
    Base.metadata.create_all(bind=engine)

def seed_tours():
    db = SessionLocal()

    # Clear existing package data
    print("Clearing existing tour data...")
    db.query(models.ItineraryItem).delete()
    db.query(models.PackageImage).delete()
    db.query(models.Package).delete()
    db.commit()

    # Data for the 5 tours
    tours_data = [
        {
            "title": "TOUR 1: VALLEY TOUR",
            "slug": "valley-tour",
            "duration": "1 Day",
            "description": "Explore the heart of Kodaikanal. From the historic Coakers Walk to the breathtaking Pillar Rocks, witness the valley's most iconic landmarks.",
            "price": 400.0,
            "location": "Kodaikanal",
            "is_featured": True,
            "rating": 4.9,
            "image_url": "/images/tours/valley.png",
            "itinerary": [
                "Coakers walk",
                "La saleth church",
                "Pambar Falls",
                "Shopping Place",
                "Green Valley View (suicide point)",
                "Pillar Rock",
                "Guna Cave (Devil's Kitchen)",
                "500 years old tree",
                "Pine Tree Forest",
                "Moir Point",
                "Vaigai Dam View",
                "Bryant Park",
                "Kodaikanal Lake or City Drop"
            ]
        },
        {
            "title": "TOUR 2: VILLAGE TOUR",
            "slug": "village-tour",
            "duration": "1 Day",
            "description": "Experience the authentic rural charm of Kodaikanal. Visit ancient temples, agricultural terraces, and peaceful farms for a glimpse into local life.",
            "price": 600.0,
            "location": "Kodaikanal Villages",
            "is_featured": True,
            "rating": 4.8,
            "image_url": "/images/tours/village.png",
            "itinerary": [
                "Palani View",
                "Mahalakshmi Temple",
                "Poombari village view",
                "Kulanthai Vellappar Temple (3000 years old)",
                "Sheep & Rabbit Farm",
                "Mannavanur Lake",
                "Kodaikanal Lake or City Drop"
            ]
        },
        {
            "title": "TOUR 3: WILD WAYS TOUR",
            "slug": "wild-ways-tour",
            "duration": "1 Day",
            "description": "Venture into the restricted forest areas and serene lakes. Experience the 'Memory Loss Forest' and the pristine beauty of Berijam Lake area.",
            "price": 500.0,
            "location": "Berijam / Forest Area",
            "is_featured": True,
            "rating": 4.7,
            "image_url": "/images/tours/wild-ways.png",
            "itinerary": [
                "Silent Valley View",
                "Berijam Lake view",
                "Caps Fly Valley",
                "Mathikettan Forest view (Memory Loss Forest)",
                "Berijam Lake",
                "Kodaikanal Lake or City Drop"
            ]
        },
        {
            "title": "TOUR 4: TREKKING TOUR",
            "slug": "trekking-tour",
            "duration": "1 Day",
            "description": "For the active adventurer. A trekking focused tour visiting hidden falls and the famous Dolphin's Nose for spectacular cliff-side views.",
            "price": 0.0, # Seasonal/Negotiable
            "location": "Vattakanal / Dolphin Nose",
            "is_featured": False,
            "rating": 4.9,
            "image_url": "/images/tours/trekking.png",
            "itinerary": [
                "La Saleth Church",
                "500 years old Tree",
                "Vattakanal Falls",
                "Fairy Falls",
                "Mountain Beauty",
                "Dolphin Nose",
                "Kodaikanal Lake or City Drop"
            ]
        },
        {
            "title": "TOUR 5: ADVENTURE JEEP SAFARI",
            "slug": "adventure-jeep-safari",
            "duration": "1 Day",
            "description": "Go off-the-beaten-path with an exhilarating jeep safari. Visit remote viewpoints and hidden waterfalls accessible only by 4x4 vehicles.",
            "price": 0.0, # Seasonal/Negotiable
            "location": "Kodaikanal Off-Road",
            "is_featured": True,
            "rating": 5.0,
            "image_url": "/images/tours/jeep-safari.png",
            "itinerary": [
                "Vattaparai View Point",
                "Off Road Jeep Safari",
                "Pepper Falls",
                "Sliding Fall",
                "Mehandi Circle view point",
                "Palani City view",
                "Kodaikanal Lake or City Drop"
            ]
        }
    ]

    for tour in tours_data:
        db_package = models.Package(
            title=tour["title"],
            slug=tour["slug"],
            duration=tour["duration"],
            description=tour["description"],
            price=tour["price"],
            location=tour["location"],
            is_featured=tour["is_featured"],
            rating=tour["rating"]
        )
        db.add(db_package)
        db.commit()
        db.refresh(db_package)

        # Add Image
        db_image = models.PackageImage(url=tour["image_url"], package_id=db_package.id)
        db.add(db_image)

        # Add Itinerary Items
        for i, item_title in enumerate(tour["itinerary"]):
            db_item = models.ItineraryItem(
                day=1, 
                title=item_title,
                description=f"Visiting {item_title}",
                package_id=db_package.id
            )
            db.add(db_item)
        
        db.commit()
        print(f"Added tour: {tour['title']}")

    db.close()
    print("Seeding complete!")

if __name__ == "__main__":
    init_db()
    seed_tours()
