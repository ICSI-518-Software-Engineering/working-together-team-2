import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { initializeDatabase } from "./lib/db.js";
import { initializeRoutes } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());

dotenv.config();

const PORT = process.env.PORT ?? 8086;

/**
 * Intialising routes
 */
initializeRoutes(app);

/**
 * Intialising Database
 */
initializeDatabase();

/**
 * Listening to server
 */
app.listen(PORT, () => console.log("Listening on port", PORT));
