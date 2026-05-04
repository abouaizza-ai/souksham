import { site } from "@/lib/site";

export function TrustBadgeRow() {
  return (
    <ul className="grid grid-cols-2 gap-3 sm:grid-cols-4">
      {site.trustBadges.map((b) => (
        <li
          key={b.label}
          className="rounded-xl border border-stone-200 bg-white px-3 py-3 text-center shadow-sm"
        >
          <p className="text-sm font-semibold text-stone-900">{b.label}</p>
          <p className="mt-0.5 text-xs text-stone-500">{b.sub}</p>
        </li>
      ))}
    </ul>
  );
}
