import {
  MdWarning,
  MdDone,
  MdVisibility,
} from "react-icons/md";

export default function IncidentTimeline({
  incident,
}) {
  const events = [
    {
      icon: MdWarning,
      title: "Incident Detected",
      time: incident.createdAt,
    },
    {
      icon: MdVisibility,
      title: "Acknowledged",
      time: incident.acknowledgedAt,
    },
    {
      icon: MdDone,
      title: "Resolved",
      time: incident.resolvedAt,
    },
  ].filter((e) => e.time);

  return (
    <div className="relative ml-2">
      <div className="absolute left-4 top-0 bottom-0 w-px bg-white/10" />

      <div className="space-y-8">
        {events.map((event) => (
          <div
            key={event.title}
            className="relative flex gap-4"
          >
            <div className="h-8 w-8 rounded-full bg-accent flex items-center justify-center z-10">
              <event.icon className="text-background" />
            </div>

            <div>
              <p className="text-primaryText font-medium">
                {event.title}
              </p>

              <p className="text-secondaryText text-sm">
                {event.time}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}