import { MdDevices, MdWifi, MdWifiOff, MdError } from "react-icons/md";
import StatsCard from "./StatsCard";

export default function StatsGrid({ data }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <StatsCard
        label="Total Devices"
        value={data.totalDevices}
        icon={MdDevices}
        color="accent"
      />

      <StatsCard
        label="Online"
        value={data.online}
        icon={MdWifi}
        color="success"
      />

      <StatsCard
        label="Offline"
        value={data.offline}
        icon={MdWifiOff}
        color="danger"
      />

      <StatsCard
        label="Active Incidents"
        value={data.incidents}
        icon={MdError}
        color="warning"
      />
    </div>
  );
}