import express from "express";
import { getDashboardOverview, getDashboardDevices, getDashboardEvents } from "../controllers/dashboardController.js";

const router = express.Router();

router.get("/overview", getDashboardOverview);
router.get("/devices", getDashboardDevices);
router.get("/events", getDashboardEvents);

export default router;