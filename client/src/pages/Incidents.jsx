import { useEffect, useMemo, useState } from "react";

import { socket } from "../utils/socket";
import IncidentStats from "../components/incidents/IncidentStats";
import IncidentFilters from "../components/incidents/IncidentFilters";
import IncidentList from "../components/incidents/IncidentList";
import IncidentDetailsModal from "../components/incidents/IncidentDetailsModal";

export default function Incidents() {
  const API_URL = "http://localhost:5000/api/incident";

  const [incidents, setIncidents] = useState([]);
  const [selectedIncident, setSelectedIncident] =
    useState(null);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("all");

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const getAuthHeaders = () => {
    const token = localStorage.getItem("token");

    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  const formatIncident = (incident) => ({
    ...incident,

    title:
      incident.type === "offline"
        ? `${incident.device?.name || "Device"} Offline`
        : incident.type === "high_latency"
        ? `${incident.device?.name || "Device"} High Latency`
        : incident.type === "packet_loss"
        ? `${incident.device?.name || "Device"} Packet Loss`
        : "Network Incident",

    description:
      incident.message ||
      "Network monitoring incident detected.",

    device:
      incident.device?.name || "Unknown Device",

    source: "NetWatch Monitor",

    impactedServices: [],

    createdAt: incident.firstOccurredAt,

    timeline: [
      {
        title: "Incident Created",
        time: incident.firstOccurredAt,
      },

      ...(incident.status === "ongoing"
        ? [
            {
              title: "Incident Reoccurred",
              time: incident.lastOccurredAt,
            },
          ]
        : []),

      ...(incident.acknowledgedAt
        ? [
            {
              title: "Acknowledged",
              time: incident.acknowledgedAt,
            },
          ]
        : []),

      ...(incident.resolvedAt
        ? [
            {
              title: "Resolved",
              time: incident.resolvedAt,
            },
          ]
        : []),
    ],
  });

  const fetchIncidents = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(API_URL, {
        headers: getAuthHeaders(),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(
          result.message || "Failed to fetch incidents"
        );
      }

      const formattedIncidents = (
        result.data || []
      ).map(formatIncident);

      setIncidents(formattedIncidents);
    } catch (err) {
      console.error("Incident fetch error:", err);
      setError(
        err.message || "Failed to load incidents"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchIncidents();
  }, []);

  useEffect(() => {
  const handleNewIncident = (incident) => {
    console.log("NEW INCIDENT:", incident);

    const formattedIncident =
      formatIncident(incident);

    setIncidents((prev) => [
      formattedIncident,
      ...prev,
    ]);
  };

  const handleUpdatedIncident = (
    updatedIncident
  ) => {
    console.log(
      "UPDATED INCIDENT:",
      updatedIncident
    );

    const formattedIncident =
      formatIncident(updatedIncident);

    setIncidents((prev) =>
      prev.map((incident) =>
        incident._id === updatedIncident._id
          ? formattedIncident
          : incident
      )
    );
  };

  const handleResolvedIncident = (
    resolvedIncident
  ) => {
    console.log(
      "RESOLVED INCIDENT:",
      resolvedIncident
    );

    const formattedIncident =
      formatIncident(resolvedIncident);

    setIncidents((prev) =>
      prev.map((incident) =>
        incident._id === resolvedIncident._id
          ? formattedIncident
          : incident
      )
    );

    setSelectedIncident((current) =>
      current?._id === resolvedIncident._id
        ? formattedIncident
        : current
    );
  };

  socket.on(
    "incident:new",
    handleNewIncident
  );

  socket.on(
    "incident:update",
    handleUpdatedIncident
  );

  socket.on(
    "incident:resolved",
    handleResolvedIncident
  );

  return () => {
    socket.off(
      "incident:new",
      handleNewIncident
    );

    socket.off(
      "incident:update",
      handleUpdatedIncident
    );

    socket.off(
      "incident:resolved",
      handleResolvedIncident
    );
  };
}, []);

  const filteredIncidents = useMemo(() => {
    return incidents.filter((incident) => {
      const matchesSearch =
        incident.title
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        incident.device
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||
        incident.description
          ?.toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =
        status === "all"
          ? true
          : incident.status === status;

      return matchesSearch && matchesStatus;
    });
  }, [incidents, search, status]);

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center w-full gap-4">
        <div className="p-6 border border-24 rounded-full border-accent border-t-transparent animate-spin"></div>
        <p className="text-3xl text-accent font-heading">Loading Incidents...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 text-red-500 text-3xl font-heading">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-primaryText font-heading text-3xl">
          Incidents
        </h1>

        <p className="text-secondaryText mt-2">
          Monitor, acknowledge and resolve
          network incidents across the
          infrastructure.
        </p>
      </div>

      <IncidentStats incidents={incidents} />

      <IncidentFilters
        search={search}
        setSearch={setSearch}
        status={status}
        setStatus={setStatus}
      />

      <IncidentList
        incidents={filteredIncidents}
        onSelect={setSelectedIncident}
      />

      <IncidentDetailsModal
        open={!!selectedIncident}
        incident={selectedIncident}
        onClose={() =>
          setSelectedIncident(null)
        }
      />
    </div>
  );
}