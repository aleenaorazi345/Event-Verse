import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import helmet from "helmet";
import mongoSanitize from "@exortek/express-mongo-sanitize";

import { connectDB } from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import eventRoutes from "./routes/eventRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();
await connectDB();

const app = express();

// 🛡️ SECURITY MIDDLEWARE (must be before routes)
app.use(helmet());

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());

// 🛡️ Prevent NoSQL Injection (e.g. { "$gt": "" })
app.use(mongoSanitize());

// Note: xss-clean is deprecated and breaks on Express 5 (tries to write req.query).
// If you still need XSS protection, use a maintained alternative, e.g.:
//   import xss from "xss";
// and sanitize specific fields in validators instead of a global middleware.
// For now it is removed to keep Express 5 working.

if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

app.get("/api/health", (req, res) =>
  res.json({ status: "ok", message: "EventVerse API alive 🚀" })
);

app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/notifications", notificationRoutes);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);