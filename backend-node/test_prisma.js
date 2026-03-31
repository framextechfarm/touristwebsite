const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function test() {
  try {
    console.log("Testing Prisma findMany...");
    const stays = await prisma.stay.findMany({
      include: {
        images: true,
        amenities: { include: { amenity: true } },
      },
    });
    console.log("Found stays:", stays.length);
    const result = stays.map((s) => ({
      ...s,
      amenities: s.amenities.map((a) => a.amenity),
    }));
    console.log("Result mapping successful.");
  } catch (err) {
    console.error("Prisma Error:", err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
