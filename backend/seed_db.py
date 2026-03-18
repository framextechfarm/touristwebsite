from app.database import SessionLocal, engine, Base
from app import models

def init_db():
    Base.metadata.create_all(bind=engine)

def seed_data():
    db = SessionLocal()

    # Check if data exists
    if db.query(models.Package).first():
        print("Data already exists.")
        db.close()
        return

    # Sample Package 1
    pkg1 = models.Package(
        title="Kodaikanal Mist Experience",
        slug="kodaikanal-mist-experience",
        duration="3D/2N",
        description="Experience the misty mountains of Kodaikanal conformably. Includes stay at a premium cottage and guided sightseeing.",
        price=4999.0,
        location="Kodaikanal",
        is_featured=True,
        rating=4.8
    )
    db.add(pkg1)
    db.commit()
    db.refresh(pkg1)

    # Images for Pkg 1
    imgs1 = [
        models.PackageImage(url="https://images.unsplash.com/photo-1548679848-ac19a8a7ca23?q=80&w=1000&auto=format&fit=crop", package_id=pkg1.id),
        models.PackageImage(url="https://images.unsplash.com/photo-1596895111956-bf1cf0599ce5?q=80&w=1000&auto=format&fit=crop", package_id=pkg1.id)
    ]
    db.add_all(imgs1)

    # Itinerary for Pkg 1
    itin1 = [
        models.ItineraryItem(day=1, title="Arrival & Lake Tour", description="Pick up from bus stand. Check-in to cottage. Evening boat ride at Kodai Lake.", package_id=pkg1.id),
        models.ItineraryItem(day=2, title="Valley View & Pillars", description="Visit Coaker's Walk, Pillar Rocks, and Guna Caves. Lunch at Altaf's.", package_id=pkg1.id),
        models.ItineraryItem(day=3, title="Village Trek & Departure", description="Short trek to Poombarai village viewing the terrace farming. Drop off at bus stand.", package_id=pkg1.id)
    ]
    db.add_all(itin1)

    # Sample Package 2
    pkg2 = models.Package(
        title="Ooty & Coonoor Delight",
        slug="ooty-coonoor-delight",
        duration="4D/3N",
        description="A complete tour of the Queen of Hills. Toy train ride, tea gardens, and botanical gardens included.",
        price=7500.0,
        location="Ooty",
        is_featured=True,
        rating=4.7
    )
    db.add(pkg2)
    db.commit()
    db.refresh(pkg2)
    
    # Images for Pkg 2
    imgs2 = [
        models.PackageImage(url="https://images.unsplash.com/photo-1517822982838-8fa195b058c4?q=80&w=1000&auto=format&fit=crop", package_id=pkg2.id)
    ]
    db.add_all(imgs2)

    db.commit()
    print("Seeding complete!")
    db.close()

if __name__ == "__main__":
    init_db()
    seed_data()
