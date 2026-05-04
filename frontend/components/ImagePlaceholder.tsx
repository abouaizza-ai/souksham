type Tone = "green" | "sand" | "gold" | "muted";

const toneMap: Record<Tone, { bg: string; text: string; border: string }> = {
  green: { bg: "bg-[#EAF3EE]", text: "text-[#123C2F]", border: "border-[#123C2F]/20" },
  sand: { bg: "bg-[#F7F1E8]", text: "text-[#6B625C]", border: "border-[#E5DDD2]" },
  gold: { bg: "bg-[#F7E8C1]", text: "text-[#7A5C00]", border: "border-[#C8972C]/30" },
  muted: { bg: "bg-stone-100", text: "text-stone-500", border: "border-stone-200" },
};

const ratioMap: Record<string, string> = {
  "4:5": "aspect-[4/5]",
  "1:1": "aspect-square",
  "4:3": "aspect-[4/3]",
  "16:9": "aspect-video",
  "3:4": "aspect-[3/4]",
};

type Props = {
  label?: string;
  subLabel?: string;
  ratio?: "4:5" | "1:1" | "4:3" | "16:9" | "3:4";
  tone?: Tone;
  className?: string;
};

export function ImagePlaceholder({
  label = "صورة المنتج",
  subLabel = "تُضاف لاحقاً",
  ratio = "1:1",
  tone = "sand",
  className = "",
}: Props) {
  const t = toneMap[tone];
  const aspectClass = ratioMap[ratio] ?? "aspect-square";
  return (
    <div
      className={`${aspectClass} ${t.bg} ${t.border} flex flex-col items-center justify-center rounded-2xl border-2 border-dashed ${className}`}
      aria-hidden="true"
    >
      <svg className={`h-10 w-10 opacity-30 ${t.text}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3 20.25h18A.75.75 0 0021.75 19.5V6.75A.75.75 0 0021 6H3a.75.75 0 00-.75.75V19.5a.75.75 0 00.75.75z" />
      </svg>
      <p className={`mt-3 text-sm font-medium ${t.text}`}>{label}</p>
      <p className={`mt-1 text-xs opacity-60 ${t.text}`}>{subLabel}</p>
    </div>
  );
}
