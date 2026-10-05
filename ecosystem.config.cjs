module.exports = {
  apps: [
    {
      name: "indiraprojects-frontend",
      script: "pnpm",
      args: "start",
      cwd: "/home/thirdvizion-indiraprojects/indiraprojects_frontend",
      env: {
        NODE_ENV: "production",
        PORT: 3002,
        NODE_OPTIONS: "--no-deprecation",
        NEXT_PUBLIC_CMS_URL: "https://indiracms.thirdvizion.com",
      },
      interpreter: "pnpm",
      exec_mode: "fork",
      instances: 1,
      autorestart: true,
      max_memory_restart: "500M",
    },
  ],
};
