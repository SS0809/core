const { v4: uuidv4 } = require('uuid');
const { google } = require('googleapis');
const { JWT } = require('google-auth-library');

async function createDriveNotificationChannel(notificationUrl) {

// Load the service account private key JSON file
const privatekey = require('./drive-download-389811-ab674586465b.json');

// Generate a UUID for the channel
const channelId = uuidv4();

// Authenticate using the service account
const jwtClient = new JWT({
  email: privatekey.client_email,
  key: privatekey.private_key,
  scopes: ['https://www.googleapis.com/auth/drive'],
});
  const drive = google.drive({ version: 'v3', auth: jwtClient });

  // Define the notification channel parameters
  const folderId = '13cPqUdKzJM4vuYX-GD0YvhtZgvZNa1aF';
  //const notificationUrl = 'https://30be-157-34-122-53.ngrok-free.app/post';
  //https://discord.com/api/webhooks/1127586462888632442/rZ0jAcTLZPjTATiVcgqySR8nD81SBdqTS-Dvam9TA51NTcJdRlk9-7ZOjFajPt_C_zFY

  // Create the channel
  const response = await drive.files.watch({
    fileId: folderId,
    requestBody: {
      id: channelId,
      type: 'web_hook',
      address: notificationUrl,
    },
  });

  console.log('Notification channel created:', response.data);
}

//createDriveNotificationChannel().catch(console.error);
  
module.exports = createDriveNotificationChannel;