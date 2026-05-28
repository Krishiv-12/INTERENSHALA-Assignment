import { FaToggleOff, FaToggleOn } from "react-icons/fa6";
import { DURATION_FILTER_CONFIG, STIPEND_FILTER_CONFIG } from "../constants";

// ── Sub-components ────────────────────────────────────────────────────────────

/** Renders a labeled form field with consistent spacing */
function FilterField({ label, children }) {
  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </label>
      {children}
    </div>
  );
}

/** Shared text/number input style */
function FilterInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 transition focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-blue-100"
    />
  );
}

/** iOS-style toggle row */
function ToggleRow({ label, checked, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex w-full items-center justify-between gap-3 rounded-lg px-1 py-1.5 text-left transition hover:bg-gray-50"
    >
      <span className="text-sm text-gray-700">{label}</span>
      {checked ? (
        <FaToggleOn className="shrink-0 text-2xl text-blue-600" />
      ) : (
        <FaToggleOff className="shrink-0 text-2xl text-gray-300" />
      )}
    </button>
  );
}

/** Thin section divider */
function Divider() {
  return <hr className="border-gray-100" />;
}

// ── Main component ────────────────────────────────────────────────────────────

export default function FilterSidebar({ filters, onChange, onReset }) {
  const stipendMinValue = filters.minStipend ?? STIPEND_FILTER_CONFIG.min;
  const durationValue = filters.minDuration ?? "";

  const handleTextFilter = (key) => (event) => onChange(key, event.target.value);
  const handleNullableNumber = (key) => (event) => {
    const rawValue = event.target.value;
    onChange(key, rawValue === "" ? null : Number(rawValue));
  };

  return (
    <aside className="sticky top-6 space-y-5 rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-base font-semibold text-gray-900">Filters</h2>
        <button
          type="button"
          onClick={onReset}
          className="text-xs font-semibold text-blue-600 hover:text-blue-700"
        >
          Clear all
        </button>
      </div>

      <Divider />

      {/* Job type / profile */}
      <FilterField label="Internship profile">
        <FilterInput
          value={filters.profile}
          onChange={handleTextFilter("profile")}
          placeholder="e.g. Software developer"
        />
      </FilterField>

      {/* Location */}
      <FilterField label="Location">
        <FilterInput
          value={filters.location}
          onChange={handleTextFilter("location")}
          placeholder="City or Work from home"
        />
      </FilterField>

      <Divider />

      {/* Salary range */}
      <FilterField label="Minimum stipend (₹/month)">
        <div className="space-y-2">
          <input
            type="range"
            min={STIPEND_FILTER_CONFIG.min}
            max={STIPEND_FILTER_CONFIG.max}
            step={STIPEND_FILTER_CONFIG.step}
            value={stipendMinValue}
            onChange={(event) => {
              const value = Number(event.target.value);
              onChange("minStipend", value === STIPEND_FILTER_CONFIG.min ? null : value);
            }}
            className="h-2 w-full cursor-pointer appearance-none rounded-lg bg-gray-200 accent-blue-600"
          />
          <div className="flex items-center justify-between text-xs font-medium text-gray-500">
            <span>Any</span>
            <span>
              {filters.minStipend === null
                ? "No minimum selected"
                : `₹${filters.minStipend.toLocaleString()}+`}
            </span>
            <span>₹{STIPEND_FILTER_CONFIG.max.toLocaleString()}</span>
          </div>
        </div>
      </FilterField>

      {/* Duration */}
      <FilterField label="Minimum duration (months)">
        <FilterInput
          type="number"
          min={DURATION_FILTER_CONFIG.min}
          max={DURATION_FILTER_CONFIG.max}
          value={durationValue}
          onChange={handleNullableNumber("minDuration")}
          placeholder="e.g. 2"
        />
      </FilterField>

      <Divider />

      {/* Skills */}
      <FilterField label="Skills">
        <FilterInput
          value={filters.skills}
          onChange={handleTextFilter("skills")}
          placeholder="e.g. React, Python, Figma"
        />
      </FilterField>

      <Divider />

      {/* Boolean toggles */}
      <div className="space-y-0.5">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Preferences
        </p>
        <ToggleRow
          label="Work from home"
          checked={filters.workFromHome}
          onClick={() => onChange("workFromHome", !filters.workFromHome)}
        />
        <ToggleRow
          label="Actively hiring"
          checked={filters.activeHiring}
          onClick={() => onChange("activeHiring", !filters.activeHiring)}
        />
        <ToggleRow
          label="Recently posted"
          checked={filters.recentlyPosted}
          onClick={() => onChange("recentlyPosted", !filters.recentlyPosted)}
        />
      </div>
    </aside>
  );
}