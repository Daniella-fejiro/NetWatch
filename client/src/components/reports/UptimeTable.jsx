export default function UptimeTable({
  devices,
}) {
  return (
    <div className="bg-surface border border-white/5 rounded-xl overflow-hidden">
      <div className="p-5 border-b border-white/5">
        <h2 className="text-primaryText font-heading text-lg">
          Device Uptime Report
        </h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-white/5">
              <th className="text-left p-4 text-secondaryText">
                Device
              </th>

              <th className="text-left p-4 text-secondaryText">
                Type
              </th>

              <th className="text-left p-4 text-secondaryText">
                Uptime
              </th>

              <th className="text-left p-4 text-secondaryText">
                Downtime
              </th>

              <th className="text-left p-4 text-secondaryText">
                Incidents
              </th>
            </tr>
          </thead>

          <tbody>
            {devices.map((device) => (
              <tr
                key={device.id}
                className="border-b border-white/5"
              >
                <td className="p-4 text-primaryText">
                  {device.device}
                </td>

                <td className="p-4 text-secondaryText">
                  {device.type}
                </td>

                <td className="p-4 text-success">
                  {device.uptime}%
                </td>

                <td className="p-4 text-secondaryText">
                  {device.downtime}
                </td>

                <td className="p-4 text-danger">
                  {device.incidents}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}