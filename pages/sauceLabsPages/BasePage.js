class BasePage {

    async clickOnWebElement(element, elementName) {
        console.log(`Clicking on '${elementName}':`);
        await element.click()
    }

    async fillTextBox(element, value, textboxName) {
        console.log(`Filling '${value}' in '${textboxName}' textbox.`);
        await element.fill(value);
    }

    async mouseHoverOnWebElement(element, elementName) {
        console.log(`Mouse Hover on '${elementName}'...`);
        await element.hover()
    }

}

export default BasePage;

