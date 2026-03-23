const express = require("express");
const router = express.Router();
const prisma = require("../db");

// GET /reviews - Fetch all active reviews
router.get("/", async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      where: { isActive: true },
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// GET /admin/reviews - Fetch all reviews (including inactive)
router.get("/admin", async (req, res, next) => {
  try {
    const reviews = await prisma.review.findMany({
      orderBy: { createdAt: "desc" },
    });
    res.json(reviews);
  } catch (err) {
    next(err);
  }
});

// POST /admin/reviews - Create a new review
router.post("/admin", async (req, res, next) => {
  try {
    const { userName, userRole, rating, comment, userImage } = req.body;
    
    if (!userName || !comment) {
      return res.status(400).json({ detail: "userName and comment are required" });
    }

    const review = await prisma.review.create({
      data: {
        userName,
        userRole,
        rating: rating || 5,
        comment,
        userImage,
      },
    });
    res.json(review);
  } catch (err) {
    next(err);
  }
});

// DELETE /admin/reviews/:id - Delete a review
router.delete("/admin/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    await prisma.review.delete({
      where: { id: parseInt(id) },
    });
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    next(err);
  }
});

// PATCH /admin/reviews/:id/toggle - Toggle active status
router.patch("/admin/:id/toggle", async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await prisma.review.findUnique({ where: { id: parseInt(id) } });
    
    if (!review) return res.status(404).json({ detail: "Review not found" });

    const updated = await prisma.review.update({
      where: { id: parseInt(id) },
      data: { isActive: !review.isActive },
    });
    res.json(updated);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
