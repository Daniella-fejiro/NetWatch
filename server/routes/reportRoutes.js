import express from "express";
import { getDeviceUptimeReport, getTimeline, getSystemAnalytics } from "../controllers/reportController.js";
import { protect } from "../middlewares/userMiddleware.js";

const router = express.Router();

router.get("/device", getDeviceUptimeReport);
router.get("/timeline", getTimeline);
router.get("/system",protect, getSystemAnalytics);

export default router;