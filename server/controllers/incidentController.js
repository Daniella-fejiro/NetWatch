import Incident from "../models/Incident.js";

export const getIncidents = async (req, res) => {
  try {
    const { status, severity, deviceId, page = 1, limit = 20 } = req.query;

    const query = {};

    if (status) query.status = status;
    if (severity) query.severity = severity;
    if (deviceId) query.device = deviceId;

    const incidents = await Incident.find(query)
      .populate("device")
      .sort({ updatedAt: -1 })
      .skip((page - 1) * limit)
      .limit(Number(limit));

    const total = await Incident.countDocuments(query);

    res.json({
      success: true,
      data: incidents,
      pagination: {
        total,
        page: Number(page),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getIncidentById = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id).populate("device");

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const acknowledgeIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    incident.status = "acknowledged";
    incident.acknowledgedAt = new Date();

    await incident.save();

    res.json({
      success: true,
      message: "Incident acknowledged",
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const resolveIncident = async (req, res) => {
  try {
    const incident = await Incident.findById(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    incident.status = "resolved";
    incident.resolvedAt = new Date();
    incident.isActive = false;

    await incident.save();

    res.json({
      success: true,
      message: "Incident resolved",
      data: incident,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const deleteIncident = async (req, res) => {
  try {
    const incident = await Incident.findByIdAndDelete(req.params.id);

    if (!incident) {
      return res.status(404).json({
        success: false,
        message: "Incident not found",
      });
    }

    res.json({
      success: true,
      message: "Incident deleted",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};