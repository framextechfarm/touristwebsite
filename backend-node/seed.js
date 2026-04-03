/**
 * Seed script for the HillTrek PostgreSQL database.
 * Run: node seed.js
 * (Make sure prisma db push has been run first to create the schema)
 */

require("dotenv").config();
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱  Seeding database...");
  
  // Clear existing package data
  await prisma.itineraryItem.deleteMany();
  await prisma.packageImage.deleteMany();
  await prisma.package.deleteMany();

  // ─── Packages ─────────────────────────────────────────────────────────────
  const packages = [
    {
      title: "TOUR 1: VALLEY TOUR",
      slug: "valley-tour",
      duration: "1 Day",
      description: "Explore the heart of Kodaikanal. From the historic Coakers Walk to the breathtaking Pillar Rocks, witness the valley's most iconic landmarks.",
      price: 400.0,
      location: "Kodaikanal",
      isFeatured: true,
      rating: 4.9,
      images: [{ url: "/images/tours/valley.png" }],
      itinerary: [
        { day: 1, title: "Coakers walk", description: "Visiting Coakers walk" },
        { day: 1, title: "La saleth church", description: "Visiting La saleth church" },
        { day: 1, title: "Pambar Falls", description: "Visiting Pambar Falls" },
        { day: 1, title: "Shopping Place", description: "Visiting Shopping Place" },
        { day: 1, title: "Green Valley View (suicide point)", description: "Visiting Green Valley View (suicide point)" },
        { day: 1, title: "Pillar Rock", description: "Visiting Pillar Rock" },
        { day: 1, title: "Guna Cave (Devil's Kitchen)", description: "Visiting Guna Cave (Devil's Kitchen)" },
        { day: 1, title: "500 years old tree", description: "Visiting 500 years old tree" },
        { day: 1, title: "Pine Tree Forest", description: "Visiting Pine Tree Forest" },
        { day: 1, title: "Moir Point", description: "Visiting Moir Point" },
        { day: 1, title: "Vaigai Dam View", description: "Visiting Vaigai Dam View" },
        { day: 1, title: "Bryant Park", description: "Visiting Bryant Park" },
        { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" },
      ],
    },
    {
      title: "TOUR 2: VILLAGE TOUR",
      slug: "village-tour",
      duration: "1 Day",
      description: "Experience the authentic rural charm of Kodaikanal. Visit ancient temples, agricultural terraces, and peaceful farms for a glimpse into local life.",
      price: 600.0,
      location: "Kodaikanal Villages",
      isFeatured: true,
      rating: 4.8,
      images: [{ url: "/images/tours/village.png" }],
      itinerary: [
        { day: 1, title: "Palani View", description: "Visiting Palani View" },
        { day: 1, title: "Mahalakshmi Temple", description: "Visiting Mahalakshmi Temple" },
        { day: 1, title: "Poombari village view", description: "Visiting Poombari village view" },
        { day: 1, title: "Kulanthai Vellappar Temple (3000 years old)", description: "Visiting Kulanthai Vellappar Temple (3000 years old)" },
        { day: 1, title: "Sheep & Rabbit Farm", description: "Visiting Sheep & Rabbit Farm" },
        { day: 1, title: "Mannavanur Lake", description: "Visiting Mannavanur Lake" },
        { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" },
      ],
    },
    {
      title: "TOUR 3: WILD WAYS TOUR",
      slug: "wild-ways-tour",
      duration: "1 Day",
      description: "Venture into the restricted forest areas and serene lakes. Experience the 'Memory Loss Forest' and the pristine beauty of Berijam Lake area.",
      price: 500.0,
      location: "Berijam / Forest Area",
      isFeatured: true,
      rating: 4.7,
      images: [{ url: "/images/tours/wild-ways.png" }],
      itinerary: [
        { day: 1, title: "Silent Valley View", description: "Visiting Silent Valley View" },
        { day: 1, title: "Berijam Lake view", description: "Visiting Berijam Lake view" },
        { day: 1, title: "Caps Fly Valley", description: "Visiting Caps Fly Valley" },
        { day: 1, title: "Mathikettan Forest view (Memory Loss Forest)", description: "Visiting Mathikettan Forest view (Memory Loss Forest)" },
        { day: 1, title: "Berijam Lake", description: "Visiting Berijam Lake" },
        { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" },
      ],
    },
    {
      title: "TOUR 4: TREKKING TOUR",
      slug: "trekking-tour",
      duration: "1 Day",
      description: "For the active adventurer. A trekking focused tour visiting hidden falls and the famous Dolphin's Nose for spectacular cliff-side views.",
      price: 0.0,
      location: "Vattakanal / Dolphin Nose",
      isFeatured: true,
      rating: 4.9,
      images: [{ url: "/images/tours/trekking.png" }],
      itinerary: [
        { day: 1, title: "La Saleth Church", description: "Visiting La Saleth Church" },
        { day: 1, title: "500 years old Tree", description: "Visiting 500 years old Tree" },
        { day: 1, title: "Vattakanal Falls", description: "Visiting Vattakanal Falls" },
        { day: 1, title: "Fairy Falls", description: "Visiting Fairy Falls" },
        { day: 1, title: "Mountain Beauty", description: "Visiting Mountain Beauty" },
        { day: 1, title: "Dolphin Nose", description: "Visiting Dolphin Nose" },
        { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" },
      ],
    },
    {
      title: "TOUR 5: ADVENTURE JEEP SAFARI",
      slug: "adventure-jeep-safari",
      duration: "1 Day",
      description: "Go off-the-beaten-path with an exhilarating jeep safari. Visit remote viewpoints and hidden waterfalls accessible only by 4x4 vehicles.",
      price: 0.0,
      location: "Kodaikanal Off-Road",
      isFeatured: true,
      rating: 5.0,
      images: [{ url: "/images/tours/jeep-safari.png" }],
      itinerary: [
        { day: 1, title: "Vattaparai View Point", description: "Visiting Vattaparai View Point" },
        { day: 1, title: "Off Road Jeep Safari", description: "Visiting Off Road Jeep Safari" },
        { day: 1, title: "Pepper Falls", description: "Visiting Pepper Falls" },
        { day: 1, title: "Sliding Fall", description: "Visiting Sliding Fall" },
        { day: 1, title: "Mehandi Circle view point", description: "Visiting Mehandi Circle view point" },
        { day: 1, title: "Palani City view", description: "Visiting Palani City view" },
        { day: 1, title: "Kodaikanal Lake or City Drop", description: "Visiting Kodaikanal Lake or City Drop" },
      ],
    },
  ];

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { slug: pkg.slug },
      update: {},
      create: {
        ...pkg,
        images: { create: pkg.images },
        itinerary: { create: pkg.itinerary },
      },
    });
  }
  console.log(`✅  Seeded ${packages.length} packages`);

  // ─── Amenities ────────────────────────────────────────────────────────────
  const amenities = [
    { name: "Free Wi-Fi", icon: "Wifi" },
    { name: "Parking", icon: "Car" },
    { name: "Breakfast Included", icon: "Coffee" },
    { name: "Mountain View", icon: "Mountain" },
    { name: "Bonfire", icon: "Flame" },
    { name: "Hiking Trails", icon: "Footprints" },
  ];

  for (const a of amenities) {
    await prisma.amenity.upsert({ where: { name: a.name }, update: {}, create: a });
  }
  console.log(`✅  Seeded ${amenities.length} amenities`);

  const allAmenities = await prisma.amenity.findMany();
  const amenityMap = Object.fromEntries(allAmenities.map((a) => [a.name, a.id]));

  // ─── Stays ────────────────────────────────────────────────────────────────
  const stays = [
    {
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
        { url: "/images/stays/aframestay/IMG-20260331-WA0013.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0015.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0016.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0019.jpg.jpeg" }
      ],
      amenityIds: ["Free Wi-Fi", "Mountain View", "Breakfast Included", "Bonfire"],
    },
    {
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
        { url: "/images/stays/tentstay/IMG-20260331-WA0051.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0056.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0058.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0059.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0067.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0072.jpg.jpeg" }
      ],
      amenityIds: ["Bonfire", "Hiking Trails", "Mountain View"],
    },
    {
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
        { url: "/images/stays/hutstay/IMG-20260331-WA0027.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0029.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0030.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0041.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0074.jpg.jpeg" }
      ],
      amenityIds: ["Bonfire", "Parking", "Mountain View"],
    },
    {
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
        { url: "/images/stays/homestay/IMG-20251120-WA0000.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20251229-WA0005.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260309-WA0015.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260309-WA0019.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260309-WA0020.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260309-WA0023.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260327-WA0007.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260327-WA0009.jpg.jpeg" },
        { url: "/images/stays/homestay/IMG-20260327-WA0039.jpg.jpeg" }
      ],
      amenityIds: ["Free Wi-Fi", "Breakfast Included", "Parking"],
    },
  ];

  for (const stay of stays) {
    const { amenityIds, images, ...data } = stay;
    await prisma.stay.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        images: {
          deleteMany: {}, // Clear old images
          create: images,
        },
        amenities: {
          deleteMany: {}, // Clear old amenities
          create: amenityIds.map((name) => ({ amenityId: amenityMap[name] })),
        },
      },
      create: {
        ...data,
        images: { create: images },
        amenities: {
          create: amenityIds.map((name) => ({ amenityId: amenityMap[name] })),
        },
      },
    });
  }
  console.log(`✅  Seeded ${stays.length} stays`);

  // ─── Cabs ─────────────────────────────────────────────────────────────────
  const vehicles = [
    { name: "Sedan", capacity: 4, luggageCapacity: "2 medium bags", features: JSON.stringify(["AC", "Music System"]), isActive: true },
    { name: "SUV", capacity: 6, luggageCapacity: "3 large bags", features: JSON.stringify(["AC", "4WD", "Music System", "USB Charging"]), isActive: true },
    { name: "Tempo Traveller", capacity: 12, luggageCapacity: "6 large bags", features: JSON.stringify(["AC", "Push-back Seats", "Music System"]), isActive: true },
  ];

  for (const v of vehicles) {
    await prisma.vehicle.upsert({ where: { name: v.name }, update: {}, create: v });
  }

  const allVehicles = await prisma.vehicle.findMany();
  const vehicleMap = Object.fromEntries(allVehicles.map((v) => [v.name, v.id]));

  const routes = [
    { fromLocation: "Delhi", toLocation: "Manali", distanceKm: 540, durationHours: 12, isActive: true },
    { fromLocation: "Manali", toLocation: "Leh", distanceKm: 480, durationHours: 10, isActive: true },
    { fromLocation: "Delhi", toLocation: "Shimla", distanceKm: 370, durationHours: 8, isActive: true },
  ];

  for (const r of routes) {
    const existing = await prisma.cabRoute.findFirst({
      where: { fromLocation: r.fromLocation, toLocation: r.toLocation },
    });
    if (!existing) {
      const route = await prisma.cabRoute.create({ data: r });

      // Seed pricing for each vehicle
      const pricingMultiplier = { Sedan: 1, SUV: 1.5, "Tempo Traveller": 2 };
      const basePrice = r.distanceKm * 0.5;

      for (const vehicle of allVehicles) {
        await prisma.cabPricing.create({
          data: {
            routeId: route.id,
            vehicleId: vehicle.id,
            price: Math.round(basePrice * (pricingMultiplier[vehicle.name] || 1)),
          },
        });
      }
    }
  }
  console.log(`✅  Seeded ${routes.length} cab routes with pricing`);

  console.log("\n🎉  Seeding complete!");
}

main()
  .catch((e) => {
    console.error("❌  Seeding failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
