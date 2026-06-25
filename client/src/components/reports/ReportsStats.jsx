import {
  MdTrendingUp,
  MdDevices,
  MdWarning,
  MdTimer,
} from "react-icons/md";

export default function ReportsStats({
  analytics,
}) {
  const cards = [
    {
      title: "Average Uptime",
      value: `${analytics.averageUptime}%`,
      icon: MdTrendingUp,
      color: "text-success",
    },

    {
      title: "Devices",
      value: analytics.totalDevices,
      icon: MdDevices,
      color: "text-accent",
    },

    {
      title: "Incidents",
      value: analytics.totalIncidents,
      icon: MdWarning,
      color: "text-danger",
    },

    {
      title: "MTTR",
      value: analytics.mttr,
      icon: MdTimer,
      color: "text-warning",
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => (
        <div
          key={card.title}
          className="bg-surface border border-white/5 rounded-xl p-5"
        >
          <div className="flex justify-between">
            <div>
              <p className="text-secondaryText text-sm">
                {card.title}
              </p>

              <h3 className="text-primaryText text-3xl font-bold mt-2">
                {card.value}
              </h3>
            </div>

            <card.icon
              className={`text-3xl ${card.color}`}
            />
          </div>
        </div>
      ))}
    </div>
  );
}