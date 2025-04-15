const { test, expect } = require('@playwright/test');
const { AxeBuilder } = require('@axe-core/playwright');
import LoginPage from '../pages/sauceLabsPages/LoginPage';
import ProductsPage from '../pages/sauceLabsPages/ProductsPage';
import Components from '../pages/sauceLabsPages/Components';
import Utils from '../utils/Utils';
const baseAction = require('../aaf/PlaywrightHelper');
const globalVariable = require('../aaf/global_variables');


/**
 * Test suite for Sauce Demo login functionality.
 */
test.describe('Login', () => {

    /**
     * Before each test, navigate to the application homepage.
     */
    test.beforeEach(async ({ page }) => {
        await page.goto(process.env.baseURL);
        globalVariable.tcName = test.info().title;
    });

    /**
     * After each test, push the results to TERM
     */
    test.afterEach(async ({ page }) => {
        console.log(`Finished ${test.info().title} with status ${test.info().status}`);
        //Utils.termReportReporting(page);
    });

    test.afterAll('Teardown', async () => {
        //Utils.publishReport();
        console.log('Done with tests');
    });
    // The above hooks to be copy pasted in each and every `<name>.spec.js` to report TERM tool
    // ***END**************Please do not modify or delete above methods*******************

    test('Debug and Dry run', async ({ page }) => {

        console.log(process.env.TERM);
        await test.info().attach('Debug and Dry run screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png',
        });

    });

    test('Accessibility Testing for Login screen', async ({ page }) => {
        const results = await new AxeBuilder({ page })
            .withTags(['wcag2aa'])
            .analyze();
        await baseAction.accessibilityReport('Login', results);
        await test.info().attach('Login screenshot', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
    });

    test('CCE117_TC01_LoginWithValidCredentials', async ({ page }) => {
        //await baseAction.executeJsonQuery('TestData', 'SauceDemoLoginpage');
        //var valid_username = await baseAction.getData('valid_username');
        //var valid_password = await baseAction.getData('valid_password');

        var valid_username = "standard_user";
        var valid_password = "secret_sauce";

        // Fill valid credentials and login
        console.log(process.env.TERM);
        const loginPage = new LoginPage(page);
        await test.info().attach('Sauce demo - Login page', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
        await loginPage.loginToApplication(valid_username, valid_password);
        const productsPage = new ProductsPage(page);
        Utils.elementHasText(productsPage.heading_products, 'Products');
        const components = new Components(page);
        Utils.elementHasText(components.header_logo_swag_labs, 'Swag Labs');
        Utils.elementContainsText(components.footer_msg_copyright, '© 2025 Sauce Labs. All Rights Reserved. Terms of Service | Privacy Policy');
        Utils.elementIsVisible(components.footer_link_linkedin, 'Footer: LinkedIn link');
        Utils.elementHasAttributeAndHasValue(components.footer_link_linkedin, 'Footer: LinkedIn link', 'href', 'https://www.linkedin.com/company/sauce-labs/');
        await test.info().attach('Sauce demo - Cart Page', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
    });

    test('CCE117_TC02_LoginWithInvalidCredentials', async ({ page }) => {
        //await baseAction.executeJsonQuery('TestData', 'SauceDemoLoginpage');
        //var valid_username = await baseAction.getData('valid_username');
        //var valid_password = await baseAction.getData('valid_password');

        var valid_username = "invalid_email@gmail.com";
        var valid_password = "invalid_password";

        const loginPage = new LoginPage(page);
        await loginPage.loginToApplication(valid_username, valid_password);
        await test.info().attach('Sauce demo - Login page invalidcredentials', {
            body: await page.screenshot(),
            contentType: 'image/png'
        });
        await expect(loginPage.message_error_not_match).toBeVisible();
    });

});
