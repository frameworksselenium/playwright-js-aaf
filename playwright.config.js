
import { defineConfig, devices } from '@playwright/test';
const globalVariable = require('./aaf/global_variables');
const os = require('os');

var resultfolder;
if (os.platform() === "linux") {
    resultfolder = 'reports/html-report/';
} else {
    resultfolder = 'reports/html-report/' + globalVariable.dt;
}

/**
 * @see https://playwright.dev/docs/test-configuration
 */
export default defineConfig({
    globalSetup: './utils/globalSetup.js',
    testDir: './tests',
    timeout: 60000,
    fullyParallel: true,
    forbidOnly: !!process.env.CI,

    /* Fail the build on CI if you accidentally left test.only in the source code. */
    //forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    //retries: process.env.CI ? 1 : 0,
    /* Opt out of parallel tests on CI. */
    //workers: process.env.CI ? 2 : undefined,

    reporter: [
        ['html', {
            open: 'never',
            outputFolder: resultfolder,
            outputFile: 'index.html'
        }],
    ],

    /* reporter: [['list'],
     ['html'],
     ['junit', { outputFile: 'results.xml' }],
     ['json', { outputFile: 'results.json' }]
    ],*/

    retries: 0, // Give failing tests 1 retry attempt(s)
    workers: 1,
    use: {

        /* Base URL to use in actions like `await page.goto('/')`. */
        //baseURl = 'https://saucelabs.com',
        baseURL: 'https://gorest.co.in',

        trace: 'off',
        video: 'off',
        screenshot: {
            mode: 'only-on-failure',
            fullPage: true,
        },
    },
    /* Configure projects for major browsers */
    projects: [
        /*{
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        }*//*,
        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },*/

        /* Test against mobile viewports. */
        /*{
            name: 'Mobile Chrome',
            use: { ...devices['Pixel 5'] },
        },
        {
            name: 'Mobile Safari',
            use: { ...devices['iPhone 12'] },
        },*/

        /* Test against branded browsers. */
        /*{
            name: 'Microsoft Edge',
            use: { ...devices['Desktop Edge'], channel: 'msedge' },
        },*/
        {
            name: 'Google Chrome',
            use: { ...devices['Desktop Chrome'], channel: 'chrome' },
        }/*,
        {
            name: 'Firefox',
            use: { ...devices['Desktop Firefox'] },
        },
        {
            name: 'Safari',
            use: { ...devices['Desktop Safari'] },
        }*/
    ],
});
