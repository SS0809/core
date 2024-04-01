const { Octokit } = require("@octokit/rest");
const axios = require('axios');
const fs = require('fs');
const { google } = require('googleapis');
const { Pool } = require('pg');
require('dotenv').config();

const setSecrets = require('./secrets.js');
const pool = new Pool({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD
});
const token = process.env.GITHUB_TOKEN; 
   
// file A.js
const createRepository = async (suppliedfileid , is_series) => {
//const suppliedfileid = '1s0jdnGdtdg2aYWIMkwx8v2-EP7GBN678';

var suppliedfilename = '';

// Load the service account credentials
const credentials = require('./drive-download-389811-ab674586465b.json');

// Create a new instance of the Google Drive API
const auth = new google.auth.GoogleAuth({
  credentials,
  scopes: ['https://www.googleapis.com/auth/drive'],
});
const drive = google.drive({ version: 'v3', auth });

// Specify the file ID
const fileId = suppliedfileid;
var size_mb ;
// Define a function to get the file metadata
const getFileMetadata = async () => {
  try {
    const res = await drive.files.get({
      fileId: fileId,
      fields: 'name , size ',
    });
    size_mb = res.data.size.toString().substring(0, 4) ;
    console.log(size_mb);
    return res.data.name;
  } catch (error) {
    console.error('Error retrieving file:', error);
    throw error;
  }
};

// Specify the file paths
const filePaths = [
  'dtog.py',
  'gtod.py',
  'gtod.sh',
  'dtog.sh',
  'run.py',
  'snapshot.py',
  'services.py',
  'output.py',
  'command.sh',
  '.github/workflows/gtod.yml',
  '.github/workflows/dtog.yml'
];
    // Get the file name from Google Drive
    suppliedfilename = await getFileMetadata();
    console.log('File name:', suppliedfilename);

    var repoName = suppliedfilename;
    repoName = repoName.replace(/\.mp4$/, "");
    repoName = repoName.replace(/\.mkv$/, "");
console.log(repoName); 

  try {
    // Create the repository
    const response = await axios.post(
      'https://api.github.com/user/repos',
      { name: repoName, private: true },
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      }
    );

    if (response.status === 201) {
      console.log('Repository created successfully!');
      const fileData = fs.readFileSync('drive-download-389811-ab674586465b.json', 'utf8');
await setSecrets(repoName, 'DRIVE_TOKEN', fileData , 'ss08090' , token);
             pool.query(
  'INSERT INTO moviedata (drive_code  , movie_name , size_mb , streamtape_code , doodstream_code  , is_series , is_reported) \
  VALUES ($1, $2, $3, $4, $5, $6 ,$7);',
  [fileId, repoName, size_mb, null, null, is_series ,0],
  (error, results) => {
    if (error) {
      console.error('Error executing query', error);
    } else {
      console.log("added to database");
    }
  }
);
// TODO ADD MONGO DRIVER




      // Get the repository's full name (including the owner)
      const fullName = response.data.full_name;

      for (var filePath of filePaths) {
        // Check if the current path is a folder
        const isFolder = filePath.endsWith('/');

        if (isFolder) {
          // Create the folder by adding a file with empty content
          const folderResponse = await axios.put(
            `https://api.github.com/repos/${fullName}/contents/${filePath}`,
            {
              message: 'Add folder',
              content: Buffer.from('').toString('base64') // Empty content for folders
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (folderResponse.status === 201) {
            console.log(`Folder '${filePath}' added successfully!`);
          } else {
            console.log(`Error adding folder '${filePath}':`, folderResponse.statusText);
          }
        } else {
          // Read the file content from the existing file
          var fileContent = await fs.promises.readFile('repoassets/' +filePath, 'utf-8');
          // Add file to the repository
          if (
  filePath === 'snapshot.py' ||
  filePath === 'gtod.sh' ||
  filePath === 'gtod.py'
) {
         fileContent = fileContent.replace(/randomfile.mp4/g, suppliedfilename);
           console.log('Words replaced successfully!');
       } else if (
  filePath === 'dtog.py' 
) { 
         fileContent = fileContent.replace(/randomfileid/g, suppliedfileid);
         fileContent = fileContent.replace(/randomfilepath/g, '/home/runner/work/' + repoName + '/' + repoName + '/');
           console.log('Words replaced successfully!');
       } else if (
  filePath === 'services.py' 
        ) {
    fileContent = fileContent.replace(/randomfile.mp4/g, suppliedfilename);
    fileContent = fileContent.replace(/randomfile.mp4/g, suppliedfilename);
    fileContent = fileContent.replace(/randomfileid/g, 'https://drive.google.com/file/d/'+ suppliedfileid+'/view');
           console.log('Words replaced successfully!');
       }
          const fileResponse = await axios.put(
            `https://api.github.com/repos/${fullName}/contents/${filePath}`,
            {
              message: 'Add file',
              content: Buffer.from(fileContent).toString('base64')
            },
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              }
            }
          );

          if (fileResponse.status === 201) {
            console.log(`File '${filePath}' added successfully!`);
          } else {
            console.log(`Error adding file '${filePath}':`, fileResponse.statusText);
          }
        }
      }
    } else {
      console.log('Error creating repository:', response.statusText);
    }
    
  } catch (error) {
  if (error.response) {
    console.log('Error:', error.response.data);
  } else {
    console.log('Error:', error.message);
  }
}
console.log(suppliedfileid);
console.log(suppliedfilename);

 return "created repo";
};
module.exports = createRepository;
