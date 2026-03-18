const express = require("express");
const router = express.Router();
const prisma = require("../db");

// GET /cabs/routes
router.get("/routes", async (req, res, next) => {
  try {
    const routes = await prisma.cabRoute.findMany({
      where: { isActive: true },
      include: { pricing: { include: { vehicle: true } } },
    });
    res.json(routes);
  } catch (err) {
    next(err);
  }
});

// GET /cabs/vehicles
router.get("/vehicles", async (req, res, next) => {
  try {
    const vehicles = await prisma.vehicle.findMany({
      where: { isActive: true },
    });
    res.json(vehicles);
  } catch (err) {
    next(err);
  }
});

// POST /cabs/search  { from_location, to_location }
router.post("/search", async (req, res, next) => {
  try {
    const { from_location, to_location } = req.body;

    const route = await prisma.cabRoute.findFirst({
      where: {
        fromLocation: { contains: from_location, mode: "insensitive" },
        toLocation: { contains: to_location, mode: "insensitive" },
        isActive: true,
      },
    });

    if (!route) {
      return res.status(404).json({ detail: "No route found between these locations" });
    }

    const pricingList = await prisma.cabPricing.findMany({
      where: { routeId: route.id },
      include: { vehicle: true },
    });

    const results = pricingList
      .filter((p) => p.vehicle.isActive)
      .map((p) => ({
        route,
        vehicle: p.vehicle,
        price: p.price,
      }));

    res.json(results);
  } catch (err) {
    next(err);
  }
});

// POST /cabs/routes
router.post("/routes", async (req, res, next) => {
  try {
    const { fromLocation, toLocation, distanceKm, durationHours, isActive = true } = req.body;

    const route = await prisma.cabRoute.create({
      data: { fromLocation, toLocation, distanceKm, durationHours, isActive },
    });
    res.status(201).json(route);
  } catch (err) {
    next(err);
  }
});

// POST /cabs/vehicles
router.post("/vehicles", async (req, res, next) => {
  try {
    const { name, capacity, luggageCapacity, features, isActive = true } = req.body;

    const vehicle = await prisma.vehicle.create({
      data: { name, capacity, luggageCapacity, features, isActive },
    });
    res.status(201).json(vehicle);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
