import FilterSidebar from "./FilterSidebar";

export default function MobileFilterDrawer({
  open,
  onClose,
  filters,
  onChange,
  onReset,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden" role="dialog" aria-modal="true" aria-label="Filters">
      <button
        type="button"
        onClick={onClose}
        className="absolute inset-0 bg-black/30"
        aria-label="Close filters panel"
      />
      <div className="absolute right-0 top-0 h-full w-[90%] max-w-sm overflow-y-auto bg-slate-50 p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-lg font-semibold">Filters</h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-slate-200 px-3 py-1 text-sm text-slate-700 transition hover:bg-slate-100"
          >
            Close
          </button>
        </div>
        <FilterSidebar filters={filters} onChange={onChange} onReset={onReset} />
      </div>
    </div>
  );
}
