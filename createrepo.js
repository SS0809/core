const axios = require('axios');
const fs = require('fs');
function replacer(filePath,searchWord,replacement){
// Read the file contents
fs.readFile(filePath, 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  const modifiedData = data.replace(new RegExp(searchWord, 'g'), replacement);
  fs.writeFile(filePath, modifiedData, 'utf8', (err) => {
    if (err) {
      console.error('Error writing file:', err);
      return;
    }
    console.log('Word replaced successfully!');
  });
});
}
const createRepository = async () => {
  const repoName = 'my-new-repo';
  const token = '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';
  const filePath = 'file.txt'; // Path of the existing file

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

      // Get the repository's full name (including the owner)
      const fullName = response.data.full_name;

      // Read the file content from the existing file
      const fileContent = fs.readFileSync(filePath, 'utf-8');

      // Add file to the repository
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
        console.log('File added successfully!');
      } else {
        console.log('Error adding file:', fileResponse.statusText);
      }
    } else {
      console.log('Error creating repository:', response.statusText);
    }
  } catch (error) {
    console.log('Error:', error);
  }
};

createRepository();
