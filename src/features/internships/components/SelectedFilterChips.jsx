import { FaXmark } from "react-icons/fa6";
import { FILTER_LABELS } from "../constants";

function formatChipValue(key, value) {
  if (typeof value === "boolean") return "";
  if (value === null || value === "") return "";
  if (key === "minStipend") return `₹${Number(value).toLocaleString()}+`;
  if (key === "minDuration") return `${value} month${Number(value) > 1 ? "s" : ""}+`;
  return value;
}

export default function SelectedFilterChips({ filters, onClearSingle, onClearAll }) {

  const activeChips = Object.entries(filters).filter(([, value]) =>
    typeof value === "boolean" ? value : value !== "" && value !== null
  );

  if (activeChips.length === 0) return null;

  return (
    <div className="flex flex-wrap items-center gap-2 py-1">
      {activeChips.map(([key, value]) => {
        const formattedValue = formatChipValue(key, value);
        return (
          <button
            key={key}
            type="button"
            onClick={() => onClearSingle(key)}
            className="group inline-flex items-center gap-1.5 rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-xs font-medium text-blue-700 transition hover:border-blue-300 hover:bg-blue-100"
          >
            <span>
              {FILTER_LABELS[key]}
              {formattedValue && `: ${formattedValue}`}
            </span>
            <FaXmark className="text-blue-400 transition group-hover:text-blue-600" />
          </button>
        );
      })}

      {/* Clear all — only shows when 2+ chips are active */}
      {activeChips.length >= 2 && (
        <button
          type="button"
          onClick={onClearAll}
          className="text-xs font-semibold text-gray-400 underline-offset-2 hover:text-gray-600 hover:underline"
        >
          Clear all
        </button>
      )}
    </div>
  );
}