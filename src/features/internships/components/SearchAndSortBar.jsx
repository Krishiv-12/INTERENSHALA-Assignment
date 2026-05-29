import { FaArrowDownWideShort, FaMagnifyingGlass } from "react-icons/fa6";
import { SORT_OPTIONS } from "../constants";

export default function SearchAndSortBar({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  count,
  onOpenFilters,
}) {
  return (
    <section className="space-y-3 rounded-2xl p-4 shadow-sm">
      <div className="flex flex-col gap-3 md:flex-row">
        <div className="relative flex-1">
          <FaMagnifyingGlass className="absolute left-3 top-3 text-slate-400" />
          <input
            value={search}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search by title, company..."
            className="w-full rounded-full border border-slate-200 py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className="rounded-lg border border-slate-200 px-4 py-2 text-sm font-medium text-slate-200 transition hover:bg-slate-50 md:hidden"
          >
            Filters
          </button>

          <div className="relative min-w-[190px]">
            <FaArrowDownWideShort className="absolute left-3 top-3 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => onSortChange(e.target.value)}
              className="w-full appearance-none rounded-lg border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            >
              {SORT_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <p className="text-sm text-slate-200 md:pl-10">{count} internships found</p>
    </section>
  );
}
