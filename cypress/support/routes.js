Cypress.Commands.add("mockSettingsResponse", (settingsFixture) => {
    cy.fixture("url.json").then((f) => {
        cy.fixture("trading/settings.json").then((s) => {
            cy.server()
            cy.route("POST", f.settingsUrl, settingsFixture ? settingsFixture : s)
        })
    })
})

Cypress.Commands.add("mockMarginAndFuturesConfigResponse", (marginAndFuturesConfigFixture) => {
    cy.fixture("url.json").then((f) => {
        cy.server()
        cy.route(f.marginAndFuturesConfigUrl, marginAndFuturesConfigFixture ? marginAndFuturesConfigFixture : "fx:margin_futures_config.json")
    })
})

Cypress.Commands.add("mockHomepageTickers", (tickersFixture) => {
    cy.fixture("url.json").then((f) => {
        cy.server()
        cy.route(f.tickerUrl, tickersFixture ? tickersFixture : "fx:homepage/tickers.json")
    })
})

Cypress.Commands.add("mockTradingTickers", (tickersFixture) => {
    cy.fixture("url.json").then((f) => {
        cy.server()
        cy.route(f.tickerUrl, tickersFixture ? tickersFixture : "fx:trading/tickers.json")
    })
})

Cypress.Commands.add("stubTradingAndFunding", () => {
    cy.server()
    cy.route("/f/*", [])
    cy.route("/t/*", [])
})

Cypress.Commands.add("stubSaveSettings", () => {
    cy.server()
    cy.route("POST", "/v2/auth/w/settings/set", [1])
})

Cypress.Commands.add("stubHistory", () => {
    cy.server()
    cy.route("POST", "/v2/auth/r/trades/*/hist", [])
})

// This will prevent the web sockets from connecting - useful for testing loading states
Cypress.Commands.add("stubSockets", () => {
    cy.server()
    cy.route("GET", "/_ws_token", [])
})

Cypress.Commands.add("mockAccountBootstrap", (AccountBootstrapFixture) => {
    cy.server()
    cy.route("GET", "/account/_bootstrap", AccountBootstrapFixture ? AccountBootstrapFixture : "fx:trading/account_bootstrap.json")
})