const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  await prisma.review.createMany({
    data: [
      {
        userName: "Alice Johnson",
        userRole: "Solo Explorer",
        rating: 5,
        comment: "Kodaikanal was a dream! The trekking packages were so well-organized. Highly recommend the sunrise hike.",
      },
      {
        userName: "Mark Thompson",
        userRole: "Verified Traveler",
        rating: 4,
        comment: "The stay was excellent. The cottage had a breathtaking view of the valley. Great service from the HillTrek team.",
      },
      {
        userName: "Sarah Williams",
        userRole: "Nature Lover",
        rating: 5,
        comment: "I've been on many mountain trips, but this was special. The attention to detail in the itinerary was impressive.",
      },
    ],
  });
  console.log("Seeded 3 reviews.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());
