const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  console.log("Cleaning up existing stays...");
  
  // Clear all existing stays
  await prisma.stayAmenity.deleteMany({});
  await prisma.stayImage.deleteMany({});
  await prisma.stay.deleteMany({});

  const staysData = [
    {
      name: "Kodaikanal A-frame Stay",
      slug: "kodaikanal-aframe-stay",
      propertyType: "aframe",
      description: "A premium A-frame stay nestled in the hills of Kodaikanal. Experience the unique architecture and stunning views from this cozy mountain retreat.",
      location: "Kodaikanal Hills",
      pricePerNight: 0,
      capacity: 4,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.9,
      isFeatured: true,
      folder: "aframestay",
      images: [
        "IMG-20260331-WA0013.jpg.jpeg", "IMG-20260331-WA0014.jpg.jpeg", "IMG-20260331-WA0015.jpg.jpeg",
        "IMG-20260331-WA0016.jpg.jpeg", "IMG-20260331-WA0018.jpg.jpeg", "IMG-20260331-WA0019.jpg.jpeg",
        "IMG-20260331-WA0020.jpg.jpeg", "IMG-20260331-WA0034.jpg.jpeg", "IMG-20260331-WA0063.jpg.jpeg",
        "IMG-20260331-WA0065.jpg.jpeg", "IMG-20260331-WA0066.jpg.jpeg"
      ]
    },
    {
      name: "Kodaikanal Hut Stay",
      slug: "kodaikanal-hut-stay",
      propertyType: "hut",
      description: "Traditional mountain hut offering an authentic Kodaikanal experience. Perfect for those seeking tranquility and a connection with nature.",
      location: "Kodaikanal Valley View",
      pricePerNight: 0,
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.7,
      isFeatured: true,
      folder: "hutstay",
      images: [
        "IMG-20260331-WA0025.jpg.jpeg", "IMG-20260331-WA0027.jpg.jpeg", "IMG-20260331-WA0028.jpg.jpeg",
        "IMG-20260331-WA0029.jpg.jpeg", "IMG-20260331-WA0030.jpg.jpeg", "IMG-20260331-WA0032.jpg.jpeg",
        "IMG-20260331-WA0035.jpg.jpeg", "IMG-20260331-WA0038.jpg.jpeg", "IMG-20260331-WA0039.jpg.jpeg",
        "IMG-20260331-WA0040.jpg.jpeg", "IMG-20260331-WA0041.jpg.jpeg", "IMG-20260331-WA0064.jpg.jpeg",
        "IMG-20260331-WA0074.jpg.jpeg"
      ]
    },
    {
      name: "Kodaikanal Tent Stay",
      slug: "kodaikanal-tent-stay",
      propertyType: "tent",
      description: "Premium safari tent stay with all the comforts. Enjoy stargazing and the fresh mountain air in this luxury camping experience.",
      location: "kodaikanal outskirts",
      pricePerNight: 0,
      capacity: 2,
      bedrooms: 1,
      bathrooms: 1,
      rating: 4.8,
      isFeatured: true,
      folder: "tentstay",
      images: [
        "IMG-20260331-WA0046.jpg.jpeg", "IMG-20260331-WA0047.jpg.jpeg", "IMG-20260331-WA0049.jpg.jpeg",
        "IMG-20260331-WA0050.jpg.jpeg", "IMG-20260331-WA0051.jpg.jpeg", "IMG-20260331-WA0054.jpg.jpeg",
        "IMG-20260331-WA0056.jpg.jpeg", "IMG-20260331-WA0058.jpg.jpeg", "IMG-20260331-WA0059.jpg.jpeg",
        "IMG-20260331-WA0060.jpg.jpeg", "IMG-20260331-WA0067.jpg.jpeg", "IMG-20260331-WA0068.jpg.jpeg",
        "IMG-20260331-WA0071.jpg.jpeg", "IMG-20260331-WA0072.jpg.jpeg", "IMG-20260331-WA0073.jpg.jpeg"
      ]
    },
    {
      name: "Kodaikanal Homestay",
      slug: "kodaikanal-homestay",
      propertyType: "homestay",
      description: "Experience authentic local hospitality in our beautiful homestay. Enjoy home-cooked meals and a warm, welcoming environment.",
      location: "Kodaikanal Town",
      pricePerNight: 0,
      capacity: 4,
      bedrooms: 2,
      bathrooms: 2,
      rating: 4.9,
      isFeatured: true,
      folder: "homestay",
      images: [
        "IMG-20251120-WA0000.jpg.jpeg", "IMG-20251120-WA0001.jpg.jpeg", "IMG-20251120-WA0002.jpg.jpeg",
        "IMG-20251120-WA0003.jpg.jpeg", "IMG-20251120-WA0004.jpg.jpeg", "IMG-20251120-WA0005.jpg.jpeg",
        "IMG-20251120-WA0006.jpg.jpeg", "IMG-20251120-WA0007.jpg.jpeg", "IMG-20251120-WA0008.jpg.jpeg",
        "IMG-20251120-WA0009.jpg.jpeg", "IMG-20251120-WA0010.jpg.jpeg", "IMG-20251229-WA0000.jpg.jpeg",
        "IMG-20251229-WA0001.jpg.jpeg", "IMG-20251229-WA0003.jpg.jpeg", "IMG-20251229-WA0004.jpg.jpeg",
        "IMG-20251229-WA0005.jpg.jpeg", "IMG-20260309-WA0015.jpg.jpeg", "IMG-20260309-WA0017.jpg.jpeg",
        "IMG-20260309-WA0019.jpg.jpeg", "IMG-20260309-WA0020.jpg.jpeg", "IMG-20260309-WA0021.jpg.jpeg",
        "IMG-20260309-WA0022.jpg.jpeg", "IMG-20260309-WA0023.jpg.jpeg", "IMG-20260309-WA0025.jpg.jpeg",
        "IMG-20260309-WA0027.jpg.jpeg", "IMG-20260309-WA0028.jpg.jpeg", "IMG-20260327-WA0007.jpg.jpeg",
        "IMG-20260327-WA0009.jpg.jpeg", "IMG-20260327-WA0010.jpg.jpeg", "IMG-20260327-WA0014.jpg.jpeg",
        "IMG-20260327-WA0016.jpg.jpeg", "IMG-20260327-WA0017.jpg.jpeg", "IMG-20260327-WA0020.jpg.jpeg",
        "IMG-20260327-WA0031.jpg.jpeg", "IMG-20260327-WA0032.jpg.jpeg", "IMG-20260327-WA0039.jpg.jpeg",
        "IMG-20260327-WA0041.jpg.jpeg", "IMG-20260327-WA0045.jpg.jpeg", "IMG-20260327-WA0046.jpg.jpeg",
        "IMG-20260327-WA0047.jpg.jpeg", "IMG-20260327-WA0051.jpg.jpeg"
      ]
    }
  ];

  for (const data of staysData) {
    const stay = await prisma.stay.create({
      data: {
        name: data.name,
        slug: data.slug,
        propertyType: data.propertyType,
        description: data.description,
        location: data.location,
        pricePerNight: data.pricePerNight,
        capacity: data.capacity,
        bedrooms: data.bedrooms,
        bathrooms: data.bathrooms,
        rating: data.rating,
        isFeatured: data.isFeatured,
        images: {
          create: data.images.map((img) => ({
            url: `/images/stays/${data.folder}/${img}`
          }))
        }
      }
    });
    console.log(`Created stay: ${stay.name} with ${data.images.length} images.`);
  }

  console.log("Seeding complete!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
