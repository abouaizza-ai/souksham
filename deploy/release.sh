#!/usr/bin/env bash
# Release script — run on the VPS inside the project root after `git pull` (or initial clone).
# Idempotent: safe to re-run for every deploy.

set -euo pipefail

if [ ! -f .env.production.local ]; then
  echo "!! Missing .env.production.local — copy from .env.example and fill CHECKOUT_WEBHOOK_URL."
  exit 1
fi

echo "==> Installing dependencies"
npm ci

echo "==> Building Next.js"
rm -rf .next
npm run build

echo "==> Restarting PM2 process"
if pm2 describe souksham >/dev/null 2>&1; then
  pm2 restart deploy/ecosystem.config.cjs --update-env
else
  pm2 start deploy/ecosystem.config.cjs
  pm2 save
fi

pm2 status souksham
echo "==> Released. Visit https://souksham.shop"
