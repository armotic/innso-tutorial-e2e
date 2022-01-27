const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
require('dotenv').config();
const PROJECT_KEY = 'TUTORIAL'

let credentials = {
    "jira": {
        "token": process.env.JIRA_TOKEN
    },
    "xray": {
        "client_id": process.env.XRAY_CLIENT_ID,
        "client_secret": process.env.XRAY_CLIENT_SECRET
    }
}

function syncFeature(filename, token) {
    const featurePath = `cypress/integration/features/${filename}`;
    const formData = new FormData();
    formData.append('file', fs.createReadStream(featurePath), {knownLength: fs.statSync(featurePath).size})
    axios.post(`https://xray.cloud.getxray.app/api/v2/import/feature?projectKey=${PROJECT_KEY}`,
        formData, {
            headers: {
                ...formData.getHeaders(),
                "Authorization": "Bearer " + token,
                "Content-Length": formData.getLengthSync()
            }
        }).then(resp => {
        console.log(`Syncing ${filename}`);
        const preconditions = resp.data.updatedOrCreatedPreconditions;
        for (const update of preconditions) {
            console.log(`└── ${update.key} - precondition updated`);
        }
        const tests = resp.data.updatedOrCreatedTests;
        for (const update of tests) {
            console.log(`└── ${update.key} - test updated`);
        }
        const errors = resp.data.errors;
        for (const err of errors) {
            console.log(`Error found: ${err}`);
            process.exitCode = 2;
        }
    }, err => {
        console.error(`Failed to sync ${filename}: {${err.response.status}} ${err.response.data.error}`);
        process.exit(1);
    });
}

axios.post('https://xray.cloud.getxray.app/api/v1/authenticate',
    {
        "client_id": credentials.xray.client_id,
        "client_secret": credentials.xray.client_secret,
    }).then(resp => {
    const token = resp.data;
    fs.readdir('cypress/integration/features', (err, files) => {
        files.forEach(file => {
            syncFeature(file, token);
        });
    });
}, err => {
    console.error(`Unable to login to Xray servers: {${err.response.status}} ${err.response.data.error}`);
    process.exit(1);
});
