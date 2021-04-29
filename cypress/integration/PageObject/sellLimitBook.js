class sellLimitBook {
  trading() {
    const tradingTab = cy.waitUntil(() =>
      cy
        .get(".header__nav-buttons-wrapper > .header__nav-trading")
        .should("be.visible")
        .click({ force: true })
        .get("#book-bids > .book__rows")
        .should("be.visible")
    );
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click({ force: true });
        const amountBTC = cy.get("#amountinput3");
        amountBTC.type(data.btc);
      });
    });
    return this;
  }
  selectField() {
    const bookTable = cy.waitUntil(() => {
      cy.get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
        .get("div")
        .first("div")
        .each(($div) => {
          cy.get("#book-bids > .book__rows > :nth-child(1) > .book__row")
            .get(
              "#book-bids > .book__rows > :nth-child(1) > .book__row > :nth-child(4) > span"
            )
            .click({ force: true });
        });
      return this;
    });
  }
  successMsg() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.price}`, () => {
        const msg = cy.waitUntil(() =>
          cy.get(".notification-text__text").should("be.visible")
        );
        const verifyMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should(
              "contain",
              `Exchange limit sell order of ${data.btc} BTC has been fully executed`
            )
        );
      });
    });
    return this;
  }
}
export default sellLimitBook;
