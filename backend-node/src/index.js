require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const fs = require("fs");

const packagesRouter = require("./routes/packages");
const staysRouter = require("./routes/stays");
const cabsRouter = require("./routes/cabs");
const bookingsRouter = require("./routes/bookings");
const adminRouter = require("./routes/admin");

const app = express();
const PORT = process.env.PORT || 8000;

// ─── Ensure uploads directory exists ─────────────────────────────────────────
const uploadsDir = path.join(__dirname, "..", "static", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

// ─── Middleware ───────────────────────────────────────────────────────────────
const allowedOrigins = (process.env.CORS_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((o) => o.trim().replace(/\/$/, "")); // Remove trailing slashes

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps or curl)
      if (!origin) return callback(null, true);
      
      const cleanOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes("*") || allowedOrigins.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ─── Static file serving ─────────────────────────────────────────────────────
app.use("/uploads", express.static(path.join(__dirname, "..", "static", "uploads")));

// ─── Routes ──────────────────────────────────────────────────────────────────
app.use("/packages", packagesRouter);
app.use("/stays", staysRouter);
app.use("/cabs", cabsRouter);
app.use("/bookings", bookingsRouter);
app.use("/admin", adminRouter);

// ─── Root & Health ───────────────────────────────────────────────────────────
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the Hill Station Platform API" });
});

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// ─── Global error handler ────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    detail: err.message || "Internal server error",
  });
});

// ─── Start ───────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀  HillTrek API running at http://localhost:${PORT}`);
  console.log(`📦  Environment: ${process.env.NODE_ENV || "development"}\n`);
});
