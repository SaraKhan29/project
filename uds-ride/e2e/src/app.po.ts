import { browser, by, element } from "protractor";

export class HomePage {
  navigateTo() {
    return browser.get("/");
  }

  getParagraphText() {
    return element(by.deepCss("app-root ion-content")).getText();
  }
}

export class LoginPage {
  navigateTo() {
    return browser.get("/login");
  }

  getEmailField() {
    return element(by.name("email"));
  }

  getPasswordField() {
    return element(by.name("password"));
  }

  getLoginButton() {
    return element(by.id("login_btn"));
  }
}
