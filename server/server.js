import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import http from "http";

import connectDB from "./db.js";

import userRoutes from "./routes/userRoutes.js";
import deviceRoutes from "./routes/deviceRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";
import incidentRoutes from "./routes/incidentRoutes.js"
import dashboardRoutes from "./routes/dashboardRoutes.js"
import reportRoutes from "./routes/reportRoutes.js"

import { startMonitoring } from "./services/cronService.js";
import { initSocket } from "./io.js";

dotenv.config();

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
app.use(cookieParser());

app.use("/api/auth", userRoutes);
app.use("/api/device", deviceRoutes);
app.use("/api/notification", notificationRoutes);
app.use("/api/incident", incidentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/report", reportRoutes)

app.get("/", (req, res) => {
  res.send("NetWatch API Running");
});

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});

const server = http.createServer(app);

const io = initSocket(server);

startMonitoring(io);

const PORT = process.env.PORT || 5000;

server.listen(PORT, () => {
  console.log(`Server running on ${PORT}`);
});