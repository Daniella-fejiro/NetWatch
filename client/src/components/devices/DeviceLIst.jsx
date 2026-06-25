import DeviceCard from "./DeviceCard";

export default function DeviceList({
  devices,
  onView,
  onEdit,
  onDelete,
}) {
  if (!devices.length) {
    return (
      <div className="bg-surface rounded-2xl p-10 text-center border border-white/10">
        <p className="text-secondaryText">
          No devices found.
        </p>
      </div>
    );
  }

  return (
    <div className="grid gap-4">
      {devices.map((device) => (
        <DeviceCard
          key={device._id}
          device={device}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}