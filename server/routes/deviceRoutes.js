import express from "express";
import { protect } from "../middlewares/userMiddleware.js";

import { createDevice, getDevices, getDevice, updateDevice, deleteDevice} from "../controllers/deviceController.js";

const router = express.Router();

router.use(protect);

router.route("/")
  .post(createDevice)
  .get(getDevices);

router.route("/:id")
  .get(getDevice)
  .put(updateDevice)
  .delete(deleteDevice);

export default router;