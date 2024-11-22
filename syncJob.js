const cron = require('node-cron');
const axios = require('axios');

function isYesterday(dateString) {
    const closedDate = new Date(dateString);
    const now = new Date();

    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    return closedDate >= yesterday;
}


cron.schedule('1,30 * * * * *', async () => {
    console.log('Sync job gestart om:', new Date().toISOString());

    try {
        const response = await axios.post(
            'https://private-anon-f32c94881b-teamleadercrm.apiary-mock.com/deals.list',
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
        );
        const data = response.data.data
        console.log('Status:', response.status);
        console.log('Response:', data);
        data.forEach(deal => {
            if (!isYesterday(deal.closed_at)) {
                return;
            }
            console.log(deal)
        });

    } catch (error) {
        console.error('Fout bij synchronisatie:', error.message);
    }

    console.log('Sync job voltooid.');
});
