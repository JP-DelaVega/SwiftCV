import dotenv from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import userDetailsRoutes from "./routes/userDetails.route.js";
import userRoutes from "./routes/user.route.js";
import chatRoute from "./ChatGpt/ChatGptApi.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config();

// Express app setup
const app = express();
const port = process.env.PORT || 5000;

// CORS setup (adjust origin in production)
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "production"
        ? "swiftcv-hnezbdhvcwg2h6gu.southeastasia-01.azurewebsites.net" // <-- Replace with your deployed frontend URL
        : "http://localhost:5173",
    credentials: true,
  })
);

// Body parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());


// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "..", "frontend", "dist")));

  app.get("*", (req, res) =>
    res.sendFile(path.join(__dirname, "..", "frontend", "dist", "index.html"))
  );
}

// API routes
app.use("/api/userDetails", userDetailsRoutes);
app.use("/api/users", userRoutes);
app.use("/api/chat", chatRoute);

// Start server and connect to DB
app.listen(port, () => {
  connectDB();
  console.log(`Server running on port ${port}`);
});
