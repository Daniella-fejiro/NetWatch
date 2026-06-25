import express from "express";
import { getDashboardOverview, getDashboardDevices, getDashboardEvents } from "../controllers/dashboardController.js";
import {  protect } from '../middlewares/userMiddleware.js'

const router = express.Router();

router.get("/overview",protect, getDashboardOverview);
router.get("/devices",protect, getDashboardDevices);
router.get("/events",protect, getDashboardEvents);

export default router;