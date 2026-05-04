// PM2 process file for the Next.js production server.
// Run from the project root on the VPS:
//   pm2 start deploy/ecosystem.config.cjs --env production
//   pm2 save && pm2 startup   # follow the printed command

module.exports = {
  apps: [
    {
      name: "souksham",
      cwd: ".",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      kill_timeout: 5000,
      env: {
        NODE_ENV: "production",
        PORT: "3000",
        HOSTNAME: "127.0.0.1",
      },
    },
  ],
};
