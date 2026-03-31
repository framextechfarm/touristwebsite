const express = require("express");
const router = express.Router();
const prisma = require("../db");

// GET /stays?location=...&property_type=...&min_price=...&max_price=...&min_capacity=...
router.get("/", async (req, res, next) => {
  try {
    const { location, property_type, min_price, max_price, min_capacity } = req.query;

    const where = { AND: [] };

    if (location) {
      where.AND.push({ location: { contains: location, mode: "insensitive" } });
    }
    if (property_type) {
      where.AND.push({ propertyType: property_type });
    }
    if (min_price !== undefined) {
      where.AND.push({ pricePerNight: { gte: Number(min_price) } });
    }
    if (max_price !== undefined) {
      where.AND.push({ pricePerNight: { lte: Number(max_price) } });
    }
    if (min_capacity !== undefined) {
      where.AND.push({ capacity: { gte: Number(min_capacity) } });
    }

    const stays = await prisma.stay.findMany({
      where: where.AND.length ? where : undefined,
      include: {
        images: true,
        amenities: { include: { amenity: true } },
      },
    });

    // Flatten amenities for response parity with Python
    const result = stays.map((s) => ({
      ...s,
      amenities: s.amenities.map((a) => a.amenity),
    }));

    res.json(result);
  } catch (err) {
    console.error("GET /stays Error:", err);
    next(err);
  }
});

// GET /stays/:id
router.get("/:id", async (req, res, next) => {
  try {
    const stay = await prisma.stay.findUnique({
      where: { id: Number(req.params.id) },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
      },
    });

    if (!stay) return res.status(404).json({ detail: "Stay not found" });

    res.json({
      ...stay,
      amenities: stay.amenities.map((a) => a.amenity),
    });
  } catch (err) {
    next(err);
  }
});

// POST /stays
router.post("/", async (req, res, next) => {
  try {
    const {
      name, slug, propertyType, description, location,
      pricePerNight, capacity, bedrooms, bathrooms,
      rating, isFeatured, images = [], amenityIds = [],
    } = req.body;

    const stay = await prisma.stay.create({
      data: {
        name, slug, propertyType, description, location,
        pricePerNight, capacity,
        bedrooms: bedrooms ?? 1,
        bathrooms: bathrooms ?? 1,
        rating: rating ?? 0.0,
        isFeatured: isFeatured ?? false,
        images: { create: images.map((img) => ({ url: img.url })) },
        amenities: {
          create: amenityIds.map((id) => ({ amenityId: id })),
        },
      },
      include: {
        images: true,
        amenities: { include: { amenity: true } },
      },
    });

    res.status(201).json({
      ...stay,
      amenities: stay.amenities.map((a) => a.amenity),
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
