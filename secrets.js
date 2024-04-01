const { Octokit } = require("@octokit/core");
const sodium = require('libsodium-wrappers');
const fs = require('fs');

async function setSecrets(repo, secret_name, plainTextSecret , user , token) {
    const owner = user;
    const octokit = new Octokit({
        auth: token
    });

    try {
        const response = await octokit.request('GET /repos/' + owner + '/' + repo + '/actions/secrets/public-key', {
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });
        
        const binsec = sodium.from_string(plainTextSecret);
        const binkey = sodium.from_base64(response.data.key, sodium.base64_variants.ORIGINAL);
        const encBytes = sodium.crypto_box_seal(binsec, binkey);
        const final_output = sodium.to_base64(encBytes, sodium.base64_variants.ORIGINAL);


        const response1 = await octokit.request('PUT /repos/' + owner + '/' + repo + '/actions/secrets/' + secret_name, {
            encrypted_value: final_output,
            key_id: response.data.key_id,
            headers: {
                'X-GitHub-Api-Version': '2022-11-28'
            }
        });

        console.log(response1.data);
    } catch (error) {
        console.error(`Error setting secret: ${error}`);
    }
}

/*
// EXAMPLE USAGE:
const fileData = fs.readFileSync('drive-download-389811-ab674586465b.json', 'utf8');
console.log('File contents:', fileData);
const repo = 'sample';
const plainTextSecret = fileData;
const user = 'ss0809';
const token = process.env.GITHUB_TOKEN;
 setSecrets("Oppenheimr2023", 'DRIVE_TOKEN', fileData , 'ss08090' , token);
*/

module.exports = setSecrets;














/*


name: Generate XML sitemap

on:
  push:
    branches: [main]

jobs:
  sitemap_job:
    runs-on: ubuntu-latest
    permissions:
      contents: write    
    name: Generate a sitemap

    steps:
      - name: Checkout the repo
        uses: actions/checkout@v3
        with:
          fetch-depth: 0
      - name: Create .env file
        run: |
            cat > env.txt <<EOF
            SERVER=${{ secrets.OK }}
            EOF
      - name: Create .env file
        run: |
            cat env.txt 
            mkdir ok
            cp env.txt ok/env.txt
      - name: Deploy to GitHub Pages
        uses: JamesIves/github-pages-deploy-action@4.1.1
        with:
          branch: main
          folder: ok


          */

