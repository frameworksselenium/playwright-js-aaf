
const { FullConfig } = require("@playwright/test");
const dotenv = require('dotenv');
const path = require('path');
const test_env = process.env.test_env || "dev";
async function globalSetup(config) {
    if(test_env) {
        dotenv.config({
            path: path.resolve(__dirname, `../env/.env.${test_env}`),
            override: true
        });
    }
}

module.exports = globalSetup;
