const { test, expect, Page, Browser, Locator } = require('@playwright/test');
const { webkit, chromium, firefox } = require('playwright');


class LoginPage {

  constructor(page) {
      this.page = page;
  }

  async navigate() {
      await this.page.goto('http://adactin.com/HotelApp/index.php');
  }

  async getUsernameInput() {
      return await this.page.locator('#username');
  }

  async getPasswordInput() {
      return await this.page.locator('#password');
  }

  async getLoginButton() {
      return await this.page.locator('#login');
  }

  async login(username, password) {
      const usernameInput = await this.getUsernameInput();
      await usernameInput.fill(username);
      const passwordInput = await this.getPasswordInput();
      await passwordInput.fill(password);
      const loginButton = await this.getLoginButton();
      await loginButton.click();
  }
}

module.exports = { LoginPage };