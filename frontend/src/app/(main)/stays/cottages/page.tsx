"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bed, Users, Bath, Zap, Check, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type RoomType = {
  id: string;
  name: string;
  description: string;
  capacity: string;
  bedType: string;
  amenities: string[];
  images: string[];
};

const STAY_CATEGORIES: RoomType[] = [
  {
    id: "triple-cot",
    name: "Triple Cot Room",
    description: "Perfect for small families or groups of three. Enjoy a spacious setup with comfortable bedding, stunning valley views, and modern amenities designed for a relaxing mountain getaway.",
    capacity: "Up to 3 guests",
    bedType: "1 Double Bed + 1 Single Bed",
    amenities: ["Valley View", "En-suite Bathroom", "Free Wi-Fi", "Room Heater", "TV", "24/7 Hot Water"],
    images: [
      "/assets/rooms/triple-cot/1.jpg",
      "/assets/rooms/triple-cot/2.jpg"
    ]
  },
  {
    id: "premium-deluxe",
    name: "Premium Deluxe Rooms",
    description: "Experience luxury at its finest. Our premium deluxe rooms feature elegant interiors, a private balcony with panoramic hill views, and top-tier furnishings ensuring maximum comfort.",
    capacity: "Up to 2 adults + 1 child",
    bedType: "1 King Size Bed",
    amenities: ["Private Balcony", "Premium Toiletries", "Mini Fridge", "Free Wi-Fi", "Smart TV", "Room Service"],
    images: [
      "/assets/rooms/premium-deluxe/1.jpg",
      "/assets/rooms/premium-deluxe/2.jpg",
      "/assets/rooms/premium-deluxe/3.jpg",
      "/assets/rooms/premium-deluxe/4.jpg",
      "/assets/rooms/premium-deluxe/5.jpg"
    ]
  },
  {
    id: "super-deluxe",
    name: "Super Deluxe Rooms",
    description: "Offering a perfect blend of modern comfort and rustic charm, the super deluxe rooms are highly spacious and designed to give you a cozy retreat after a long day of sightseeing.",
    capacity: "Up to 3 guests",
    bedType: "1 Queen Size Bed + Extra Bed option",
    amenities: ["Large Windows", "Lounge Area", "Free Wi-Fi", "Coffee Maker", "TV", "24/7 Hot Water"],
    images: [
      "/assets/rooms/super-deluxe/1.jpg",
      "/assets/rooms/super-deluxe/2.jpg",
      "/assets/rooms/super-deluxe/3.jpg",
      "/assets/rooms/super-deluxe/4.jpg",
      "/assets/rooms/super-deluxe/5.jpg",
      "/assets/rooms/super-deluxe/6.jpg",
      "/assets/rooms/super-deluxe/7.jpg",
      "/assets/rooms/super-deluxe/8.jpg",
      "/assets/rooms/super-deluxe/9.jpg"
    ]
  },
  {
    id: "deluxe",
    name: "Deluxe Rooms",
    description: "A comfortable, budget-friendly option without compromising on quality. The deluxe rooms are well-appointed, neat, and equipped with all essential amenities for a pleasant stay.",
    capacity: "Up to 2 guests",
    bedType: "1 Double Bed",
    amenities: ["Comfortable Bedding", "En-suite Bathroom", "Free Wi-Fi", "Wardrobe", "TV"],
    images: [
      "/assets/rooms/deluxe/1.jpg",
      "/assets/rooms/deluxe/2.jpg",
      "/assets/rooms/deluxe/3.jpg",
      "/assets/rooms/deluxe/4.jpg",
      "/assets/rooms/deluxe/5.jpg",
      "/assets/rooms/deluxe/6.jpg",
      "/assets/rooms/deluxe/7.jpg"
    ]
  },
  {
    id: "four-cot",
    name: "Four Cot Room",
    description: "The ideal choice for larger groups or families. This highly spacious room features four individual beds, ensuring everyone has their own comfortable space to unwind.",
    capacity: "Up to 4 guests",
    bedType: "4 Single Beds OR 2 Double Beds",
    amenities: ["Extra Spacious", "Multiple Bathrooms option", "Free Wi-Fi", "Lounge Area", "TV", "Room Heater"],
    images: [
      "/assets/rooms/four-cot/1.jpg",
      "/assets/rooms/four-cot/2.jpg"
    ]
  },
  {
    id: "aframe-stay",
    name: "Luxury A-Frame Stays",
    description: "Experience the unique charm of our A-frame cabins. Architecturally stunning and cozy, these stays offer a perfect blend of modern design and mountain serenity.",
    capacity: "Up to 2 adults + 1 child",
    bedType: "1 Queen Size Bed + Attic Space",
    amenities: ["Unique Architecture", "Attic Bedroom", "Glass Frontage", "Free Wi-Fi", "Mountain View", "Private Setup"],
    images: [
      "/images/stays/aframestay/IMG-20260331-WA0013.jpg.jpeg",
      "/images/stays/aframestay/IMG-20260331-WA0015.jpg.jpeg",
      "/images/stays/aframestay/IMG-20260331-WA0016.jpg.jpeg",
      "/images/stays/aframestay/IMG-20260331-WA0019.jpg.jpeg"
    ]
  },
  {
    id: "homestays",
    name: "Authentic Homestays",
    description: "Immerse yourself in local culture with our handpicked homestays. Enjoy home-cooked traditional meals and warm hospitality from local families in the heart of Kodaikanal.",
    capacity: "Up to 4 guests",
    bedType: "Varies per home (Double/Twin)",
    amenities: ["Traditional Meals", "Local Experience", "Garden Access", "Free Wi-Fi", "Parking", "Personalized Care"],
    images: [
      "/images/stays/homestay/IMG-20251120-WA0000.jpg.jpeg",
      "/images/stays/homestay/IMG-20251229-WA0005.jpg.jpeg",
      "/images/stays/homestay/IMG-20260309-WA0015.jpg.jpeg",
      "/images/stays/homestay/IMG-20260309-WA0019.jpg.jpeg",
      "/images/stays/homestay/IMG-20260309-WA0020.jpg.jpeg"
    ]
  },
  {
    id: "hut-stays",
    name: "Rustic Hut Stays",
    description: "Connect with nature in our traditional-style huts. These stays provide an eco-friendly and minimalist experience without compromising on essential comforts.",
    capacity: "Up to 2 guests",
    bedType: "1 Queen Size Bed",
    amenities: ["Eco-friendly Design", "Rustic Interirors", "Private Campfire Area", "Essential Amenities", "Scenic Surroundings"],
    images: [
      "/images/stays/hutstay/IMG-20260331-WA0027.jpg.jpeg",
      "/images/stays/hutstay/IMG-20260331-WA0029.jpg.jpeg",
      "/images/stays/hutstay/IMG-20260331-WA0030.jpg.jpeg",
      "/images/stays/hutstay/IMG-20260331-WA0041.jpg.jpeg",
      "/images/stays/hutstay/IMG-20260331-WA0074.jpg.jpeg"
    ]
  },
  {
    id: "tent-stays",
    name: "Mountain Tent Stays",
    description: "The ultimate adventure experience. Our secure and high-grade tents offer an authentic camping vibe with comfortable bedding and access to shared quality facilities.",
    capacity: "2-4 guests",
    bedType: "Floor Mattresses / Sleeping Bags",
    amenities: ["Star Gazing", "Secure Camping Site", "Shared Facilities", "Early Morning Trek", "Campfire", "Quality Gear"],
    images: [
      "/images/stays/tentstay/IMG-20260331-WA0051.jpg.jpeg",
      "/images/stays/tentstay/IMG-20260331-WA0056.jpg.jpeg",
      "/images/stays/tentstay/IMG-20260331-WA0058.jpg.jpeg",
      "/images/stays/tentstay/IMG-20260331-WA0059.jpg.jpeg",
      "/images/stays/tentstay/IMG-20260331-WA0067.jpg.jpeg",
      "/images/stays/tentstay/IMG-20260331-WA0072.jpg.jpeg"
    ]
  }
];

const ImageCarousel = ({ images, name }: { images: string[], name: string }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const swipeConfidenceThreshold = 10000;
  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
  };

  return (
    <div className="relative w-full h-[300px] md:h-[500px] rounded-3xl overflow-hidden group bg-secondary/50">
      {/* Fallback pattern when images fail to load or are missing */}
      <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-secondary">
         <span className="text-sm font-bold uppercase tracking-widest opacity-50">Upload {name} Images</span>
      </div>

      <AnimatePresence initial={false} custom={direction}>
        <motion.div
          key={currentIndex}
          custom={direction}
          initial={{ opacity: 0, x: direction > 0 ? 300 : -300 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: direction > 0 ? -300 : 300 }}
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30 },
            opacity: { duration: 0.2 }
          }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={1}
          onDragEnd={(e, { offset, velocity }) => {
            const swipe = swipePower(offset.x, velocity.x);

            if (swipe < -swipeConfidenceThreshold) {
              nextSlide();
            } else if (swipe > swipeConfidenceThreshold) {
              prevSlide();
            }
          }}
          className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
        >
          <Image
            src={images[currentIndex]}
            alt={`${name} - View ${currentIndex + 1}`}
            fill
            className="object-cover pointer-events-none"
            onError={(e) => {
              (e.target as HTMLImageElement).style.opacity = '0';
            }}
          />
        </motion.div>
      </AnimatePresence>

      <div className="absolute inset-0 z-20 flex items-center justify-between p-4 opacity-0 lg:group-hover:opacity-100 transition-opacity pointer-events-none">
        <button 
          onClick={prevSlide}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-colors pointer-events-auto"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-10 h-10 rounded-full bg-black/50 backdrop-blur text-white flex items-center justify-center hover:bg-black/80 transition-colors pointer-events-auto"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center gap-2">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentIndex(idx)}
            className={`w-2 h-2 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-6" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function CottagesPage() {
  const whatsappUrl = (name: string) => `https://wa.me/919003922073?text=${encodeURIComponent(`Hello! I'm interested in enquiring about the ${name}.`)}`;

  return (
    <main className="min-h-screen bg-background text-foreground pt-32 pb-24">
      <div className="max-w-7xl mx-auto px-6 mb-16">
        <Link href="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors font-bold text-sm uppercase tracking-widest mb-8">
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">Premium <span className="text-primary italic">Stays & Experiences</span></h1>
        <p className="text-muted-foreground text-lg max-w-2xl">Discover our exclusive collection of accommodations, from luxury cottages and A-frame cabins to authentic homestays and mountain adventures.</p>
      </div>

      <div className="max-w-7xl mx-auto px-6 space-y-24">
        {STAY_CATEGORIES.map((stay, index) => (
          <div 
            key={stay.id}
            className={`flex flex-col gap-12 ${index % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} items-center`}
          >
            {/* Image Carousel Side */}
            <div className="w-full lg:w-1/2">
              <ImageCarousel images={stay.images} name={stay.name} />
            </div>

            {/* Content Side */}
            <div className="w-full lg:w-1/2 space-y-8">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary mb-6">
                  <Zap className="w-4 h-4" />
                  <span className="text-xs font-bold tracking-widest uppercase">Stay Category {index + 1}</span>
                </div>
                <h2 className="text-4xl font-bold mb-4">{stay.name}</h2>
                <p className="text-muted-foreground text-lg leading-relaxed">{stay.description}</p>
              </div>

              <div className="grid grid-cols-2 gap-6 py-6 border-y border-border">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <Users className="w-4 h-4 text-primary" /> Capacity
                  </h4>
                  <p className="font-medium">{stay.capacity}</p>
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-2 flex items-center gap-2">
                    <Bed className="w-4 h-4 text-primary" /> Setup
                  </h4>
                  <p className="font-medium">{stay.bedType}</p>
                </div>
              </div>



              <div className="pt-4">
                 <a 
                   href={whatsappUrl(stay.name)}
                   target="_blank"
                   rel="noopener noreferrer"
                   className="inline-block bg-primary text-white font-bold px-8 py-4 rounded-xl shadow-xl shadow-primary/20 hover:brightness-110 transition-all active:scale-95"
                 >
                    Enquire Now
                 </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
