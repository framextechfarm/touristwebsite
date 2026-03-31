const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function check() {
  const stays = await prisma.stay.findMany({
    include: { images: true, amenities: true }
  });
  console.log(JSON.stringify(stays, null, 2));
  await prisma.$disconnect();
}

check();
