//import { LoginPage } from "./app.po";
import { browser, element, by } from "protractor";

describe("Login Page Tests", () => {
  //let login_page: LoginPage = new LoginPage();

  var email, password, login_btn;

  beforeEach(async () => {
    browser.waitForAngularEnabled(false);
    await browser.get("/login");
    email = element(by.id("id_email")).element(by.css("input"));
    password = element(by.id("id_password")).element(by.css("input"));
    login_btn = element(by.id("id_login"));
  });

  it("filling username and password fields", async () => {
    browser.sleep(3000);
    await email.click();
    await email.sendKeys("s8osharo@stud.uni-saarland.de");
    browser.sleep(3000);
    await password.click();
    await password.sendKeys("abc123");
    browser.sleep(3000);
    login_btn.click().then(function() {
      console.log("button pressed");
      browser.sleep(5000);
      expect(browser.getCurrentUrl()).toContain("/tabs/tab1");
    });
  });
});

// simulate login credentials and check if login is enabled on valid input and
