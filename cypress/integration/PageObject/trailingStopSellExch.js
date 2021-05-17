class trailingStopSellExch {
  trading() {
    const tradingTab = cy.waitUntil(() =>
      cy
        .get(".header__nav-buttons-wrapper > .header__nav-trading")
        .should("be.visible")
        .click()
        .get("#book-bids > .book__rows")
        .should("be.visible")
    );
    return this;
  }
  requiredFields() {
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click();
    const distance = cy
      .get(".order-errors")
      .get(".order-errors__wrapper")
      .get("li");
    distance.should("contain", "Distance USD must be a number");
    const btc = cy.get(".order-errors").get(".order-errors__wrapper").get("li");
    btc.should("contain", "Amount BTC must be a number");
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        type4: testDataRow.type4,
        price: testDataRow.price,
        btc: testDataRow.btc,
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const searchTicker = cy.get("#ticker-search-input");
        searchTicker.type(`${data.ticker}{enter}`);
        const currency = cy
          .get(
            ":nth-child(2) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
          )
          .click()
          .get('[id="Item_USD"]')
          .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
          .click();
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click();
        //Read the current BTC/USD price
        cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            const distanceUSD = cy.get('[name="price"]');
            distanceUSD.type(txt);
            const amountBTC = cy.get('[name="amount"]');
            amountBTC.type(data.btc);
            const orderFrom = cy
              .get("#form-choose-exchange")
              .contains(data.wallet1);
            orderFrom.click().wait(2000);
          }
        );
      });
    });
    return this;
  }
  sellButton() {
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click();
    return this;
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
              `Created exchange trailing stop sell order of ${data.btc} BTC`
            )
        );
      });
    });
    return this;
  }
  orderFilter() {
    const filter = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .ui-contextmenu__wrapper > .btn'
    );
    filter.click();
    const reset = cy.get(".filter-select__reset-btn");
    reset.click();
    return this;
  }
  cancelOrder() {
    const ordersTable = cy
      .get('[data-qa-id="orders-table"]')
      .get("div")
      .first()
      .each(($div) => {
        cy.get(
          '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
        )
          .get(
            '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"] > [style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(3) > .ui-button > .fa'
          )
          .click();
        const testData = require("../../fixtures/orders.json");
        testData.forEach((testDataRow) => {
          const data = {
            btc: testDataRow.btc,
          };
          context(`Generating a test for ${data.btc}`, () => {
            const msgCancel = cy.waitUntil(() =>
              cy.get(".notification-text__text").should("be.visible")
            );
            const verifyMsg = cy.waitUntil(() =>
              cy
                .get(".notification-text__text")
                .should(
                  "contain",
                  `Exchange trailing stop sell order of ${data.btc} BTC has been canceled`
                )
            );
          });
        });
      });
    return this;
  }
}
export default trailingStopSellExch;
