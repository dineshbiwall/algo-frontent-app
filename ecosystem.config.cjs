module.exports = {
  apps: [
    {
      name: "Frontend_Dev_App",
      script: "npm run start",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      // env: { NODE_ENV: 'dev' },
    },
    {
      name: "Frontend_Stage_App",
      script: "npm run start",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        // AWS_SECRET_NAME: 'staging/buburuza/backend',
        // AWS_REGION: 'eu-central-1',
        // NODE_ENV: 'production',
        PORT: 3000,
      },
    },
    {
      name: "Frontend_Prod_App",
      script: "npm run start",
      log_date_format: "YYYY-MM-DD HH:mm:ss",
      env: {
        // AWS_SECRET_NAME: 'prod/buburuza/backend',
        // AWS_REGION: 'eu-central-1',
        // NODE_ENV: 'production',
      },
    },
  ],
};
// pm2 startOrRestart ecosystem.config.cjs --only Frontend_Stage_App
// app.algomaxcapital.com
// api.algomaxcapital.com
