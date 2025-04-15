// Importing the BasePage class
import BasePage from "./BasePage"

// Creating an instance of the BasePage class
const basePage = new BasePage();

class LoginPage{

    constructor(page){
        this.page = page
        this.textbox_username = page.locator('[data-test="username"]')
        this.textbox_password = page.locator('[data-test="password"]')
        this.button_login = page.locator('[data-test="login-button"]')
        this.message_error_not_match = page.locator("//h3[contains(text(),'do not match')]")
    }

    async loginToApplication(username, password){
        await basePage.fillTextBox(this.textbox_username, username, "Username")
        await basePage.fillTextBox(this.textbox_password, password, "Password")
        await basePage.clickOnWebElement(this.button_login, "Login button")
    }

    async loginToApplicationWithValidCredentials(){

        // Loading login credentials from JSON file
        const loginCredentials = require('../test-data/login_credentials.json');

        // Extracting credentials for valid case
        const { valid_username, valid_password } = loginCredentials.data.credentials_1;

        await this.loginToApplication(valid_username, valid_password)
    }

}

export default LoginPage;
