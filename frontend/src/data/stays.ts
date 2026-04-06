export interface Amenity {
  id: number;
  name: string;
  icon: string;
}

export interface StayImage {
  id: number;
  url: string;
}

export interface Stay {
  id: number;
  name: string;
  slug: string;
  propertyType: string;
  description: string;
  location: string;
  pricePerNight: number;
  capacity: number;
  bedrooms: number;
  bathrooms: number;
  rating: number;
  isFeatured: boolean;
  images: StayImage[];
}

export const staticStays: Stay[] = [
  {
    id: 1,
    name: "Luxury A-Frame Stays",
    slug: "aframe-stay",
    propertyType: "aframe",
    description: "Experience the unique charm of our A-frame cabins. Architecturally stunning and cozy, these stays offer a perfect blend of modern design and mountain serenity.",
    location: "Kodaikanal Hills",
    pricePerNight: 4500,
    capacity: 3,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.9,
    isFeatured: true,
    images: [
      { id: 1, url: "/images/stays/aframestay/IMG-20260331-WA0013.jpg.jpeg" },
      { id: 2, url: "/images/stays/aframestay/IMG-20260331-WA0015.jpg.jpeg" },
      { id: 3, url: "/images/stays/aframestay/IMG-20260331-WA0016.jpg.jpeg" },
      { id: 4, url: "/images/stays/aframestay/IMG-20260331-WA0019.jpg.jpeg" }
    ]
  },
  {
    id: 2,
    name: "Mountain Tent Stays",
    slug: "tent-stay",
    propertyType: "tent",
    description: "The ultimate adventure experience. Our secure and high-grade tents offer an authentic camping vibe with comfortable bedding and access to shared quality facilities.",
    location: "Kodaikanal Valley",
    pricePerNight: 1200,
    capacity: 4,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.7,
    isFeatured: true,
    images: [
      { id: 5, url: "/images/stays/tentstay/IMG-20260331-WA0051.jpg.jpeg" },
      { id: 6, url: "/images/stays/tentstay/IMG-20260331-WA0056.jpg.jpeg" },
      { id: 7, url: "/images/stays/tentstay/IMG-20260331-WA0058.jpg.jpeg" },
      { id: 8, url: "/images/stays/tentstay/IMG-20260331-WA0059.jpg.jpeg" },
      { id: 9, url: "/images/stays/tentstay/IMG-20260331-WA0067.jpg.jpeg" },
      { id: 10, url: "/images/stays/tentstay/IMG-20260331-WA0072.jpg.jpeg" }
    ]
  },
  {
    id: 3,
    name: "Rustic Hut Stays",
    slug: "hut-stay",
    propertyType: "hut",
    description: "Connect with nature in our traditional-style huts. These stays provide an eco-friendly and minimalist experience without compromising on essential comforts.",
    location: "Kodaikanal Foothills",
    pricePerNight: 1800,
    capacity: 2,
    bedrooms: 1,
    bathrooms: 1,
    rating: 4.8,
    isFeatured: true,
    images: [
      { id: 11, url: "/images/stays/hutstay/IMG-20260331-WA0027.jpg.jpeg" },
      { id: 12, url: "/images/stays/hutstay/IMG-20260331-WA0029.jpg.jpeg" },
      { id: 13, url: "/images/stays/hutstay/IMG-20260331-WA0030.jpg.jpeg" },
      { id: 14, url: "/images/stays/hutstay/IMG-20260331-WA0041.jpg.jpeg" },
      { id: 15, url: "/images/stays/hutstay/IMG-20260331-WA0074.jpg.jpeg" }
    ]
  },
  {
    id: 4,
    name: "Authentic Homestays",
    slug: "homestays",
    propertyType: "homestay",
    description: "Immerse yourself in local culture with our handpicked homestays. Enjoy home-cooked traditional meals and warm hospitality from local families.",
    location: "Kodaikanal Village",
    pricePerNight: 2200,
    capacity: 4,
    bedrooms: 2,
    bathrooms: 1,
    rating: 4.9,
    isFeatured: true,
    images: [
      { id: 16, url: "/images/stays/homestay/IMG-20251120-WA0000.jpg.jpeg" },
      { id: 17, url: "/images/stays/homestay/IMG-20251229-WA0005.jpg.jpeg" },
      { id: 18, url: "/images/stays/homestay/IMG-20260309-WA0015.jpg.jpeg" },
      { id: 19, url: "/images/stays/homestay/IMG-20260309-WA0019.jpg.jpeg" },
      { id: 20, url: "/images/stays/homestay/IMG-20260309-WA0020.jpg.jpeg" },
      { id: 21, url: "/images/stays/homestay/IMG-20260309-WA0023.jpg.jpeg" },
      { id: 22, url: "/images/stays/homestay/IMG-20260327-WA0007.jpg.jpeg" },
      { id: 23, url: "/images/stays/homestay/IMG-20260327-WA0009.jpg.jpeg" },
      { id: 24, url: "/images/stays/homestay/IMG-20260327-WA0039.jpg.jpeg" }
    ]
  },
  {
    id: 5,
    name: "Premium Family Cottage",
    slug: "family-cottage",
    propertyType: "cottage",
    description: "Designed for families seeking a home away from home. These cottages offer expansive living areas, private garden access, and multiple bedding options for a comfortable and memorable group stay.",
    location: "Kodaikanal Valley View",
    pricePerNight: 5500,
    capacity: 5,
    bedrooms: 2,
    bathrooms: 2,
    rating: 5.0,
    isFeatured: true,
    images: [
      { id: 25, url: "/images/cottages/111.jpeg" },
      { id: 26, url: "/images/cottages/1111.jpeg" },
      { id: 27, url: "/images/cottages/11111.jpeg" },
      { id: 28, url: "/images/cottages/111111.jpeg" },
      { id: 29, url: "/images/cottages/1111111.jpeg" },
      { id: 30, url: "/images/cottages/11111111.jpeg" },
      { id: 31, url: "/images/cottages/111111111.jpeg" }
    ]
  }
];
