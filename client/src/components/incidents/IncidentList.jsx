import IncidentCard from "./IncidentCard";

export default function IncidentList({
  incidents,
  onSelect,
}) {
  return (
    <div className="space-y-4">
      {incidents.map((incident) => (
        <IncidentCard
          key={incident._id}
          incident={incident}
          onClick={onSelect}
        />
      ))}
    </div>
  );
}