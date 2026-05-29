export const DEFAULT_FILTERS = {
  profile: "",
  location: "",
  minDuration: null,
  minStipend: null,
  workFromHome: false,
  activeHiring: false,
  recentlyPosted: false,
};

export const SORT_OPTIONS = [
  { label: "Relevance", value: "relevance" },
  { label: "Latest", value: "latest" },
  { label: "Stipend (High to Low)", value: "stipend_desc" },
];

export const RECENT_DAYS_LIMIT = 2;

export const STIPEND_FILTER_CONFIG = {
  min: 0,
  max: 50000,
  step: 1000,
};

export const DURATION_FILTER_CONFIG = {
  min: 1,
  max: 24,
};

export const FILTER_LABELS = {
  profile: "Profile",
  location: "Location",
  minDuration: "Min duration",
  minStipend: "Min stipend",
  workFromHome: "Work from home",
  activeHiring: "Actively hiring",
  recentlyPosted: "Recently posted",
};
