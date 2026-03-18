const express = require("express");
const router = express.Router();
const { v4: uuidv4 } = require("uuid");
const prisma = require("../db");

// ─── Helpers ──────────────────────────────────────────────────────────────────

function generateBookingReference() {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");
  const numbers = Math.floor(100 + Math.random() * 900).toString();
  return `BK-${letters}${numbers}`;
}

async function getUniqueRef() {
  let ref;
  do {
    ref = generateBookingReference();
  } while (await prisma.booking.findUnique({ where: { bookingReference: ref } }));
  return ref;
}

// ─── Routes ───────────────────────────────────────────────────────────────────

// POST /bookings
router.post("/", async (req, res, next) => {
  try {
    const {
      bookingType, itemId, vehicleId,
      customerName, customerEmail, customerPhone,
      travelDate, endDate, totalAmount, specialRequests,
    } = req.body;

    if (!["package", "stay", "cab"].includes(bookingType)) {
      return res.status(400).json({ detail: "Invalid booking type" });
    }

    // Verify the referenced item exists
    if (bookingType === "package") {
      const item = await prisma.package.findUnique({ where: { id: Number(itemId) } });
      if (!item) return res.status(404).json({ detail: "Package not found" });
    } else if (bookingType === "stay") {
      const item = await prisma.stay.findUnique({ where: { id: Number(itemId) } });
      if (!item) return res.status(404).json({ detail: "Stay not found" });
    } else if (bookingType === "cab") {
      const route = await prisma.cabRoute.findUnique({ where: { id: Number(itemId) } });
      if (!route) return res.status(404).json({ detail: "Cab route not found" });
      if (vehicleId) {
        const vehicle = await prisma.vehicle.findUnique({ where: { id: Number(vehicleId) } });
        if (!vehicle) return res.status(404).json({ detail: "Vehicle not found" });
      }
    }

    const bookingReference = await getUniqueRef();
    const bookingDate = new Date().toISOString();

    const booking = await prisma.booking.create({
      data: {
        bookingReference,
        bookingType,
        itemId: Number(itemId),
        vehicleId: vehicleId ? Number(vehicleId) : null,
        customerName,
        customerEmail,
        customerPhone,
        bookingDate,
        travelDate,
        endDate: endDate ?? null,
        totalAmount: Number(totalAmount),
        specialRequests: specialRequests ?? null,
        bookingStatus: "pending",
        paymentStatus: "pending",
      },
    });

    res.status(201).json(booking);
  } catch (err) {
    next(err);
  }
});

// GET /bookings
router.get("/", async (req, res, next) => {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { id: "desc" },
    });
    res.json(bookings);
  } catch (err) {
    next(err);
  }
});

// GET /bookings/:id
router.get("/:id", async (req, res, next) => {
  try {
    const booking = await prisma.booking.findUnique({
      where: { id: Number(req.params.id) },
    });
    if (!booking) return res.status(404).json({ detail: "Booking not found" });
    res.json(booking);
  } catch (err) {
    next(err);
  }
});

// PATCH /bookings/:id/status
router.patch("/:id/status", async (req, res, next) => {
  try {
    const { bookingStatus, paymentStatus } = req.body;

    const existing = await prisma.booking.findUnique({ where: { id: Number(req.params.id) } });
    if (!existing) return res.status(404).json({ detail: "Booking not found" });

    const updated = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: {
        ...(bookingStatus && { bookingStatus }),
        ...(paymentStatus && { paymentStatus }),
      },
    });

    res.json(updated);
  } catch (err) {
    next(err);
  }
});

// POST /bookings/:id/confirm  (mock payment)
router.post("/:id/confirm", async (req, res, next) => {
  try {
    const existing = await prisma.booking.findUnique({ where: { id: Number(req.params.id) } });
    if (!existing) return res.status(404).json({ detail: "Booking not found" });

    const confirmed = await prisma.booking.update({
      where: { id: Number(req.params.id) },
      data: { bookingStatus: "confirmed", paymentStatus: "completed" },
    });

    res.json(confirmed);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
