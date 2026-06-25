import { MdSearch } from "react-icons/md";

export default function IncidentFilters({
  search,
  setSearch,
  status,
  setStatus,
}) {
  return (
    <div className="flex flex-col lg:flex-row gap-3 mb-6">
      <div className="flex-1 relative">
        <MdSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-secondaryText text-xl" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search incidents..."
          className="w-full bg-surface border border-white/10 rounded-lg pl-10 pr-4 py-3 text-primaryText outline-none"
        />
      </div>

      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="bg-surface border border-white/10 rounded-lg px-4 py-3 text-primaryText"
      >
        <option value="all">All Status</option>
        <option value="open">Open</option>
        <option value="acknowledged">Acknowledged</option>
        <option value="resolved">Resolved</option>
      </select>
    </div>
  );
}