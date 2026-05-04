"use client";

import { useState } from "react";
import type { Product } from "@/lib/products";
import { formatUsd } from "@/lib/products";
import { useCartStore } from "@/lib/cart-store";
import { ImagePlaceholder } from "@/components/ImagePlaceholder";

export function OfferSelector({
  product,
  selectedOfferId,
  onSelect,
}: {
  product: Product;
  selectedOfferId: string;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {product.offers.filter((o) => !o.isUpsellOnly).map((offer) => (
        <button
          key={offer.id}
          type="button"
          onClick={() => onSelect(offer.id)}
          className={`relative w-full rounded-xl border-2 p-3.5 text-start transition ${
            selectedOfferId === offer.id
              ? "border-[#123C2F] bg-[#EAF3EE]"
              : "border-[#E5DDD2] bg-white hover:border-[#123C2F]/40"
          }`}
        >
          {offer.badge && (
            <span className={`absolute -top-2.5 right-3 rounded-full px-2 py-0.5 text-[10px] font-bold ${
              offer.badge === "popular" ? "bg-[#C8972C] text-white" : "bg-[#123C2F] text-white"
            }`}>
              {offer.badge === "popular" ? "الأكثر طلباً" : "أفضل قيمة"}
            </span>
          )}
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-[#171412]">{offer.labelAr}</span>
            <div className="text-end">
              <span className="text-base font-bold text-[#123C2F]">{formatUsd(offer.priceUsd)}</span>
              {offer.compareAtUsd && (
                <span className="block text-xs text-[#6B625C] line-through">{formatUsd(offer.compareAtUsd)}</span>
              )}
            </div>
          </div>
          {offer.saveUsd && (
            <span className="mt-1 block text-xs font-semibold text-[#18794E]">
              وفر {formatUsd(offer.saveUsd)}
            </span>
          )}
        </button>
      ))}
      <p className="mt-2 text-center text-xs text-[#6B625C]">
        الدفع عند الاستلام · بلا دفع مسبق · تأكيد قبل التجهيز
      </p>
    </div>
  );
}

export function ProductHero({ product }: { product: Product }) {
  const [selectedOfferId, setSelectedOfferId] = useState(product.defaultOfferId);
  const { addLine, openCart } = useCartStore();
  const selectedOffer = product.offers.find((o) => o.id === selectedOfferId) ?? product.offers[0];

  function handleAddToCart() {
    if (!selectedOffer) return;
    addLine(product.slug, selectedOffer.id, 1, "pdp");
    openCart();
  }

  return (
    <section className="py-10 sm:py-14">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-14">
          {/* Images */}
          <div className="space-y-3">
            <ImagePlaceholder
              ratio="4:5"
              label="صورة المنتج الرئيسية"
              subLabel="استبدلها بصورة UGC/استوديو لاحقاً"
              tone="sand"
            />
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <ImagePlaceholder
                  key={i}
                  ratio="1:1"
                  label={`صورة ${i}`}
                  subLabel=""
                  tone="sand"
                />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="flex flex-col gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#123C2F]">
                {product.routineNameAr}
              </p>
              <h1 className="mt-1 text-2xl font-bold text-[#171412] sm:text-3xl">
                {product.benefitHeadlineAr}
              </h1>
              <p className="mt-2 text-base text-[#6B625C]">{product.descriptionAr}</p>
            </div>

            {/* Outcomes */}
            <ul className="space-y-2">
              {product.outcomeStackAr.map((o) => (
                <li key={o} className="flex items-start gap-2 text-sm text-[#6B625C]">
                  <span className="mt-0.5 h-4 w-4 shrink-0 rounded-full bg-[#EAF3EE] flex items-center justify-center">
                    <span className="block h-1.5 w-1.5 rounded-full bg-[#18794E]" />
                  </span>
                  {o}
                </li>
              ))}
            </ul>

            {/* Rating / proof */}
            <div className="flex items-center gap-2">
              {product.reviewCount > 0 ? (
                <>
                  <span className="text-sm font-bold text-[#C8972C]">★{product.rating}</span>
                  <span className="text-xs text-[#6B625C]">({product.reviewCount} تقييم)</span>
                </>
              ) : (
                <span className="text-xs text-[#6B625C]">تقييمات تُضاف بعد أول دفعة طلبات</span>
              )}
            </div>

            {/* Offer selector */}
            <OfferSelector
              product={product}
              selectedOfferId={selectedOfferId}
              onSelect={setSelectedOfferId}
            />

            {/* CTA */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="w-full rounded-full bg-[#123C2F] py-4 text-base font-bold text-white hover:bg-[#1D5644]"
            >
              {selectedOffer
                ? `ضيفه عالسلة — ${formatUsd(selectedOffer.priceUsd)}`
                : "ضيفه عالسلة"}
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function StickyCta({ product }: { product: Product }) {
  const [selectedOfferId] = useState(product.defaultOfferId);
  const { addLine, openCart } = useCartStore();
  const selectedOffer = product.offers.find((o) => o.id === selectedOfferId) ?? product.offers[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-30 border-t border-[#E5DDD2] bg-white/95 px-4 py-3 backdrop-blur sm:hidden">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-[#171412]">{product.marketingNameAr}</p>
          {selectedOffer && (
            <p className="text-xs text-[#123C2F] font-semibold">{formatUsd(selectedOffer.priceUsd)}</p>
          )}
        </div>
        <button
          type="button"
          onClick={() => {
            if (selectedOffer) addLine(product.slug, selectedOffer.id, 1, "pdp");
            openCart();
          }}
          className="rounded-full bg-[#123C2F] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#1D5644] whitespace-nowrap"
        >
          ضيفه عالسلة
        </button>
      </div>
    </div>
  );
}
