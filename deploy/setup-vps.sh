#!/usr/bin/env bash
# One-time VPS setup for souksham.shop on a fresh Ubuntu/Debian server.
# Run as root or with sudo. Idempotent: safe to re-run.
#
#   curl -fsSL https://raw.githubusercontent.com/<you>/souksham/main/deploy/setup-vps.sh | sudo bash
# Or after `git clone` on the VPS:
#   sudo bash deploy/setup-vps.sh

set -euo pipefail

DOMAIN="${DOMAIN:-souksham.shop}"
ALT_DOMAIN="${ALT_DOMAIN:-www.souksham.shop}"
LE_EMAIL="${LE_EMAIL:-}"   # set with: LE_EMAIL=you@example.com sudo -E bash deploy/setup-vps.sh

echo "==> Updating apt"
apt-get update -y
apt-get install -y curl ca-certificates gnupg git ufw

if ! command -v node >/dev/null 2>&1 || ! node -v | grep -qE '^v(20|22)\.'; then
  echo "==> Installing Node.js 20 LTS"
  curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
  apt-get install -y nodejs
fi

if ! command -v pm2 >/dev/null 2>&1; then
  echo "==> Installing PM2"
  npm i -g pm2
fi

if ! command -v nginx >/dev/null 2>&1; then
  echo "==> Installing nginx"
  apt-get install -y nginx
fi

echo "==> Configuring firewall"
ufw allow OpenSSH || true
ufw allow 'Nginx Full' || true
yes | ufw enable || true

echo "==> Installing nginx site"
install -m 0644 deploy/nginx-souksham.shop.conf /etc/nginx/sites-available/souksham.shop
ln -sf /etc/nginx/sites-available/souksham.shop /etc/nginx/sites-enabled/souksham.shop
rm -f /etc/nginx/sites-enabled/default
mkdir -p /var/www/certbot
nginx -t
systemctl reload nginx

if [ -n "$LE_EMAIL" ]; then
  echo "==> Installing certbot + issuing certificate"
  apt-get install -y certbot python3-certbot-nginx
  certbot --nginx -d "$DOMAIN" -d "$ALT_DOMAIN" --non-interactive --agree-tos -m "$LE_EMAIL" --redirect
else
  echo "!! Skipping SSL: set LE_EMAIL=you@example.com to auto-issue Let's Encrypt cert."
fi

echo "==> Done."
echo "Next:"
echo "  1) Put CHECKOUT_WEBHOOK_URL=... into .env.production.local at the project root."
echo "  2) Run: npm ci && npm run build && pm2 start deploy/ecosystem.config.cjs && pm2 save && pm2 startup"
