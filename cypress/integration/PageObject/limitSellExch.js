class limitSellExch {
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
  requiredFields() {
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click({ force: true });
    const price = cy
      .get(".order-errors")
      .get(".order-errors__wrapper > :nth-child(1)");
    price.should("contain", "Price USD must be a number");
    const btc = cy
      .get(".order-errors")
      .get(".order-errors__wrapper > :nth-child(2)");
    btc.should("contain", "Amount BTC must be a number");
    return this;
  }

  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        btc: testDataRow.btc,
        ticker: testDataRow.ticker
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const searchTicker = cy.get('#ticker-search-input')
        searchTicker.type(`${data.ticker}{enter}`)
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click({ force: true });
        //Read the current BTC/USD price
        cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            var pointNum = parseInt(txt);
            var amout = pointNum * 1020;
            var value = amout + 100;
            const priceUSD = cy.get('[name="price"]').type(txt);
            localStorage.setItem("price", value);
          }
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click({ force: true });
        orderForm.wait(2000);
      });
    });
    return this;
  }
  sellButton() {
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click({ force: true });
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
    filter.click({ force: true });
    const type = cy.get(
      '[data-qa-id="orders-filter-type-exchange"] > .filter-select__selection-label'
    );
    type.click({ force: true });
    const side = cy.get(
      '[data-qa-id="orders-filter-side-sell"] > .filter-select__selection-label'
    );
    side.click({ force: true });
    const apply = cy.get(".filter-select__actions > .ui-button");
    apply.click({ force: true });
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
      .first("div")
      .each(($div) => {
        cy.get(
          '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
        )
          .get(
            '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"] > [style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(3) > .ui-button > .fa'
          )
          .click({ force: true });
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
