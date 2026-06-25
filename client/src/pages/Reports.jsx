import { useEffect, useState } from "react";

import ReportsStats from "../components/reports/ReportsStats";
import IncidentDistributionChart from "../components/reports/IncidentDistributionChart";
import NetworkHealthChart from "../components/reports/NetworkHealthChart";
import TopDevicesChart from "../components/reports/TopDevicesChart";
import UptimeTable from "../components/reports/UptimeTable";

export default function Reports() {
  const [reportData, setReportData] = useState({
    analytics: {
      averageUptime: 0,
      totalDevices: 0,
      totalIncidents: 0,
      mttr: "N/A",
    },
    timeline: [],
    incidentDistribution: [],
    deviceReports: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const  res  = await fetch(
        "http://localhost:5000/api/report/system",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      console.log(data)

      if (!res.ok) {
        throw new Error(result.message || "Failed to fetch devices");
      }

      setReportData(data);
    } catch (error) {
      console.error("Failed to fetch reports:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex flex-col items-center justify-center w-full gap-4">
        <div className="p-6 border border-24 rounded-full border-accent border-t-transparent animate-spin"></div>
        <p className="text-3xl text-accent font-heading">Loading Reports...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ReportsStats analytics={reportData.analytics} />

      <NetworkHealthChart
        data={reportData.timeline}
      />

      <div className="grid xl:grid-cols-2 gap-6">
        <IncidentDistributionChart
          data={reportData.incidentDistribution}
        />

        <TopDevicesChart
          devices={reportData.deviceReports}
        />
      </div>

      <UptimeTable
        devices={reportData.deviceReports}
      />
    </div>
  );
}