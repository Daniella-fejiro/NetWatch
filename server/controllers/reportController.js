import { calculateUptime, getDeviceTimeline, getSystemReport } from "../services/reportService.js";

export const getDeviceUptimeReport = async (req, res) => {
  try {
    const { deviceId, range = 24 } = req.query;

    const data = await calculateUptime(deviceId, Number(range));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getTimeline = async (req, res) => {
  try {
    const { deviceId, range = 6 } = req.query;

    const data = await getDeviceTimeline(deviceId, Number(range));

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getSystemAnalytics = async (req, res) => {
  try {
    const range = Number(req.query.range || 24);

    const data = await getSystemReport(range);

    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};