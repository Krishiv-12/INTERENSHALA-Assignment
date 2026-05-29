import { FaMagnifyingGlass } from "react-icons/fa6";

export default function EmptyState({ onClear }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white px-8 py-16 text-center">

      <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-gray-100">
        <FaMagnifyingGlass className="text-xl text-gray-400" />
      </div>

      <h3 className="text-base font-semibold text-gray-900">No internships found</h3>
      <p className="mt-1.5 max-w-xs text-sm text-gray-500">
        Try adjusting your filters or search term — there are plenty of opportunities waiting.
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-6 rounded-xl bg-gray-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 active:scale-95"
      >
        Clear all filters
      </button>
    </div>
  );
}