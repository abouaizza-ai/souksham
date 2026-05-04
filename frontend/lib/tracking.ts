/** Tracking event utilities for deduplication and attribution. */

import { v4 as uuidv4 } from "uuid";

export type TrackingEvent =
  | "PageView"
  | "ViewContent"
  | "AddToCart"
  | "InitiateCheckout"
  | "Lead"
  | "Purchase";

export function generateEventId(): string {
  return uuidv4();
}

export function getAttributionData() {
  if (typeof window === "undefined") return {};
  const params = new URLSearchParams(window.location.search);
  return {
    landing_page: window.location.href,
    referrer: document.referrer || "",
    utm_source: params.get("utm_source") ?? "",
    utm_medium: params.get("utm_medium") ?? "",
    utm_campaign: params.get("utm_campaign") ?? "",
    utm_content: params.get("utm_content") ?? "",
    utm_term: params.get("utm_term") ?? "",
    fbclid: params.get("fbclid") ?? "",
    ttclid: params.get("ttclid") ?? "",
    sc_click_id: params.get("ScCid") ?? params.get("sc_click_id") ?? "",
    fbp: getCookie("_fbp") ?? "",
    fbc: getCookie("_fbc") ?? params.get("fbclid") ? `fb.1.${Date.now()}.${params.get("fbclid")}` : "",
  };
}

function getCookie(name: string): string {
  if (typeof document === "undefined") return "";
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? (match[2] ?? "") : "";
}

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    ttq?: { track: (event: string, data?: object) => void; identify: (data: object) => void };
    snaptr?: (action: string, event: string, data?: object) => void;
  }
}

export function fireMetaPixel(event: TrackingEvent, data?: object) {
  if (typeof window === "undefined" || !window.fbq) return;
  window.fbq("track", event, data ?? {});
}

export function fireTikTokPixel(event: string, data?: object) {
  if (typeof window === "undefined" || !window.ttq) return;
  window.ttq.track(event, data ?? {});
}

export function fireSnapPixel(event: string, data?: object) {
  if (typeof window === "undefined" || !window.snaptr) return;
  window.snaptr("track", event, data ?? {});
}

export async function fireBackendEvent(
  eventName: TrackingEvent,
  eventId: string,
  data?: object,
) {
  const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://api.souksham.shop";
  try {
    await fetch(`${apiUrl}/tracking/event`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        event_id: eventId,
        event_name: eventName,
        ...data,
        attribution: getAttributionData(),
      }),
      keepalive: true,
    });
  } catch {
    // Non-blocking — tracking failures must not affect UX
  }
}
