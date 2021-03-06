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
  cy.visitWithCloudFlareBypass("https://bfx-ui-trading.staging.bitfinex.com/t")
      cy.on('uncaught:exception', (err, runnable) => {
        expect(err.message).to.include('t._innerWindow(...).widgetReady')
        return false
      })
  .get('#book-bids > .book__rows')
        .should("be.visible")
  let session = cy.getCookie("_bfx_session");
  cy.request("GET", "https://www.staging.bitfinex.com/_ws_token", {
    cookie: `${session.name}=${session.value}`,
  }).then((response) => {
    let token = response.body.token;
    if (token.length > 0) {
      return this;
    } else {
      cy.visitWithCloudFlareBypass(
        "https://bfx-ui-trading.staging.bitfinex.com/t")
                      cy.on('uncaught:exception', (err, runnable) => {
              expect(err.message).to.include('t._innerWindow(...).widgetReady')
              return false
            })
      cy.fixture("sensitive/credentials.json").then((credentials) => {
        cy.get(".header__login-button").should('be.visible')
        .click({force:true})
        .get("#login").type(credentials.login, { force: true })
        .get("#auth-password").type(credentials.password, { log: false })
        .get("button").click({force:true})
        .get("#submit-login")
        .click({ force: true })
        .task("generateOTP", `${credentials.totp_secre}`).then((token) => {
        cy.get("#otp").type(token)
        })
      });
    }
  })
});

Cypress.Commands.add("visitBitfinexHomepage", () => {
  cy.clearCookie("_bfx_session");
  cy.visitWithCloudFlareBypass("/");
});

Cypress.Commands.add("visitBitfinexAndLogin", () => {
  cy.loginToBitfinexManually()
  cy.waitForPageToLoad()
})

function lookForSpinners() {
  return new Cypress.Promise((resolve, reject) => {
    // Poll for the presence of spinners
    setInterval(() => {
      let spinners = Cypress.$("i.fa-spin")
      if (spinners.length == 0) {
        resolve(0)
      }
    }, 1000)

    setTimeout(() => {
      resolve(-1)
    }, 10000)
  })
}

Cypress.Commands.add("waitForPageToLoad", () => {
  // Give the page upto 60 seconds to resolve loading before continuing (wait for all loading spinners to disappear)
  // cy.get("i.fa-spin", { timeout: 60000 }).should("be.at.least", 1)
  cy.get("#interface").should("be.visible")

  /*cy.wrap(null).then(() => {
    return lookForSpinners().then(s => {
      if (s == -1) {
        cy.visitBitfinexAndLogin()
      }
    })
  })*/
})


Cypress.Commands.add("visitWithCloudFlareBypass", (route) => {
  cy.fixture("sensitive/credentials.json").then((credentials) => {
    const headers = {
      "CF-Access-Client-Id": credentials.cloudflare_id,
      "CF-Access-Client-Secret": credentials.cloudflare_secret,
    };
    cy.visit(route, { headers: headers });
  });
});
import 'cypress-wait-until';
