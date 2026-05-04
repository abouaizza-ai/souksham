FROM node:20-alpine AS base

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production=false

COPY . .

# Accept public env vars as build args so Next.js bakes them into the bundle
ARG NEXT_PUBLIC_SITE_URL=https://souksham.shop
ARG NEXT_PUBLIC_API_BASE_URL=https://api.souksham.shop
ARG NEXT_PUBLIC_TRACKING_ENABLED=true
ARG NEXT_PUBLIC_DEBUG_TRACKING=false
ARG NEXT_PUBLIC_META_PIXEL_ID=
ARG NEXT_PUBLIC_TIKTOK_PIXEL_ID=
ARG NEXT_PUBLIC_SNAP_PIXEL_ID=

ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_API_BASE_URL=$NEXT_PUBLIC_API_BASE_URL
ENV NEXT_PUBLIC_TRACKING_ENABLED=$NEXT_PUBLIC_TRACKING_ENABLED
ENV NEXT_PUBLIC_DEBUG_TRACKING=$NEXT_PUBLIC_DEBUG_TRACKING
ENV NEXT_PUBLIC_META_PIXEL_ID=$NEXT_PUBLIC_META_PIXEL_ID
ENV NEXT_PUBLIC_TIKTOK_PIXEL_ID=$NEXT_PUBLIC_TIKTOK_PIXEL_ID
ENV NEXT_PUBLIC_SNAP_PIXEL_ID=$NEXT_PUBLIC_SNAP_PIXEL_ID

RUN npm run build

# Production image
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system nodejs && adduser --system --ingroup nodejs nextjs

COPY --from=base /app/public ./public
COPY --from=base --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=base --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

CMD ["node", "server.js"]
