const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const prisma = require("../db");

// ─── Multer config ────────────────────────────────────────────────────────────

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "..", "..", "static", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  },
});

const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
  fileFilter: (req, file, cb) => {
    const allowed = /jpeg|jpg|png|gif|webp/;
    const ok = allowed.test(path.extname(file.originalname).toLowerCase()) &&
               allowed.test(file.mimetype);
    ok ? cb(null, true) : cb(new Error("Only image files are allowed"));
  },
});

// ─── Default seed slots ───────────────────────────────────────────────────────

const DEFAULT_SLOTS = [
  { slotKey: "explore_kodai_1", title: "Neelakurinji Bloom", description: "The 12-Year Miracle...", imageUrl: "/assets/destination_1.png", category: "homepage" },
  { slotKey: "explore_kodai_2", title: "The Star-Shaped Lake", description: "Created in 1863...", imageUrl: "/assets/hero.png", category: "homepage" },
  { slotKey: "explore_kodai_3", title: "Solar Observatory", description: "Established 1899...", imageUrl: "/assets/destination_2.png", category: "homepage" },
  { slotKey: "explore_kodai_4", title: "7,200 ft", description: "Elevation Above Sea Level", imageUrl: null, category: "homepage" },
];

// ─── Routes ───────────────────────────────────────────────────────────────────

// GET /admin/image-slots
router.get("/image-slots", async (req, res, next) => {
  try {
    let slots = await prisma.imageSlot.findMany();

    // Seed defaults if empty
    if (slots.length === 0) {
      await prisma.imageSlot.createMany({ data: DEFAULT_SLOTS });
      slots = await prisma.imageSlot.findMany();
    }

    res.json(slots);
  } catch (err) {
    next(err);
  }
});

// POST /admin/image-slots/upload  (multipart/form-data)
router.post("/image-slots/upload", upload.single("file"), async (req, res, next) => {
  try {
    const { slot_key, title, description } = req.body;

    if (!slot_key) return res.status(400).json({ detail: "slot_key is required" });

    let slot = await prisma.imageSlot.findUnique({ where: { slotKey: slot_key } });

    const data = {};
    if (title !== undefined) data.title = title;
    if (description !== undefined) data.description = description;
    if (req.file) data.imageUrl = `/uploads/${req.file.filename}`;

    if (slot) {
      slot = await prisma.imageSlot.update({ where: { slotKey: slot_key }, data });
    } else {
      slot = await prisma.imageSlot.create({ data: { slotKey: slot_key, ...data } });
    }

    res.json(slot);
  } catch (err) {
    next(err);
  }
});

// POST /admin/image-slots/update  (JSON)
router.post("/image-slots/update", async (req, res, next) => {
  try {
    const { slotKey, title, description, category, imageUrl } = req.body;

    if (!slotKey) return res.status(400).json({ detail: "slotKey is required" });

    const data = { title, description, category };
    if (imageUrl) data.imageUrl = imageUrl;

    const slot = await prisma.imageSlot.upsert({
      where: { slotKey },
      update: data,
      create: { slotKey, ...data },
    });

    res.json(slot);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
