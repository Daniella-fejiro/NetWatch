import express from "express";

import { getIncidents, getIncidentById, acknowledgeIncident, resolveIncident, deleteIncident, } from "../controllers/incidentController.js";

const router = express.Router();

router.get("/", getIncidents);
router.get("/:id", getIncidentById);

router.patch("/:id/acknowledge", acknowledgeIncident);
router.patch("/:id/resolve", resolveIncident);

router.delete("/:id", deleteIncident);

export default router;