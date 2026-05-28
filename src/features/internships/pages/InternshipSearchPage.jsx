import { useMemo, useState } from "react";
import { applyFiltersAndSorting, normalizeFilters } from "../utils/internshipHelpers";
import { DEFAULT_FILTERS } from "../constants";
import { useDebounce } from "../hooks/useDebounce";
import { useInternships } from "../hooks/useInternships";
import FilterSidebar from "../components/FilterSidebar";
import SearchAndSortBar from "../components/SearchAndSortBar";
import SelectedFilterChips from "../components/SelectedFilterChips";
import InternshipCard from "../components/InternshipCard";
import LoadingSkeletons from "../components/LoadingSkeletons";
import EmptyState from "../components/EmptyState";
import MobileFilterDrawer from "../components/MobileFilterDrawer";
import InternshipDetailsModal from "../components/InternshipDetailsModal";

export default function InternshipSearchPage() {
  const [filters, setFilters] = useState(DEFAULT_FILTERS);
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [selectedInternship, setSelectedInternship] = useState(null);

  const { internships, loading, error, retry } = useInternships();
  const debouncedSearch = useDebounce(search, 350);

  const normalizedFilters = useMemo(() => normalizeFilters(filters), [filters]);
  const visibleInternships = useMemo(
    () => applyFiltersAndSorting(internships, normalizedFilters, debouncedSearch, sortBy),
    [internships, normalizedFilters, debouncedSearch, sortBy]
  );

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearAllFilters = () => setFilters(DEFAULT_FILTERS);

  const clearSingleFilter = (key) => {
    const value = filters[key];
    if (typeof value === "boolean") {
      updateFilter(key, false);
      return;
    }

    if (typeof value === "number" || value === null) {
      updateFilter(key, null);
      return;
    }

    updateFilter(key, "");
  };

  return (
    <div className="min-h-screen bg-gray-50" style={{ fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Hero banner ── */}
      <div
        className="relative bg-cover bg-center bg-no-repeat px-4 py-14 md:px-8 md:py-16"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1714976326855-f0f1fc403c9d?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/55" />

        <div className="relative mx-auto max-w-7xl">
          {/* Eyebrow label */}
          <p
            className="mb-3 inline-block rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-widest text-white/70 backdrop-blur-sm"
            style={{ fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.12em" }}
          >
            Internship portal
          </p>

          {/* Main headline — Instrument Serif for editorial flair */}
          <h1
            className="text-4xl text-white md:text-5xl lg:text-6xl"
            style={{
              fontFamily: "'Instrument Serif', Georgia, serif",
              fontWeight: 400,
              lineHeight: 1.12,
              letterSpacing: "-0.01em",
            }}
          >
            Find Your Dream{" "}
            <span
              className="italic text-white/80"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif" }}
            >
              Internship
            </span>{" "}
            Here ✦
          </h1>

          {/* Subheading — DM Sans, lighter weight */}
          <p
            className="mt-3 max-w-xl text-sm text-white/60 md:text-base"
            style={{ fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }}
          >
            Explore thousands of internships with smart filters, real-time search,
            and intelligent sorting — all in one place.
          </p>

          {/* Search bar */}
          <div className="mt-8">
            <SearchAndSortBar
              search={search}
              onSearchChange={setSearch}
              sortBy={sortBy}
              onSortChange={setSortBy}
              count={visibleInternships.length}
              onOpenFilters={() => setMobileFiltersOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main className="mx-auto max-w-7xl px-4 py-6 md:px-8">
        <SelectedFilterChips
          filters={filters}
          onClearSingle={clearSingleFilter}
          onClearAll={clearAllFilters}
        />

        <section className="mt-4 grid gap-6 md:grid-cols-[260px,1fr]">
          {/* Sidebar — desktop only */}
          <div className="hidden md:block">
            <FilterSidebar
              filters={filters}
              onChange={updateFilter}
              onReset={clearAllFilters}
            />
          </div>

          {/* Results column */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              {/* Section label also uses Instrument Serif for consistency */}
              <h2
                className="text-xl text-gray-900"
                style={{
                  fontFamily: "'Instrument Serif', Georgia, serif",
                  fontWeight: 400,
                }}
              >
                Recommended internships
              </h2>
              {!loading && !error && (
                <span className="rounded-full border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-500">
                  {visibleInternships.length} found
                </span>
              )}
            </div>

            {loading && <LoadingSkeletons />}

            {!loading && error && (
              <div className="flex items-center justify-between gap-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                <span>{error}</span>
                <button
                  type="button"
                  onClick={retry}
                  className="rounded-lg border border-red-200 bg-white px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
                >
                  Retry
                </button>
              </div>
            )}

            {!loading && !error && visibleInternships.length === 0 && (
              <EmptyState onClear={clearAllFilters} />
            )}

            {!loading && !error && visibleInternships.length > 0 && (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {visibleInternships.map((internship) => (
                  <InternshipCard
                    key={internship.id}
                    internship={internship}
                    onViewDetails={setSelectedInternship}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>

      <MobileFilterDrawer
        open={mobileFiltersOpen}
        onClose={() => setMobileFiltersOpen(false)}
        filters={filters}
        onChange={updateFilter}
        onReset={clearAllFilters}
      />

      <InternshipDetailsModal
        internship={selectedInternship}
        onClose={() => setSelectedInternship(null)}
      />
    </div>
  );
}