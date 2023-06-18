const {google} = require('googleapis');
const fs = require('fs');

const GOOGLE_APPLICATION_CREDENTIALS="/credentials.json";


// Specify the ID of the file you want to add permissions to
const fileId = '1Jhd5m4cwefWZjTv_aSm7_H509Y8YBFhs';

// Define the permission to be created
const permission = {
  role: 'writer', // Can be 'owner', 'writer', 'commenter', or 'reader'
  type: 'user', // Can be 'user', 'group', 'domain', or 'anyone'
  emailAddress: 'saurabh45215@gmail.com', // Email address of the user or group
};

// Create a new JWT client using the service account credentials
const auth = new google.auth.GoogleAuth({credentials: GOOGLE_APPLICATION_CREDENTIALS,
  scopes: ['https://www.googleapis.com/auth/drive'],
});

// Authorize the client
const drive = google.drive({ version: 'v3', auth });

// Function to create the permission on the file
async function createPermission() {
  try {
    // Send the request to create the permission
    const response = await drive.permissions.create({
      fileId: fileId,
      requestBody: permission,
    });

    console.log('Permission created:', response.data);
  } catch (error) {
    console.error('Error creating permission:', error.message);
  }
}

// Call the function to create the permission
createPermission();

