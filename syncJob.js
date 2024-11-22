const cron = require('node-cron');
const axios = require('axios');

// Cron job dagelijks om 23:59
cron.schedule('1 * * * * *', async () => {
  console.log('Sync job gestart om:', new Date().toISOString());
  console.log('Sync job voltooid.');
});
