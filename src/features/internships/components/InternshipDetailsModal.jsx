import { useEffect } from "react";
import {
  FaClock,
  FaIndianRupeeSign,
  FaLocationDot,
  FaXmark,
  FaBuilding,
  FaCalendarDays,
} from "react-icons/fa6";

// ── Sub-components ────────────────────────────────────────────────────────────

function DetailRow({ icon: Icon, label, text }) {
  if (!text) return null;
  return (
    <div className="flex items-start gap-3 rounded-xl bg-gray-50 px-4 py-3">
      <Icon className="mt-0.5 shrink-0 text-gray-400" />
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">{label}</p>
        <p className="mt-0.5 text-sm font-medium text-gray-800">{text}</p>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function InternshipDetailsModal({ internship, onClose }) {
  // Lock body scroll ONLY when a card is open (internship is truthy)
  useEffect(() => {
    if (!internship) return; // no modal open — do nothing

    document.body.style.overflow = "hidden";

    // Cleanup: restore scroll when modal closes or component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [internship]); // re-runs whenever internship changes (open ↔ closed)

  // Close on Escape key — only active when modal is open
  useEffect(() => {
    if (!internship) return;

    const handleKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [internship, onClose]);

  // Render nothing when no internship is selected
  if (!internship) return null;

  const detailsUrl = internship.slug
    ? `https://internshala.com/internship/detail/${internship.slug}`
    : "https://internshala.com";

  return (
    // Backdrop — fixed, full-screen, flex-centered
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop overlay — click to close */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal panel */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
        className="relative z-10 w-full max-w-lg overflow-hidden rounded-2xl bg-white shadow-2xl"
      >
        {/* ── Header ── */}
        <div className="flex items-start justify-between gap-3 p-6 pb-4">
          <div className="min-w-0 flex-1">
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-widest text-blue-500">
              Internship details
            </p>
            <h3
              id="modal-title"
              className="text-xl leading-snug text-gray-900"
              style={{ fontFamily: "'Instrument Serif', Georgia, serif", fontWeight: 400 }}
            >
              {internship.title}
            </h3>
            <p className="mt-1 flex items-center gap-1.5 text-sm text-gray-500">
              <FaBuilding className="shrink-0" />
              {internship.companyName}
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="shrink-0 rounded-xl border border-gray-200 p-2 text-gray-400 transition hover:border-gray-300 hover:bg-gray-50 hover:text-gray-600"
          >
            <FaXmark />
          </button>
        </div>

        {/* ── Body ── */}
        <div className="space-y-5 overflow-y-auto px-6 pb-6" style={{ maxHeight: "60vh" }}>
          {/* Detail grid */}
          <div className="grid grid-cols-2 gap-2">
            <DetailRow
              icon={FaLocationDot}
              label="Location"
              text={internship.locations?.join(", ") || "Not specified"}
            />
            <DetailRow
              icon={FaClock}
              label="Duration"
              text={internship.durationLabel}
            />
            <DetailRow
              icon={FaIndianRupeeSign}
              label="Stipend"
              text={internship.stipendLabel}
            />
            <DetailRow
              icon={FaCalendarDays}
              label="Deadline"
              text={internship.deadline}
            />
          </div>

          {/* Badges */}
          <div className="flex flex-wrap gap-2">
            {internship.workFromHome && (
              <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                Remote
              </span>
            )}
            {internship.activelyHiring && (
              <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                Actively hiring
              </span>
            )}
            {internship.partTime && (
              <span className="rounded-full bg-orange-50 px-3 py-1 text-xs font-semibold text-orange-700">
                Part-time
              </span>
            )}
          </div>

          {/* Skills */}
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">
              Skills required
            </p>
            {internship.skills?.length ? (
              <div className="flex flex-wrap gap-2">
                {internship.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-lg bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400">Not specified</p>
            )}
          </div>

          {/* Posted label */}
          {internship.postedLabel && (
            <p className="text-xs text-gray-400">
              Posted: <span className="text-gray-600">{internship.postedLabel}</span>
            </p>
          )}
        </div>

        {/* ── Footer CTA ── */}
        <div className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-600 transition hover:bg-gray-50"
          >
            Close
          </button>
          <a
            href={detailsUrl}
            target="_blank"
            rel="noreferrer"
            className="rounded-xl bg-gray-900 px-5 py-2 text-xs font-semibold text-white transition hover:bg-blue-600 active:scale-95"
          >
            Open on Internshala ↗
          </a>
        </div>
      </div>
    </div>
  );
}