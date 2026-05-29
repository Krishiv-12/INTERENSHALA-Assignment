import {
  FaBuilding,
  FaClock,
  FaIndianRupeeSign,
  FaLocationDot,
  FaHeart,
  FaUsers,
} from "react-icons/fa6";


const LOGO_COLORS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-orange-100 text-orange-700",
  "bg-pink-100 text-pink-700",
  "bg-teal-100 text-teal-700",
];

function getLogoColor(name = "") {
  const safeName = name || "?";
  const index = safeName.charCodeAt(0) % LOGO_COLORS.length;
  return LOGO_COLORS[index];
}


function MetaItem({ icon: Icon, text }) {
  if (!text) return null;
  return (
    <span className="flex items-center gap-1 text-xs text-gray-500">
      <Icon className="shrink-0" />
      {text}
    </span>
  );
}

function Badge({ label, variant = "default" }) {
  const styles = {
    default: "bg-gray-100 text-gray-600",
    blue: "bg-blue-50 text-blue-700",
    green: "bg-green-50 text-green-700",
    orange: "bg-orange-50 text-orange-700",
  };
  return (
    <span
      className={`inline-block rounded-md px-2 py-0.5 text-[11px] font-semibold ${styles[variant]}`}
    >
      {label}
    </span>
  );
}


export default function InternshipCard({ internship, onViewDetails }) {
  const logoColor = getLogoColor(internship.companyName);
  const initial = internship.companyName?.charAt(0)?.toUpperCase() ?? "?";

  return (
    <article className="group flex h-full flex-col rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:border-blue-200 hover:shadow-md">

      <div className="mb-3 flex items-start gap-3">

        <div
          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${logoColor}`}
          aria-hidden="true"
        >
          {initial}
        </div>

        <div className="min-w-0 flex-1">
          <h3 className="text-sm font-semibold text-gray-900">
            {internship.title}
          </h3>
          <p className="flex items-center gap-1 text-xs text-gray-500">
            <FaBuilding className="shrink-0" />
            {internship.companyName}
            {internship.applicantCount != null && (
              <span className="ml-1 flex items-center gap-0.5">
                · <FaUsers className="shrink-0" /> {internship.applicantCount} applicants
              </span>
            )}
          </p>
        </div>

        <button
          type="button"
          aria-label="Save internship"
          className="shrink-0 rounded-full p-1.5 text-gray-300 transition hover:bg-red-50 hover:text-red-400"
        >
          <FaHeart />
        </button>
      </div>

      <div className="mb-3 flex flex-wrap gap-1.5">
        {internship.workFromHome ? (
          <Badge label="Remote" variant="green" />
        ) : (
          <Badge label="In office" variant="default" />
        )}
        {internship.activelyHiring && (
          <Badge label="Actively hiring" variant="blue" />
        )}
        {internship.partTime && (
          <Badge label="Part-time" variant="orange" />
        )}
      </div>

      <div className="grid grid-cols-2 gap-x-3 gap-y-1.5">
        <MetaItem
          icon={FaLocationDot}
          text={internship.locations?.join(", ") || "Not specified"}
        />
        <MetaItem icon={FaClock} text={internship.durationLabel} />
        <MetaItem icon={FaIndianRupeeSign} text={internship.stipendLabel} />
        <span className="text-xs text-gray-400">
          {internship.postedLabel ?? "Recently posted"}
        </span>
      </div>

      {/* ── Footer: deadline + CTA ── */}
      <div className="mt-auto flex items-center justify-between border-t border-gray-50 pt-3">
        <p className="text-[11px] text-gray-400">
          Deadline:{" "}
          <span className="font-medium text-gray-500">{internship.deadline}</span>
        </p>
        <button
          type="button"
          onClick={() => onViewDetails?.(internship)}
          className="min-w-[108px] rounded-xl bg-gray-900 px-4 py-2 text-center text-xs font-semibold text-white transition hover:bg-blue-600 active:scale-95"
        >
          View details
        </button>
      </div>
    </article>
  );
}