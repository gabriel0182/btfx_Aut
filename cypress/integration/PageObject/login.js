///  <reference types="cypress"/>

class login {
  landing() {
    cy.clearCookies("_bfx_session");
    cy.clearLocalStorage();
    //cy.visitWithCloudFlareBypass();
    const home = cy.visit("https://www.staging.bitfinex.com/");
    cy.get(".header_right")
      .get(".header_right > :nth-child(1) > a")
      .click({ force: true });
    //cy.visit("https://www.staging.bitfinex.com/login");
    // cy.visit("https://bfx-ui-trading.staging.bitfinex.com/t")
    home.wait(2000);
    //cy.get('.header__login-button').click({force:true})
    return this;
  }

  inputCredentials() {
    const testData = require("../../fixtures/credentials.json");
    testData.forEach((testDataRow) => {
      const data = {
        user: testDataRow.user,
        pass: testDataRow.pass,
      };
      context(`Generating a test for ${data.user}`, () => {
        const user = cy.get("#login");
        user.type(data.user);
        const pass = cy.get("#auth-password");
        pass.type(data.pass);
      });
      return this;
    });
  }

  loginButton() {
    const testData = require("../../fixtures/credentials.json");
    testData.forEach((testDataRow) => {
      const data = {
        otp_secret: testDataRow.otp_secret,
      };
      context(`Generating a test for ${data.otp_secret}`, () => {
        const login = cy.get("#submit-login");
        login.click({ force: true });
        login.wait(5000);
        cy.task("generateOTP", `${data.otp_secret}`).then((token) => {
          cy.get("#otp").type(token);
        });
      });
    });
     const auth = cy.get("#otp-form > .btn");
    auth.click({ force: true });
    auth.wait(12000);
    if (cy.url().should('not.eq','https://bfx-ui-trading.staging.bitfinex.com/t')) {
      
     /* const notUS = cy
        .get(".ui-modaldialog__footer")
        .get(".ui-modaldialog__footer > :nth-child(2)");
      notUS.click({ force: true });
      notUS.wait(5000);*/
      const testData = require("../../fixtures/credentials.json");
      testData.forEach((testDataRow) => {
        const data = {
          user: testDataRow.user,
        };
        context(`Generating a test for ${data.user}`, () => {
          const email = cy.get(".StandardInput");
          email.type(data.user);
          const sendCode = cy.get(":nth-child(2) > .Button");
          sendCode.click({ force: true });
          sendCode.wait(2000);
        });
      });
    } 
      else {
        const accountName = cy
        .get(".page-footer__content > :nth-child(1) > :nth-child(1)")
        .get(":nth-child(1) > :nth-child(1) > .page-footer__title")
        .scrollIntoView();
      accountName.should("contain.text", "gabriel.aguar");
    }
    return this;
  }
  /*const notUS = cy
    .get('.ui-modaldialog__footer')
    .get('.ui-modaldialog__footer > :nth-child(2)')
    notUS.click({ force: true })
    notUS.wait(5000)
    return this;*/
  verifyLoggedOn() {
    const accountName = cy
      .get(".page-footer__content > :nth-child(1) > :nth-child(1)")
      .get(":nth-child(1) > :nth-child(1) > .page-footer__title")
      .scrollIntoView();
    accountName.should("contain.text", "gabriel.aguar");
    return this;
  }
}

export default login;
