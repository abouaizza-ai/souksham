"use client";

import { useEffect, useState } from "react";
import type { Product, ProductOffer } from "@/lib/products";
import { formatUsd } from "@/lib/products";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

const UPSELL_SECONDS = 15;

type Props = {
  product: Product;
  offer: ProductOffer;
  currentTotal: number;
  onAccept: () => void;
  onDecline: () => void;
  onTimeout: () => void;
  loading?: boolean;
};

export function TimedUpsell({
  product,
  offer,
  onAccept,
  onDecline,
  onTimeout,
  loading = false,
}: Props) {
  const [secondsLeft, setSecondsLeft] = useState(UPSELL_SECONDS);
  const [decided, setDecided] = useState(false);

  useEffect(() => {
    if (decided) return;
    if (secondsLeft <= 0) {
      setDecided(true);
      onTimeout();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => s - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft, decided, onTimeout]);

  const progress = (secondsLeft / UPSELL_SECONDS) * 100;

  return (
    <div className="px-4 py-5 sm:px-5">
      {/* Header */}
      <div className="mb-4 text-center">
        <span className="inline-block rounded-full bg-[#C8972C] px-3 py-1 text-xs font-bold text-white">
          عرض خاص قبل تأكيد طلبك
        </span>
        <h3 className="mt-2 text-lg font-bold text-[#171412]">
          ضيف <span className="text-[#123C2F]">{product.marketingNameAr}</span> الآن بسعر خاص
        </h3>
        <p className="mt-1 text-sm text-[#6B625C]">
          لأن طلبك جاهز للتأكيد — العرض ينتهي خلال {secondsLeft} ثانية
        </p>
      </div>

      {/* Timer bar */}
      <div className="mb-4 h-2 w-full overflow-hidden rounded-full bg-[#E5DDD2]">
        <div
          className="h-full rounded-full bg-[#C8972C] transition-all duration-1000 ease-linear"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Product card */}
      <div className="mb-4 flex gap-4 rounded-xl border border-[#E5DDD2] bg-[#F7F1E8] p-4">
        <div className="h-20 w-20 shrink-0">
          <ImagePlaceholder ratio="1:1" label="" subLabel="" tone="sand" className="!rounded-xl h-20 w-20" />
        </div>
        <div className="flex-1">
          <p className="text-xs font-semibold uppercase tracking-wide text-[#6B625C]">{product.routineNameAr}</p>
          <p className="mt-0.5 text-base font-bold text-[#171412]">{product.marketingNameAr}</p>
          <p className="mt-1 text-xs text-[#6B625C] line-clamp-2">{product.shortProblemAr}</p>
          <div className="mt-2 flex items-center gap-2">
            <span className="text-lg font-bold text-[#123C2F]">{formatUsd(offer.priceUsd)}</span>
            {offer.compareAtUsd && (
              <span className="text-sm text-[#6B625C] line-through">{formatUsd(offer.compareAtUsd)}</span>
            )}
            {offer.saveUsd && (
              <span className="rounded-full bg-[#EAF3EE] px-2 py-0.5 text-xs font-semibold text-[#18794E]">
                وفر {formatUsd(offer.saveUsd)}
              </span>
            )}
          </div>
          <p className="mt-0.5 text-xs text-[#6B625C]">{offer.labelAr}</p>
        </div>
      </div>

      {/* CTA buttons */}
      <div className="space-y-2">
        <button
          type="button"
          disabled={loading}
          onClick={() => { setDecided(true); onAccept(); }}
          className="w-full rounded-full bg-[#C8972C] py-3.5 text-sm font-bold text-white hover:bg-[#b07d20] disabled:opacity-50"
        >
          {loading ? "جاري الإضافة…" : `ضيفه للطلب بسعر خاص — ${formatUsd(offer.priceUsd)}`}
        </button>
        <button
          type="button"
          disabled={loading}
          onClick={() => { setDecided(true); onDecline(); }}
          className="w-full rounded-full border border-[#E5DDD2] py-3 text-sm font-medium text-[#6B625C] hover:bg-[#F7F1E8] disabled:opacity-50"
        >
          لا، كمّل طلبي بدون إضافة
        </button>
      </div>

      <p className="mt-3 text-center text-[11px] text-[#6B625C]">
        إذا ما اخترت، بيتم تأكيد طلبك الأصلي بعد {secondsLeft} ثانية
      </p>
    </div>
  );
}
