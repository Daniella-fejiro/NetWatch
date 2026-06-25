export const dashboardMock = {
  overviewStats: {
    totalDevices: 128,
    online: 110,
    offline: 12,
    maintenance: 6,
    activeIncidents: 3,
  },

  systemHealth: {
    status: "healthy",
    uptime: 99.98,
    latency: 32,
  },

  uptimeTrends: {
  "24h": [
    { time: "00:00", uptime: 99.9 },
    { time: "04:00", uptime: 99.7 },
    { time: "08:00", uptime: 99.85 },
    { time: "12:00", uptime: 99.92 },
    { time: "16:00", uptime: 99.88 },
    { time: "20:00", uptime: 99.98 },
  ],

  "7d": [
    { time: "Mon", uptime: 99.8 },
    { time: "Tue", uptime: 99.7 },
    { time: "Wed", uptime: 99.9 },
    { time: "Thu", uptime: 99.6 },
    { time: "Fri", uptime: 99.95 },
    { time: "Sat", uptime: 99.92 },
    { time: "Sun", uptime: 99.98 },
  ],
},

  deviceDistribution: {
    online: 110,
    offline: 12,
    maintenance: 6,
  },

  incidents: [
    {
      id: "INC-1001",
      title: "Core router packet loss detected",
      severity: "critical",
      status: "open",
      time: "2 mins ago",
    },
    {
      id: "INC-1002",
      title: "Switch latency spike",
      severity: "warning",
      status: "investigating",
      time: "18 mins ago",
    },
  ],

  activityFeed: [
  {
    id: 1,
    type: "device",
    message: "NY-Router-01 came online",
    time: "5 mins ago",
  },
  {
    id: 2,
    type: "incident",
    message: "Packet loss detected on Core Router",
    time: "2 mins ago",
  },
  {
    id: 3,
    type: "recovery",
    message: "WAN link restored successfully",
    time: "14 mins ago",
  },
  {
    id: 4,
    type: "maintenance",
    message: "Scheduled switch firmware upgrade started",
    time: "28 mins ago",
  },
]
};