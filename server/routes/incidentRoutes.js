import express from "express";
import { protect } from "../middlewares/userMiddleware.js";
import { getIncidents, getIncidentById, acknowledgeIncident, resolveIncident, deleteIncident, } from "../controllers/incidentController.js";

const router = express.Router();

router.get("/", protect, getIncidents);
router.get("/:id",protect,  getIncidentById);

router.patch("/:id/acknowledge",protect, acknowledgeIncident);
router.patch("/:id/resolve", protect, resolveIncident);

router.delete("/:id",protect, deleteIncident);

export default router;