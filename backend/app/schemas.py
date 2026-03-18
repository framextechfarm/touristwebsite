from pydantic import BaseModel
from typing import List, Optional

# --- Shared Properties ---
class ItineraryItemBase(BaseModel):
    day: int
    title: str
    description: Optional[str] = None

class PackageImageBase(BaseModel):
    url: str

class PackageBase(BaseModel):
    title: str
    slug: str
    duration: str
    description: Optional[str] = None
    price: float
    location: str
    is_featured: bool = False
    rating: Optional[float] = 0.0

# --- Creation Schemas ---
class ItineraryItemCreate(ItineraryItemBase):
    pass

class PackageImageCreate(PackageImageBase):
    pass

class PackageCreate(PackageBase):
    images: List[PackageImageCreate] = []
    itinerary: List[ItineraryItemCreate] = []

# --- Reading Schemas (Response) ---
class ItineraryItem(ItineraryItemBase):
    id: int
    package_id: int

    class Config:
        from_attributes = True

class PackageImage(PackageImageBase):
    id: int
    package_id: int

    class Config:
        from_attributes = True

class Package(PackageBase):
    id: int
    images: List[PackageImage] = []
    itinerary: List[ItineraryItem] = []

    class Config:
        from_attributes = True


# --- STAYS MODULE ---

# Amenity Schemas
class AmenityBase(BaseModel):
    name: str
    icon: str

class AmenityCreate(AmenityBase):
    pass

class Amenity(AmenityBase):
    id: int

    class Config:
        from_attributes = True

# Stay Image Schemas
class StayImageBase(BaseModel):
    url: str

class StayImageCreate(StayImageBase):
    pass

class StayImage(StayImageBase):
    id: int
    stay_id: int

    class Config:
        from_attributes = True

# Stay Schemas
class StayBase(BaseModel):
    name: str
    slug: str
    property_type: str
    description: Optional[str] = None
    location: str
    price_per_night: float
    capacity: int
    bedrooms: int = 1
    bathrooms: int = 1
    rating: Optional[float] = 0.0
    is_featured: bool = False

class StayCreate(StayBase):
    images: List[StayImageCreate] = []
    amenity_ids: List[int] = []

class Stay(StayBase):
    id: int
    images: List[StayImage] = []
    amenities: List[Amenity] = []

    class Config:
        from_attributes = True

# Simplified Stay for listing (without full details)
class StayList(BaseModel):
    id: int
    name: str
    slug: str
    property_type: str
    location: str
    price_per_night: float
    capacity: int
    rating: float
    is_featured: bool
    images: List[StayImage] = []
    amenities: List[Amenity] = []

    class Config:
        from_attributes = True


# --- CABS MODULE ---

# Vehicle Schemas
class VehicleBase(BaseModel):
    name: str
    capacity: int
    luggage_capacity: str
    features: str

class VehicleCreate(VehicleBase):
    pass

class Vehicle(VehicleBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# CabRoute Schemas
class CabRouteBase(BaseModel):
    from_location: str
    to_location: str
    distance_km: float
    duration_hours: float

class CabRouteCreate(CabRouteBase):
    pass

class CabRoute(CabRouteBase):
    id: int
    is_active: bool

    class Config:
        from_attributes = True

# CabPricing Schemas
class CabPricingBase(BaseModel):
    route_id: int
    vehicle_id: int
    price: float

class CabPricingCreate(CabPricingBase):
    pass

class CabPricing(CabPricingBase):
    id: int

    class Config:
        from_attributes = True

# Search Request/Response
class CabSearchRequest(BaseModel):
    from_location: str
    to_location: str

class CabSearchResult(BaseModel):
    route: CabRoute
    vehicle: Vehicle
    price: float

    class Config:
        from_attributes = True


# --- BOOKINGS MODULE ---

class BookingBase(BaseModel):
    booking_type: str  # 'package', 'stay', 'cab'
    item_id: int
    vehicle_id: Optional[int] = None
    customer_name: str
    customer_email: str
    customer_phone: str
    travel_date: str
    end_date: Optional[str] = None
    total_amount: float
    special_requests: Optional[str] = None

class BookingCreate(BookingBase):
    pass

class Booking(BookingBase):
    id: int
    booking_reference: str
    booking_date: str
    booking_status: str
    payment_status: str

    class Config:
        from_attributes = True

class BookingList(BaseModel):
    id: int
    booking_reference: str
    booking_type: str
    customer_name: str
    travel_date: str
    total_amount: float
    booking_status: str
    payment_status: str

    class Config:
        from_attributes = True

# --- ADMIN/IMAGE SLOTS ---

class ImageSlotBase(BaseModel):
    slot_key: str
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = "homepage"

class ImageSlotCreate(ImageSlotBase):
    pass

class ImageSlotUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None

class ImageSlot(ImageSlotBase):
    id: int

    class Config:
        from_attributes = True
