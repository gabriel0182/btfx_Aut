class sellScaled {
  requiredFields() {
    const distribution = cy.get("#radio-upwards > .circle");
    distribution.click();
    const action = cy.get("#radio-sell > .circle");
    action.click();
    const submit = cy.get("#submitButton");
    submit.click();
    const priceLower = cy
      .get(".order-errors")
      .get(".order-errors__wrapper")
      .get("li");
    priceLower.should("contain", "Price lower USD is required");
    const priceUpper = cy
      .get(".order-errors")
      .get(".order-errors__wrapper")
      .get("li");
    priceUpper.should("contain", "Price upper USD is required");
    const btc = cy.get(".order-errors").get(".order-errors__wrapper").get("li");
    btc.should("contain", "Amount BTC must be a number");
    const orderCount = cy
      .get(".order-errors")
      .get(".order-errors__wrapper")
      .get("li");
    orderCount.should("contain", "Order count is required");
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        orderCount: testDataRow.orderCount,
        amountVariance: testDataRow.amountVariance,
        priceVariance: testDataRow.priceVariance,
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
        cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').then(($btn) => {
          const txt1 = $btn.text();
          cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').then(($btn) => {
            const txt2 = $btn.text();
            var pointNum = parseInt(txt2);
            var amout = pointNum * 1030;
            const lowerUSD = cy.get("#priceinput3");
            lowerUSD.type(txt1);
            const upperUSD = cy.get("#priceinput4");
            upperUSD.type(amout);
            const amountBTC = cy.get("#amountinput5");
            amountBTC.type(data.btc);
            const count = cy.get(
              ":nth-child(4) > :nth-child(2) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input"
            );
            count.type(data.orderCount);
            const variance1 = cy.get(
              ":nth-child(5) > :nth-child(1) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input"
            );
            variance1.type(data.amountVariance);
            const variance2 = cy.get(
              ":nth-child(5) > :nth-child(2) > .orderform__field > .ui-labeledinput__container > div > .ui-labeledinput__input"
            );
            variance2.type(data.priceVariance);
            const orderFrom = cy
              .get("#form-choose-exchange")
              .contains(data.wallet1);
            orderFrom.click();
          });
        });
      });
    });
    return this;
  }
  submitButton() {
    const distribution = cy.get("#radio-upwards > .circle");
    distribution.click();
    const action = cy.get("#radio-sell > .circle");
    action.click();
    const submit = cy.get("#submitButton");
    submit.click();
    return this;
  }
  successMsg() {
    const msg = cy.waitUntil(() =>
      cy.get(".notification-text__text").should("be.visible")
    );
    const verifyMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", `Created exchange limit sell order of`)
    );
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
  cancelOrder() {
    const msg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("be.visible")
        .get("div.notification__skip")
        .click()
    );
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
        const msgCancel = cy.waitUntil(() =>
          cy.get(".notification-text__text").should("be.visible")
        );
        const verifyMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("contain", `has been canceled`)
        );
      });
    return this;
  }
  cleanFilters() {
    const filter = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .ui-contextmenu__wrapper > .btn'
    );
    filter.click();
    const reset = cy.get(".filter-select__reset-btn");
    reset.click();
    const selectAll = cy.get('[style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(1) > .ui-button')
    .get('[style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(1) > .ui-button > .fa')
    .click()
    .get('.table-vir__header > [style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(2) > .ui-button')
    .get('.table-vir__header > [style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(2) > .ui-button > .fa')
    .click()
    .get('.ui-modaldialog__footer')
    .get('.ui-button--green')
    .click()
    return this;
  }
}
export default sellScaled;
