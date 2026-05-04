"use client";

import { useEffect } from "react";
import Script from "next/script";

const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;
const TIKTOK_PIXEL_ID = process.env.NEXT_PUBLIC_TIKTOK_PIXEL_ID;
const SNAP_PIXEL_ID = process.env.NEXT_PUBLIC_SNAP_PIXEL_ID;
const ENABLED = process.env.NEXT_PUBLIC_TRACKING_ENABLED !== "false";

export function TrackingProvider() {
  useEffect(() => {
    if (!ENABLED) return;

    const TIMEOUT = 2500;
    let initialized = false;

    function init() {
      if (initialized) return;
      initialized = true;
      loadTrackingScripts();
    }

    // Wait for requestIdleCallback, first interaction, or timeout
    let interactionCleanup: (() => void) | null = null;
    let timeoutId: ReturnType<typeof setTimeout>;

    if ("requestIdleCallback" in window) {
      (window as typeof window & { requestIdleCallback: (cb: () => void) => void }).requestIdleCallback(init);
    } else {
      timeoutId = setTimeout(init, TIMEOUT);
    }

    const events = ["click", "scroll", "keydown", "touchstart"];
    function handleInteraction() {
      init();
      cleanup();
    }
    events.forEach((ev) => window.addEventListener(ev, handleInteraction, { once: true, passive: true }));

    function cleanup() {
      clearTimeout(timeoutId);
      events.forEach((ev) => window.removeEventListener(ev, handleInteraction));
    }

    interactionCleanup = cleanup;

    // Fallback timeout
    timeoutId = setTimeout(init, TIMEOUT);

    return () => interactionCleanup?.();
  }, []);

  return (
    <>
      {/* Meta Pixel — loaded deferred via Script */}
      {META_PIXEL_ID && ENABLED && (
        <Script
          id="meta-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function(f,b,e,v,n,t,s)
              {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
              n.callMethod.apply(n,arguments):n.queue.push(arguments)};
              if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
              n.queue=[];t=b.createElement(e);t.async=!0;
              t.src=v;s=b.getElementsByTagName(e)[0];
              s.parentNode.insertBefore(t,s)}(window, document,'script',
              'https://connect.facebook.net/en_US/fbevents.js');
              fbq('init', '${META_PIXEL_ID}');
              fbq('track', 'PageView');
            `,
          }}
        />
      )}
      {/* TikTok Pixel */}
      {TIKTOK_PIXEL_ID && ENABLED && (
        <Script
          id="tiktok-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              !function (w, d, t) {
                w.TiktokAnalyticsObject=t;var ttq=w[t]=w[t]||[];
                ttq.methods=["page","track","identify","instances","debug","on","off","once","ready","alias","group","enableCookie","disableCookie","holdConsent","revokeConsent","grantConsent"],
                ttq.setAndDefer=function(t,e){t[e]=function(){t.push([e].concat(Array.prototype.slice.call(arguments,0)))}};
                for(var i=0;i<ttq.methods.length;i++)ttq.setAndDefer(ttq,ttq.methods[i]);
                ttq.instance=function(t){for(var e=ttq._i[t]||[],n=0;n<ttq.methods.length;n++)ttq.setAndDefer(e,ttq.methods[n]);return e},
                ttq.load=function(e,n){var r="https://analytics.tiktok.com/i18n/pixel/events.js",o=n&&n.partner;
                ttq._i=ttq._i||{},ttq._i[e]=[],ttq._i[e]._u=r,ttq._t=ttq._t||{},ttq._t[e]=+new Date,ttq._o=ttq._o||{},ttq._o[e]=n||{};
                n=document.createElement("script");n.type="text/javascript",n.async=!0,n.src=r+"?sdkid="+e+"&lib="+t;
                e=document.getElementsByTagName("script")[0];e.parentNode.insertBefore(n,e)};
                ttq.load('${TIKTOK_PIXEL_ID}');
                ttq.page();
              }(window, document, 'ttq');
            `,
          }}
        />
      )}
      {/* Snap Pixel */}
      {SNAP_PIXEL_ID && ENABLED && (
        <Script
          id="snap-pixel"
          strategy="lazyOnload"
          dangerouslySetInnerHTML={{
            __html: `
              (function(e,t,n){if(e.snaptr)return;var a=e.snaptr=function()
              {a.handleRequest?a.handleRequest.apply(a,arguments):a.queue.push(arguments)};
              a.queue=[];var s='script';r=t.createElement(s);r.async=!0;
              r.src=n;var u=t.getElementsByTagName(s)[0];
              u.parentNode.insertBefore(r,u);})(window,document,
              'https://sc-static.net/scevent.min.js');
              snaptr('init', '${SNAP_PIXEL_ID}', {'user_email': '__INSERT_USER_EMAIL__'});
              snaptr('track', 'PAGE_VIEW');
            `,
          }}
        />
      )}
    </>
  );
}

function loadTrackingScripts() {
  // Scripts are loaded via Next.js Script tags (lazyOnload)
  // This function can be used for any imperative initialization if needed
}
