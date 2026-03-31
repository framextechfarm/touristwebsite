const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding V2 Stays...");

  const amenities = await prisma.amenity.findMany();
  const amenityMap = Object.fromEntries(amenities.map((a) => [a.name, a.id]));

  const getAmenityIds = (names) => names.map(name => ({ amenityId: amenityMap[name] })).filter(a => a.amenityId);

  const stays = [
    {
      name: "Luxury A-frame Glass House",
      slug: "luxury-aframe-glass-house",
      propertyType: "aframe",
      description: "Experience the unique A-frame architecture with floor-to-ceiling glass walls offering 360-degree valley views.",
      location: "Kodaikanal, Tamil Nadu",
      pricePerNight: 4500,
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.9,
      isFeatured: true,
      images: [
        { url: "/images/stays/aframestay/IMG-20260331-WA0013.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0014.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0015.jpg.jpeg" },
        { url: "/images/stays/aframestay/IMG-20260331-WA0016.jpg.jpeg" },
      ],
      amenityIds: ["Free Wi-Fi", "Mountain View", "Bonfire", "Breakfast Included"],
    },
    {
      name: "Traditional Hill Hut",
      slug: "traditional-hill-hut",
      propertyType: "hut",
      description: "A cozy and authentic hill hut experience, perfect for those seeking simplicity and connection with nature.",
      location: "Kodaikanal, Tamil Nadu",
      pricePerNight: 2500,
      capacity: 3,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.7,
      isFeatured: true,
      images: [
        { url: "/images/stays/hutstay/IMG-20260331-WA0025.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0027.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0028.jpg.jpeg" },
        { url: "/images/stays/hutstay/IMG-20260331-WA0029.jpg.jpeg" },
      ],
      amenityIds: ["Mountain View", "Bonfire", "Hiking Trails"],
    },
    {
      name: "Premium Valley View Tent",
      slug: "premium-valley-view-tent",
      propertyType: "tent",
      description: "High-end glamping experience with all modern comforts inside a secure, weather-proof tent setup.",
      location: "Kodaikanal, Tamil Nadu",
      pricePerNight: 3000,
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      isFeatured: true,
      images: [
        { url: "/images/stays/tentstay/IMG-20260331-WA0046.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0047.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0049.jpg.jpeg" },
        { url: "/images/stays/tentstay/IMG-20260331-WA0050.jpg.jpeg" },
      ],
      amenityIds: ["Mountain View", "Bonfire", "Breakfast Included", "Parking"],
    }
  ];

  for (const stay of stays) {
    const { amenityIds, images, ...data } = stay;
    await prisma.stay.upsert({
      where: { slug: data.slug },
      update: {
        ...data,
        images: {
          deleteMany: {},
          create: images
        },
        amenities: {
          deleteMany: {},
          create: getAmenityIds(amenityIds)
        }
      },
      create: {
        ...data,
        images: { create: images },
        amenities: {
          create: getAmenityIds(amenityIds)
        }
      }
    });
  }

  console.log("✅ Seeded 3 updated stays.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
