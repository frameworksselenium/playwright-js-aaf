const { test, expect } = require('@playwright/test');
const { webkit, chromium, firefox } = require('playwright');
const { LoginPage } = require('../pages/hotelPages/LoginPage');

test('login test', async () => {
    //const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    //const browser = await firefox.launch({ headless: false });
    const browser = await webkit.launch({ headless: false, channel: 'webkit' });

    const page = await browser.newPage();
    await page.goto('http://adactin.com/HotelApp/index.php');

    const userName = await page.locator('#username');
    const password = await page.locator('#password');
    const login = await page.locator('#login');

    await userName.fill('kmanubolu');
    await password.fill('RAOJM9');
    await login.click();

    await page.goto('http://adactin.com/HotelApp/index.php');

    await page.locator('#username').fill('kmanubolu');
    await page.locator('#password').fill('RAOJM9');
    await page.locator('#login').click();

    await page.goto('http://adactin.com/HotelApp/index.php');

    await page.fill('#username', 'kmanubolu');
    await page.fill('#password', 'RAOJM9');
    await page.click('#login');

    const title = await page.title();
    expect(title).toBe('AdactIn.com - Search Hotel');

    await browser.close();
});

test('Search', async () => {
    const browser = await chromium.launch({ headless: false, channel: 'chrome' });
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);
    await loginPage.navigate();
    await loginPage.login('kmanubolu', 'RAOJM9');

    const title = await page.title();
    expect(title).toBe('Adactin.com - Search Hotel');

    await browser.close();
});

test('Browser Context', async () => {
    const browser = await chromium.launch({ headless: false }); // Launch browser (set headless to false to see the browser)
    const context = await browser.newContext(); // Create a new browser context (like incognito mode)

    const page = await context.newPage(); // Create a new page within the context
    await page.goto('https://www.example.com'); // Navigate to a website

    // Interact with the page using Playwright methods
    await page.click('text=Sign in');
    await page.fill('#username', 'user123');
    await page.fill('#password', 'secretpassword');
    await page.click('button[type="submit"]');

    // You can create multiple pages within the same context
    const newPage = await context.newPage();
    await newPage.goto('https://www.example.com/profile'); // Navigate to a different page

    // Close the pages and browser context when done
    await page.close();
    await newPage.close();
    await context.close();
    await browser.close();
});