from sqlalchemy import Column, Integer, String, Float, Text, Boolean, ForeignKey, Table
from sqlalchemy.orm import relationship
from .database import Base

class Package(Base):
    __tablename__ = "packages"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    duration = Column(String)  # e.g., "3D/2N"
    description = Column(Text)
    price = Column(Float)
    location = Column(String)
    is_featured = Column(Boolean, default=False)
    rating = Column(Float, default=0.0)
    
    # Relationships
    images = relationship("PackageImage", back_populates="package", cascade="all, delete-orphan")
    itinerary = relationship("ItineraryItem", back_populates="package", cascade="all, delete-orphan")

class PackageImage(Base):
    __tablename__ = "package_images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    package_id = Column(Integer, ForeignKey("packages.id"))

    package = relationship("Package", back_populates="images")

class ItineraryItem(Base):
    __tablename__ = "itinerary_items"

    id = Column(Integer, primary_key=True, index=True)
    day = Column(Integer)
    title = Column(String)
    description = Column(Text)
    package_id = Column(Integer, ForeignKey("packages.id"))

    package = relationship("Package", back_populates="itinerary")


# --- STAYS MODULE ---

# Association table for many-to-many relationship between Stay and Amenity
stay_amenities = Table(
    'stay_amenities',
    Base.metadata,
    Column('stay_id', Integer, ForeignKey('stays.id'), primary_key=True),
    Column('amenity_id', Integer, ForeignKey('amenities.id'), primary_key=True)
)

class Stay(Base):
    __tablename__ = "stays"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, index=True)
    slug = Column(String, unique=True, index=True)
    property_type = Column(String)  # cottage, villa, tent, homestay
    description = Column(Text)
    location = Column(String, index=True)
    price_per_night = Column(Float)
    capacity = Column(Integer)  # max guests
    bedrooms = Column(Integer, default=1)
    bathrooms = Column(Integer, default=1)
    rating = Column(Float, default=0.0)
    is_featured = Column(Boolean, default=False)
    
    # Relationships
    images = relationship("StayImage", back_populates="stay", cascade="all, delete-orphan")
    amenities = relationship("Amenity", secondary=stay_amenities, back_populates="stays")

class StayImage(Base):
    __tablename__ = "stay_images"

    id = Column(Integer, primary_key=True, index=True)
    url = Column(String)
    stay_id = Column(Integer, ForeignKey("stays.id"))

    stay = relationship("Stay", back_populates="images")

class Amenity(Base):
    __tablename__ = "amenities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    icon = Column(String)  # lucide-react icon name
    
    # Relationships
    stays = relationship("Stay", secondary=stay_amenities, back_populates="amenities")


# --- CABS MODULE ---

class CabRoute(Base):
    __tablename__ = "cab_routes"

    id = Column(Integer, primary_key=True, index=True)
    from_location = Column(String, index=True)
    to_location = Column(String, index=True)
    distance_km = Column(Float)
    duration_hours = Column(Float)
    is_active = Column(Boolean, default=True)
    
    # Relationships
    pricing = relationship("CabPricing", back_populates="route", cascade="all, delete-orphan")

class Vehicle(Base):
    __tablename__ = "vehicles"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)  # Sedan, SUV, Tempo Traveller
    capacity = Column(Integer)  # passenger capacity
    luggage_capacity = Column(String)  # e.g., "2 large bags"
    features = Column(Text)  # JSON string of features
    is_active = Column(Boolean, default=True)
    
    # Relationships
    pricing = relationship("CabPricing", back_populates="vehicle", cascade="all, delete-orphan")

class CabPricing(Base):
    __tablename__ = "cab_pricing"

    id = Column(Integer, primary_key=True, index=True)
    route_id = Column(Integer, ForeignKey("cab_routes.id"))
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"))
    price = Column(Float)
    
    # Relationships
    route = relationship("CabRoute", back_populates="pricing")
    vehicle = relationship("Vehicle", back_populates="pricing")


# --- BOOKINGS MODULE ---

class Booking(Base):
    __tablename__ = "bookings"

    id = Column(Integer, primary_key=True, index=True)
    booking_reference = Column(String, unique=True, index=True)
    
    # Polymorphic booking type
    booking_type = Column(String)  # 'package', 'stay', 'cab'
    item_id = Column(Integer)  # ID of the package/stay/route
    
    # For cabs, we also need vehicle_id
    vehicle_id = Column(Integer, ForeignKey("vehicles.id"), nullable=True)
    
    # Customer details
    customer_name = Column(String)
    customer_email = Column(String)
    customer_phone = Column(String)
    
    # Booking details
    booking_date = Column(String)  # When booking was made
    travel_date = Column(String)  # When travel/stay begins
    end_date = Column(String, nullable=True)  # For stays (checkout date)
    
    # Pricing
    total_amount = Column(Float)
    
    # Status
    booking_status = Column(String, default="pending")  # pending, confirmed, cancelled
    payment_status = Column(String, default="pending")  # pending, completed, failed, refunded
    
    # Additional info
    special_requests = Column(Text, nullable=True)
    
# --- ADMIN MODULE ---

class ImageSlot(Base):
    __tablename__ = "image_slots"

    id = Column(Integer, primary_key=True, index=True)
    slot_key = Column(String, unique=True, index=True)  # e.g., "home_hero_1", "explore_kodai_1"
    title = Column(String)
    description = Column(Text)
    image_url = Column(String)
    category = Column(String)  # e.g., "homepage", "gallery"
