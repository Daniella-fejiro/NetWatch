import { useEffect, useMemo, useState, useRef } from "react";
import { socket } from "../utils/socket.js";

import StatsGrid from "../components/dashboard/StatsGrid";
import UptimeChart from "../components/dashboard/UptimeChart";
import DeviceDistribution from "../components/dashboard/DeviceDistribution";
import RecentIncidents from "../components/dashboard/RecentIncidents";
import RecentEvents from "../components/dashboard/RecentEvents";

import {
  getDashboardOverview,
  getDashboardDevices,
  getDashboardEvents,
} from "../services/dashboardServices";

import {
  showSuccess,
  showWarning,
  showInfo,
} from "../utils/toast";

export default function Dashboard() {
  const [overview, setOverview] = useState(null);
  const [devices, setDevices] = useState([]);
  const [events, setEvents] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const didInit = useRef(false);
  const toastCache = useRef(new Set());

  const safeToast = (id, fn) => {
    if (toastCache.current.has(id)) return;

    toastCache.current.add(id);
    fn();

    setTimeout(() => {
      toastCache.current.delete(id);
    }, 4000);
  };

  useEffect(() => {
    // if (didInit.current) return;
    // didInit.current = true;

    const handleDeviceChange = (payload) => {
      console.log("FRONTEND RECEIVED:", payload);
      const {
        deviceId,
        name,
        oldStatus,
        newStatus,
        responseTime,
      } = payload;

      if (oldStatus === "Online" && newStatus === "Offline") {
        safeToast(`device-${deviceId}-offline`, () =>
          showWarning(`${name} is offline`)
        );
      }

      if (oldStatus === "Offline" && newStatus === "Online") {
        safeToast(`device-${deviceId}-online`, () =>
          showSuccess(`${name} is back online`)
        );
       

      }

      setDevices((prev) =>
        prev.map((device) =>
          device.id === deviceId
            ? { ...device, status: newStatus, latency: responseTime }
            : device
        )
      );

      setEvents((prev) => [
        {
          device: name,
          status: newStatus,
          latency: responseTime,
          timestamp: new Date(),
        },
        ...prev,
      ]);

      setOverview((prev) => {
        if (!prev) return prev;

        let online = prev.online;
        let offline = prev.offline;

        if (oldStatus === "Online" && newStatus === "Offline") {
          online--;
          offline++;
        }

        if (oldStatus === "Offline" && newStatus === "Online") {
          offline--;
          online++;
        }

        return { ...prev, online, offline };
      });
    };

    socket.on("device-status-changed", handleDeviceChange);

    socket.on("incident:new", (incident) => {
        console.log('showing here')
      safeToast(
        `incident-new-${incident._id || Date.now()}`,
        () => showWarning(incident.message || "New incident detected")
      );
    });

    socket.on("incident:update", (incident) => {
        console.log('showing here')
      safeToast(
        `incident-update-${incident._id || Date.now()}`,
        () => showInfo(incident.message || "Incident updated")
      );
    });

    socket.on("incident:resolved", (incident) => {
      safeToast(
        `incident-resolved-${incident._id || Date.now()}`,
        () => showSuccess(incident.message || "Incident resolved")
      );
    });

    return () => {
      socket.off("device-status-changed", handleDeviceChange);
      socket.off("incident:new");
      socket.off("incident:update");
      socket.off("incident:resolved");
    };
  }, []);

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        setLoading(true);
        setError("");

        const [overviewData, deviceData, eventData] =
          await Promise.all([
            getDashboardOverview(),
            getDashboardDevices(),
            getDashboardEvents(),
          ]);

        setOverview(overviewData);
        setDevices(deviceData);
        setEvents(eventData);
      } catch (err) {
        console.error("Dashboard fetch error:", err);
        setError(err.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, []);

  const overviewStats = useMemo(() => {
    if (!overview) return null;

    return {
      totalDevices: overview.total,
      online: overview.online,
      offline: overview.offline,
      maintenance: overview.unknown || 0,
      incidents: events.filter(
        (event) => event.status === "Offline"
      ).length,
    };
  }, [overview, events]);

  const deviceDistribution = useMemo(() => {
    if (!overview) return null;

    return {
      online: overview.online,
      offline: overview.offline,
      maintenance: overview.unknown || 0,
    };
  }, [overview]);

  const recentIncidents = useMemo(() => {
    return events
      // .filter((event) => event.status === "Offline")
      .slice(0, 5)
      .map((event, index) => ({
        id: index + 1,
        title: `${event.device} is ${event.status}`,
        severity: event.status === "Offline" ? "Critical" : "Healthy",
        status: "open",
        time: event.timestamp,
        device: event.device,
        ipAddress: event.ipAddress,
      }));
  }, [events]);

  const recentEvents = useMemo(() => {
    return events.slice(0, 5);
  }, [events]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center w-full gap-4">
        <div className="p-6 border border-24 rounded-full border-accent border-t-transparent animate-spin"></div>
        <p className="text-3xl text-accent font-heading">Loading dashboard...</p>
      </div>
    );
  }

  if (error || !overviewStats) {
    return (
      <div className="p-6 text-red-500 text-4xl font-heading flex items-center justify-center w-full gap-4">
        {error || "Failed to load dashboard."}
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6 bg-background min-h-screen">
      
      <StatsGrid data={overviewStats} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DeviceDistribution device={deviceDistribution} />

        <RecentIncidents incidents={recentIncidents} />
      </div>

      <RecentEvents events={recentEvents} />
    </div>
  );
}