import { RECENT_DAYS_LIMIT } from "../constants";

function monthsFromDuration(duration) {
  const match = duration?.match(/\d+/);
  return match ? Number(match[0]) : 0;
}

function stipendValue(stipend) {
  return Number(stipend?.salaryValue1 || stipend?.salaryValue2 || 0);
}

function toNumberOrNull(value) {
  if (value === null || value === undefined || value === "") return null;
  const parsed = Number(value);
  return Number.isFinite(parsed) ? parsed : null;
}

function normalizedText(value) {
  return String(value || "").trim();
}

function isRecent(postedOnDateTime) {
  if (!postedOnDateTime) return false;
  const postedDate = new Date(postedOnDateTime * 1000);
  const days = (Date.now() - postedDate.getTime()) / (1000 * 60 * 60 * 24);
  return days <= RECENT_DAYS_LIMIT;
}

export function normalizeInternships(payload) {
  const meta = payload?.internships_meta || {};
  return Object.values(meta).map((item) => ({
    id: item.id,
    title: item.title || "Untitled Internship",
    companyName: item.company_name || "Unknown Company",
    profile: item.profile_name || "",
    locations: item.location_names || [],
    durationLabel: item.duration || "Not specified",
    durationMonths: monthsFromDuration(item.duration),
    stipendLabel: item.stipend?.salary || "Not disclosed",
    stipendAmount: stipendValue(item.stipend),
    skills: item.skill_names || [],
    workFromHome: Boolean(item.work_from_home),
    activeHiring: Boolean(item.is_active),
    applicantCount: item.applicant_count ?? null,
    partTime: Boolean(item.part_time),
    recentlyPosted: isRecent(item.postedOnDateTime),
    postedLabel: item.posted_by_label || item.posted_on || "",
    deadline: item.application_deadline || "Not specified",
    slug: item.url || "",
  }));
}

function matchesText(value, query) {
  return normalizedText(value).toLowerCase().includes(normalizedText(query).toLowerCase());
}

export function normalizeFilters(filters) {
  return {
    profile: normalizedText(filters.profile),
    location: normalizedText(filters.location),
    minDuration: toNumberOrNull(filters.minDuration),
    minStipend: toNumberOrNull(filters.minStipend),
    skills: normalizedText(filters.skills),
    workFromHome: Boolean(filters.workFromHome),
    activeHiring: Boolean(filters.activeHiring),
    recentlyPosted: Boolean(filters.recentlyPosted),
  };
}

export function applyFiltersAndSorting(list, filters, search, sortBy) {
  const safeFilters = normalizeFilters(filters);
  const searchValue = normalizedText(search).toLowerCase();

  const filtered = list.filter((item) => {
    if (safeFilters.profile && !matchesText(item.profile, safeFilters.profile)) return false;

    if (
      safeFilters.location &&
      !item.locations.some((location) => matchesText(location, safeFilters.location))
    ) {
      return false;
    }

    if (safeFilters.minDuration !== null && item.durationMonths < safeFilters.minDuration) {
      return false;
    }

    if (safeFilters.minStipend !== null && item.stipendAmount < safeFilters.minStipend) {
      return false;
    }

    if (safeFilters.skills && !item.skills.some((skill) => matchesText(skill, safeFilters.skills))) {
      return false;
    }

    if (safeFilters.workFromHome && !item.workFromHome) return false;
    if (safeFilters.activeHiring && !item.activeHiring) return false;
    if (safeFilters.recentlyPosted && !item.recentlyPosted) return false;

    if (!searchValue) return true;

    const targets = [item.title, item.companyName, ...item.skills];
    return targets.some((text) => normalizedText(text).toLowerCase().includes(searchValue));
  });

  const sorted = [...filtered];
  if (sortBy === "latest") {
    sorted.sort((a, b) => (b.recentlyPosted === a.recentlyPosted ? 0 : b.recentlyPosted ? 1 : -1));
  } else if (sortBy === "stipend_desc") {
    sorted.sort((a, b) => b.stipendAmount - a.stipendAmount);
  }

  return sorted;
}
