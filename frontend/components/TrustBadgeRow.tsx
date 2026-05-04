import { site } from "@/lib/site";

export function TrustBadgeRow({ compact = false, className = "" }: { compact?: boolean; className?: string }) {
  return (
    <div className={`flex flex-wrap justify-center gap-3 ${compact ? "gap-2" : "gap-3 sm:gap-4"} ${className}`}>
      {site.trustBadges.map((badge) => (
        <div
          key={badge.label}
          className={`flex flex-col items-center rounded-xl border border-[#E5DDD2] bg-white px-3 py-2 text-center shadow-sm ${compact ? "px-2 py-1.5" : "px-3 py-2 sm:px-4 sm:py-2.5"}`}
        >
          <span className={`font-semibold text-[#123C2F] ${compact ? "text-xs" : "text-xs sm:text-sm"}`}>
            {badge.label}
          </span>
          <span className="mt-0.5 text-[10px] text-[#6B625C]">{badge.sub}</span>
        </div>
      ))}
    </div>
  );
}
