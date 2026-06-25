import { MdSearch, MdAdd } from "react-icons/md";

export default function DevicesHeader({
  search,
  setSearch,
  statusFilter,
  setStatusFilter,
  typeFilter,
  setTypeFilter,
  onAdd,
}) {
  return (
    <div className="flex flex-col gap-4 mb-6">
      <div className="flex flex-col lg:flex-row gap-3">
        <div className="relative flex-1">
          <MdSearch
            className="absolute left-4 top-1/2 -translate-y-1/2 text-secondaryText"
            size={20}
          />

          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search devices..."
            className="w-full bg-surface border border-white/10 rounded-xl pl-12 pr-4 py-3 text-primaryText outline-none focus:border-accent"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-primaryText"
        >
          <option value="All">All Status</option>
          <option value="Online">Online</option>
          <option value="Offline">Offline</option>
          <option value="Unknown">Unknown</option>
        </select>

        <select
          value={typeFilter}
          onChange={(e) => setTypeFilter(e.target.value)}
          className="bg-surface border border-white/10 rounded-xl px-4 py-3 text-primaryText"
        >
          <option value="All">All Types</option>
          <option value="Router">Router</option>
          <option value="Switch">Switch</option>
          <option value="Server">Server</option>
          <option value="Firewall">Firewall</option>
          <option value="PC">PC</option>
          <option value="Other">Other</option>
        </select>

        <button
          onClick={onAdd}
          className="bg-accent text-background font-semibold px-5 py-3 rounded-xl flex items-center justify-center gap-2 hover:scale-105 transition"
        >
          <MdAdd size={20} />
          Add Device
        </button>
      </div>
    </div>
  );
}