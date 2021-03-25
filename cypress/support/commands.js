// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add("loginToBitfinexManually", () => {
  cy.visitWithCloudFlareBypass("https://bfx-ui-trading.staging.bitfinex.com/t");
  let session = cy.getCookie("_bfx_session");
  cy.request("GET", "https://www.staging.bitfinex.com/_ws_token", {
    cookie: `${session.name}=${session.value}`,
  }).then((response) => {
    let token = response.body.token;
    if (token.length > 0) {
      return;
    } else {
      cy.visitWithCloudFlareBypass(
        "https://bfx-ui-trading.staging.bitfinex.com"
      );
      cy.fixture("sensitive/credentials.json").then((credentials) => {
        cy.wait(5000);
        cy.get(".header__login-button").click();
        cy.get("#login").type(credentials.login, { force: true });
        cy.get("#auth-password").type(credentials.password, { log: false });
        cy.get("button").contains("Login").click();
        const login = cy.get("#submit-login");
        login.click({ force: true });
        login.wait(5000);
        cy.task("generateOTP", `${credentials.totp_secre}`).then((token) => {
          cy.get("#otp").type(token);
          cy.wait(5000);
        });
      });
    }
  });
});

Cypress.Commands.add("visitBitfinexHomepage", () => {
  cy.clearCookie("_bfx_session");
  cy.visitWithCloudFlareBypass("/");
});

Cypress.Commands.add("visitBitfinexAndLogin", () => {
  cy.loginToBitfinexManually();
});

Cypress.Commands.add("visitWithCloudFlareBypass", (route) => {
  cy.fixture("sensitive/credentials.json").then((credentials) => {
    const headers = {
      "CF-Access-Client-Id": credentials.cloudflare_id,
      "CF-Access-Client-Secret": credentials.cloudflare_secret,
    };
    cy.visit(route, { headers: headers });
  });
});
