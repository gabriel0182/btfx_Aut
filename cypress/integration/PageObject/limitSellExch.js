class limitSellExch {
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
    const price = cy
      .get(".order-errors")
      .get(".order-errors__wrapper")
      .get("li");
    price.should("contain", "Price USD must be a number");
    const btc = cy.get(".order-errors").get(".order-errors__wrapper").get("li");
    btc.should("contain", "Amount BTC must be a number");
    return this;
  }
  validateMin() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        min: testDataRow.min,
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const searchTicker = cy.get("#ticker-search-input");
        searchTicker.type(`${data.ticker}{enter}`);
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click({ force: true });
        cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            const priceUSD = cy.get('[name="price"]').type(txt);
          }
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.min);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click();
      });
    });
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click();
    const validateMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", `Invalid order: minimum size for BTC/USD`)
    );
    return this;
  }
  validateMax() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        max: testDataRow.max,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            const priceUSD = cy
              .get("#priceinput1")
              .clear({ force: true })
              .type(txt);
          }
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear().type(data.max);
      });
    });
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click();
    const validateMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", `Invalid order: maximum size for BTC/USD`)
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
        cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            const priceUSD = cy
              .get("#priceinput1")
              .clear({ force: true })
              .type(txt);
          }
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear().type(data.btc).wait(2000);
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
      context(`Generating a test for ${data.limitprice2}`, () => {
        const msg = cy.waitUntil(() =>
          cy.get(".notification-text__text").should("be.visible")
        );
        const validateMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should(
              "contain",
              `Created exchange limit sell order of ${data.btc} BTC`
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
    const type = cy.get(
      '[data-qa-id="orders-filter-type-exchange"] > .filter-select__selection-label'
    );
    type.click();
    const side = cy.get(
      '[data-qa-id="orders-filter-side-sell"] > .filter-select__selection-label'
    );
    side.click();
    const apply = cy.get(".filter-select__actions > .ui-button");
    apply.click();
    const appliedType = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-type-exchange"] > .filter-select__selection-label'
    );
    appliedType.should("contain", "Exchange");
    const appliedSide = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-side-sell"] > .filter-select__selection-label'
    );
    appliedSide.should("contain", "Asks");
    return this;
  }
  cancelSellOrder() {
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
      });
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.btc}`, () => {
        const msgCancel = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("be.visible")
            .should(
              "contain",
              `Exchange limit sell order of ${data.btc} BTC has been canceled`
            )
        );
      });
    });
    return this;
  }
}

export default limitSellExch;
