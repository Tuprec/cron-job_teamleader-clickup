const cron = require('node-cron');
const axios = require('axios');

cron.schedule('1 * * * * *', async () => {
  console.log('Sync job gestart om:', new Date().toISOString());

  try {
    const api1Response = await axios.get('https://cards.fabtcg.com/api/search/v1/cards/?pitch_lookup=exact&pitch=3&name=infect+shot');
    console.log('API 1 respons:', api1Response.data);
  } catch (error) {
    console.error('Fout bij synchronisatie:', error.message);
  }

  console.log('Sync job voltooid.');
});
