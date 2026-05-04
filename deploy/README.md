# Deploy — Hostinger VPS (Ubuntu/Debian)

Production target: **https://souksham.shop** behind nginx, served by Next.js via PM2.

## Files

| File | Purpose |
|------|---------|
| `setup-vps.sh` | One-time provisioning: Node 20 LTS, PM2, nginx, UFW, optional Let's Encrypt SSL. Idempotent. |
| `nginx-souksham.shop.conf` | Reverse proxy → `127.0.0.1:3000`, long-cache for `/_next/static`. |
| `ecosystem.config.cjs` | PM2 process definition for the Next.js server. |
| `release.sh` | Per-release script: `npm ci`, build, restart PM2. Idempotent. |

## First deploy (one-time)

On your Windows box, push the repo to GitHub (or any git remote you can clone from on the VPS).

SSH into the VPS:

```bash
ssh root@<VPS_IP>
cd /opt
git clone <your-git-url> souksham
cd souksham
cp .env.example .env.production.local
# edit .env.production.local — set CHECKOUT_WEBHOOK_URL=...
nano .env.production.local

# provision the box (installs node/nginx/pm2/ufw + nginx site + SSL)
LE_EMAIL=you@example.com sudo -E bash deploy/setup-vps.sh

# build + start
bash deploy/release.sh
pm2 startup    # run the printed command (one-time, makes pm2 boot on reboot)
pm2 save
```

## Subsequent deploys

```bash
cd /opt/souksham
git pull
bash deploy/release.sh
```

## DNS (at Hostinger or wherever the domain lives)

| Type | Name | Value |
|------|------|-------|
| `A` | `@` | `<VPS_IPv4>` |
| `A` | `www` | `<VPS_IPv4>` |

Delete pre-existing parking records on `@` / `www` first. Wait 5–30 min for propagation.
Verify with `nslookup souksham.shop` from your Windows machine.

## SSL

Handled by `setup-vps.sh` if you pass `LE_EMAIL`. Renewal is automatic via the cert-bot systemd timer:

```bash
systemctl list-timers | grep certbot
sudo certbot renew --dry-run
```

## Troubleshooting

- **502 Bad Gateway** — `pm2 logs souksham` (the Next process probably crashed; usually a missing env var).
- **Cert fails** — make sure DNS points to the VPS first, then re-run:
  `sudo certbot --nginx -d souksham.shop -d www.souksham.shop`
- **Webhook 500** — check `.env.production.local` has `CHECKOUT_WEBHOOK_URL`, then `pm2 restart souksham --update-env`.
