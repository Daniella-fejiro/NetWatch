import express from "express";
import { getDeviceUptimeReport, getTimeline, getSystemAnalytics } from "../controllers/reportController.js";

const router = express.Router();

router.get("/device", getDeviceUptimeReport);
router.get("/timeline", getTimeline);
router.get("/system", getSystemAnalytics);

export default router;