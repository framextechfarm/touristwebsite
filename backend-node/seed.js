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

  // ─── Packages ─────────────────────────────────────────────────────────────
  const packages = [
    {
      title: "Rohtang Pass Explorer",
      slug: "rohtang-pass-explorer",
      duration: "3D/2N",
      description: "Conquer the legendary Rohtang Pass with our expert guides. Experience snow-capped peaks and breathtaking valleys.",
      price: 249,
      location: "Himachal Pradesh, India",
      isFeatured: true,
      rating: 4.8,
      images: [{ url: "/assets/destination_1.png" }],
      itinerary: [
        { day: 1, title: "Arrival in Manali", description: "Check-in, local sightseeing and rest." },
        { day: 2, title: "Rohtang Pass Trek", description: "Early morning drive and guided trek to the pass." },
        { day: 3, title: "Return & Departure", description: "Leisure morning, checkout and drop to bus stand." },
      ],
    },
    {
      title: "Zanskar Valley Expedition",
      slug: "zanskar-valley-expedition",
      duration: "5D/4N",
      description: "An epic journey into one of India's most remote and spectacular valleys.",
      price: 399,
      location: "Ladakh, India",
      isFeatured: true,
      rating: 4.9,
      images: [{ url: "/assets/destination_2.png" }],
      itinerary: [
        { day: 1, title: "Leh Arrival & Acclimatisation", description: "Rest and local eateries." },
        { day: 2, title: "Drive to Padum", description: "Scenic highway drive with lunch stops." },
        { day: 3, title: "Zanskar River Trek", description: "Guided riverside trek, monastery visit." },
        { day: 4, title: "Phugtal Monastery", description: "Visit the cliff-carved monastery." },
        { day: 5, title: "Return to Leh", description: "Drive back and departure." },
      ],
    },
    {
      title: "Chandratal Lake Retreat",
      slug: "chandratal-lake-retreat",
      duration: "4D/3N",
      description: "Camp beside the crescent-shaped high-altitude lake at 4,300 meters.",
      price: 189,
      location: "Spiti Valley, India",
      isFeatured: false,
      rating: 4.7,
      images: [{ url: "/assets/hero.png" }],
      itinerary: [
        { day: 1, title: "Manali to Batal", description: "Drive through Rohtang and Kunzam pass." },
        { day: 2, title: "Batal to Chandrataal", description: "Short trek to the lake camp." },
        { day: 3, title: "Lake Exploration", description: "Sunrise hike and photography session." },
        { day: 4, title: "Return to Manali", description: "Drive back via alternate route." },
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
      name: "Himalayan Pine Cottage",
      slug: "himalayan-pine-cottage",
      propertyType: "cottage",
      description: "A charming wooden cottage nestled among pine trees with stunning valley views.",
      location: "Manali, Himachal Pradesh",
      pricePerNight: 120,
      capacity: 4,
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.6,
      isFeatured: true,
      images: [{ url: "/assets/destination_1.png" }],
      amenityIds: ["Free Wi-Fi", "Parking", "Mountain View", "Bonfire"],
    },
    {
      name: "Spiti Nomad Tent",
      slug: "spiti-nomad-tent",
      propertyType: "tent",
      description: "Authentic camping experience under a million stars in the Spiti desert.",
      location: "Spiti Valley, Himachal Pradesh",
      pricePerNight: 55,
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      isFeatured: true,
      images: [{ url: "/assets/destination_2.png" }],
      amenityIds: ["Breakfast Included", "Hiking Trails", "Bonfire"],
    },
    {
      name: "Leh Heritage Homestay",
      slug: "leh-heritage-homestay",
      propertyType: "homestay",
      description: "Stay with a local Ladakhi family and experience authentic mountain life.",
      location: "Leh, Ladakh",
      pricePerNight: 75,
      capacity: 3,
      bedrooms: 2,
      bathrooms: 1,
      rating: 4.9,
      isFeatured: false,
      images: [{ url: "/assets/hero.png" }],
      amenityIds: ["Free Wi-Fi", "Breakfast Included", "Mountain View"],
    },
  ];

  for (const stay of stays) {
    const { amenityIds, images, ...data } = stay;
    await prisma.stay.upsert({
      where: { slug: data.slug },
      update: {},
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
