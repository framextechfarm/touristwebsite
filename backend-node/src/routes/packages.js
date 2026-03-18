const express = require("express");
const router = express.Router();
const prisma = require("../db");

// GET /packages?featured=true&skip=0&limit=100
router.get("/", async (req, res, next) => {
  try {
    const { featured, skip = 0, limit = 100 } = req.query;
    const where = featured === "true" ? { isFeatured: true } : {};

    const packages = await prisma.package.findMany({
      where,
      skip: Number(skip),
      take: Number(limit),
      include: {
        images: true,
        itinerary: { orderBy: { day: "asc" } },
      },
    });

    res.json(packages);
  } catch (err) {
    next(err);
  }
});

// GET /packages/:id
router.get("/:id", async (req, res, next) => {
  try {
    const pkg = await prisma.package.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        images: true,
        itinerary: { orderBy: { day: "asc" } },
      },
    });

    if (!pkg) return res.status(404).json({ detail: "Package not found" });
    res.json(pkg);
  } catch (err) {
    next(err);
  }
});

// POST /packages
router.post("/", async (req, res, next) => {
  try {
    const { title, slug, duration, description, price, location, isFeatured, rating, images = [], itinerary = [] } = req.body;

    const pkg = await prisma.package.create({
      data: {
        title,
        slug,
        duration,
        description,
        price,
        location,
        isFeatured: isFeatured ?? false,
        rating: rating ?? 0.0,
        images: {
          create: images.map((img) => ({ url: img.url })),
        },
        itinerary: {
          create: itinerary.map((item) => ({
            day: item.day,
            title: item.title,
            description: item.description,
          })),
        },
      },
      include: { images: true, itinerary: true },
    });

    res.status(201).json(pkg);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
