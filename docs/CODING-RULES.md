# Coding Rules

## Global

- TypeScript strict mode in frontend.
- Python type hints in backend.
- Arabic copy must live in data/config files where possible, not scattered across components.
- No fake social proof, fake reviews, fake certificates, or fake timers.
- Prices are recalculated server-side.
- Domain constants must come from one source of truth.

## Frontend

- Use server components by default.
- Use client components only for cart, forms, modals, tracking, and interactive offer selectors.
- Keep components small:
  - `ProductHero`
  - `OfferSelector`
  - `CartDrawer`
  - `CheckoutModal`
  - `TimedUpsell`
  - `TrustBadges`
  - `ImagePlaceholder`
- Use `next/image`.
- Validate forms with Zod.
- Use CSS/Tailwind tokens from `DESIGN-SYSTEM.md`.
- All modals/drawers accessible with ESC close and focus management.
- Web pixels deferred.

## Backend

- Keep route handlers thin.
- Business logic goes in `services/`.
- DB models in `models/`.
- Pydantic schemas in `schemas/`.
- Never trust client prices.
- Validate product/offer existence before creating order.
- Hash identifiers only in backend.
- Outbound webhooks/CAPI must have timeouts.
- Store webhook/CAPI failures; don't silently drop them.

## Testing Minimum

Frontend:

- Phone validation utilities.
- Cart pricing helpers.
- Checkout modal happy/error state if tests are configured.

Backend:

- Lebanese phone normalization.
- Price recalculation rejects tampered price.
- Checkout creates order + items.
- Sheet payload shape.
- CAPI payload builders.

## Naming

- English identifiers in code.
- Arabic strings in `copy.ts`/product data.
- Product slugs lowercase kebab-case.
- Offer ids lowercase kebab-case.

## Performance

- No large animation libraries unless used in meaningful UI.
- No blocking third-party scripts.
- Lazy-load below-fold image sections.
- Product page hero image priority.

## Security

- CORS explicit.
- Env secrets never in frontend.
- Backend API key for admin/test endpoints.
- Rate limit checkout.
- Log structured JSON in production.
