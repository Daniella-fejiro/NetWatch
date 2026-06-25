import Device from "../models/Device.js";
import PingLog from "../models/PingLog.js";

const getLatestPingMap = async (deviceIds) => {
  const logs = await PingLog.find({
    deviceId: { $in: deviceIds }
  }).sort({ createdAt: -1 });

  const map = new Map();

  for (const log of logs) {
    if (!map.has(log.deviceId.toString())) {
      map.set(log.deviceId.toString(), log);
    }
  }

  return map;
};

export const getDashboardOverview = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });

    const deviceIds = devices.map((d) => d._id);
    const latestMap = await getLatestPingMap(deviceIds);

    let online = 0;
    let offline = 0;
    let unknown = 0;

    for (const device of devices) {
      const ping = latestMap.get(device._id.toString());
      const status = ping?.status || "unknown";

      if (status === "Online") online++;
      else if (status === "Offline") offline++;
      else unknown++;
    }

    res.json({
      total: devices.length,
      online,
      offline,
      unknown,
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardDevices = async (req, res) => {
  try {
    const devices = await Device.find({ user: req.user._id });

    const deviceIds = devices.map((d) => d._id);
    const latestMap = await getLatestPingMap(deviceIds);

    const result = devices.map((device) => {
      const ping = latestMap.get(device._id.toString());

      return {
        id: device._id,
        name: device.name,
        ipAddress: device.ipAddress,
        port: device.port,
        status: ping?.status || "unknown",
        latency: ping?.responseTime || null,
        lastChecked: ping?.createdAt || null,
      };
    });

    res.json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getDashboardEvents = async (req, res) => {
  try {
    const devices = await Device.find(
      { user: req.user._id },
      "_id"
    );

    const deviceIds = devices.map((d) => d._id);

    const logs = await PingLog.find({
      deviceId: { $in: deviceIds },
    })
      .sort({ createdAt: -1 })
      .limit(30)
      .populate("deviceId", "name ipAddress port");

    const events = logs.map((log) => ({
      device: log.deviceId?.name,
      ipAddress: log.deviceId?.ipAddress,
      port: log.deviceId?.port,
      status: log.status,
      latency: log.rsponseTime,
      timestamp: log.createdAt,
    }));

    res.json(events);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// import Device from "../models/Device.js";
// import PingLog from "../models/PingLog.js";

// const getLatestPingMap = async () => {
//   const logs = await PingLog.find({})
//     .sort({ createdAt: -1 });

//   const map = new Map();

//   for (const log of logs) {
//     if (!map.has(log.deviceId.toString())) {
//       map.set(log.deviceId.toString(), log);
//     }
//   }

//   return map;
// };

// export const getDashboard = async (req, res) => {
//   try {
//     const devices = await Device.find({});
//     const latestMap = await getLatestPingMap();

//     let online = 0;
//     let offline = 0;
//     let unknown = 0;

//     // OVERVIEW + DEVICE STATUS COUNT
//     for (const device of devices) {
//       const ping = latestMap.get(device._id.toString());
//       const status = ping?.status || "unknown";

//       if (status === "online") online++;
//       else if (status === "offline") offline++;
//       else unknown++;
//     }

//     // DEVICES LIST (for table/cards)
//     const deviceList = devices.map((device) => {
//       const ping = latestMap.get(device._id.toString());

//       return {
//         id: device._id,
//         name: device.name,
//         ipAddress: device.ipAddress,
//         port: device.port,
//         status: ping?.status || "unknown",
//         latency: ping?.latency || null,
//         lastChecked: ping?.createdAt || null,
//       };
//     });

//     // EVENTS (recent activity feed)
//     const logs = await PingLog.find({})
//       .sort({ createdAt: -1 })
//       .limit(30)
//       .populate("deviceId", "name ipAddress port");

//     const events = logs.map((log) => ({
//       id: log._id,
//       device: log.deviceId?.name,
//       ipAddress: log.deviceId?.ipAddress,
//       port: log.deviceId?.port,
//       status: log.status,
//       latency: log.latency,
//       timestamp: log.createdAt,
//     }));

//     // FINAL RESPONSE (FRONTEND READY)
//     res.json({
//       overview: {
//         totalDevices: devices.length,
//         online,
//         offline,
//         unknown,
//       },

//       devices: deviceList,

//       events,
//     });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };