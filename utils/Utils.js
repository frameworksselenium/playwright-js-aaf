// Importing necessary modules for Playwright test
import { test, expect } from '@playwright/test';
const globalVariable = require('../aaf/global_variables');
const os = require('os');

class Utils {

    async elementContainsText(targetElement, expectedText) {
        console.log(`Asserts that an element contains the expected text '${expectedText}':`);
        expect(await (targetElement)).toContainText(expectedText)
    }

    async elementHasText(targetElement, expectedText) {
        console.log(`Asserts that an element has the expected text '${expectedText}':`);
        expect(await (targetElement)).toHaveText(expectedText)
    }

    async elementIsVisible(targetElement, targetElementName) {
        console.log(`Asserts that '${targetElementName}' is visible.`);
        expect(await (targetElement)).toBeVisible()
    }

    async elementIsNotVisible(targetElement, targetElementName) {
        console.log(`Asserts that '${targetElementName}' is not visible.`);
        expect(await (targetElement)).toBeHidden()
    }

    async elementCount(targetElement, targetElementName, expectedCount) {
        if (expectedCount == 1) {
            console.log(`Asserts that ${expectedCount} '${targetElementName}' is visible.`);
        } else {
            console.log(`Asserts that ${expectedCount} '${targetElementName}' are visible.`);
        }
        expect(await (targetElement)).toHaveCount(expectedCount)
    }

    async elementHasAttributeAndHasValue(targetElement, targetElementName, attribute, attributeValue) {
        console.log(`Asserts that '${targetElementName}' has a specific attribute '${attribute}' with the expected value '${attributeValue}':`);
        expect(await (targetElement)).toHaveAttribute(attribute, attributeValue)
    }

    async elementHasCSSPropertyAndHasValue(targetElement, targetElementName, property, propertyValue) {
        console.log(`Asserts that '${targetElementName}' has specific CSS property '${property}' with the expected value '${propertyValue}':`);
        expect(await (targetElement)).toHaveCSS(property, propertyValue)
    }

    async pageContainsUrl(page, expectedUrl) {
        const currentPageUrl = await page.url();
        console.log(`Asserts that the current page URL '${currentPageUrl}' contains the expected substring '${expectedUrl}':`);
        expect(currentPageUrl).toContain(expectedUrl);
    }

    async pageHasUrl(page, expectedUrl) {
        console.log(`Asserts that the current page URL matches the expected substring '${expectedUrl}':`);
        expect(page).toHaveURL(expectedUrl);
    }

    async pageContainsTitle(page, expectedTitle) {
        const currentPageTitle = await page.title();
        console.log(`Asserts that the current page Title '${currentPageTitle}' contains the expected substring '${expectedTitle}':`);
        expect(currentPageTitle).toContain(expectedTitle);
    }

    async pageHasTitle(page, expectedTitle) {
        console.log(`Asserts that the current page Title matches the expected substring '${expectedTitle}':`);
        expect(page).toHaveTitle(expectedTitle);
    }
}

export default new Utils;

