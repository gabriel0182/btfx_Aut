class buyScaled {
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
    const submit = cy.get("#submitButton");
    submit.click({ force: true });
    const orderDirection = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    orderDirection.should("contain", "Order direction (buy/sell) not selected");
    const priceLower = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    priceLower.should("contain", "Price lower USD is required");
    const priceUpper = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    priceUpper.should("contain", "Price upper USD is required");
    const btc = cy.get(".order-errors")
    .get('.order-errors__wrapper')
    .get('li')
      btc.should('contain','Amount BTC must be a number')
    const orderCount = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    orderCount.should("contain", "Order count is required");
    return this;
  }
  verifyFields() {
    const orderType = cy.waitUntil(() =>
      cy
        .get(
          ":nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
        )
        .click({ force: true })
        .get("ul.dropdown-content", { force: true })
    );
    const selectOrder = cy.waitUntil(() =>
      cy.get("ul.dropdown-content", { force: true }).within(() => {
        cy.get("#orderFormDropdownItem_scaled")
          .get(
            '[data-qa-id="order-form__order-type-dropdown-menu-item-scaled"]'
          )
          .click({ force: true });
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click({ force: true });
    const hidden = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    hidden.should("be.visible");
    const postOnly = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    postOnly.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click({ force: true });
    const hiddenMargin = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    hiddenMargin.should("be.visible");
    const reduceOnlyMargin = cy.get(
      ":nth-child(3) > .ui-labeledcheckbox__container > label"
    );
    reduceOnlyMargin.should("be.visible");
    const postOnlyMargin = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    postOnlyMargin.should("be.visible");
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
          .click({ force: true })
          .get('[id="Item_USD"]')
          .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
          .click({ force: true });
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click({ force: true });
        //Read the current BTC/USD price
        cy.get(".main-ticker__items > :nth-child(5) > :nth-child(2)").then(
          ($btn) => {
            const txt1 = $btn.text();
            cy.get(".main-ticker__items > :nth-child(6) > :nth-child(2)").then(
              ($btn) => {
                const txt2 = $btn.text();
                /*var pointNum = parseInt(txt);
          var amout = pointNum * 1090;
          var value = amout + 100;
          localStorage.setItem("price", value);*/
                const lowerUSD = cy.get("#priceinput3");
                lowerUSD.type(txt1);
                const uperUSD = cy.get("#priceinput4");
                uperUSD.type(txt2);
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
                orderFrom.click({ force: true });
              }
            );
          }
        );
      });
    });
    return this;
  }
  submitButton() {
    const action = cy.get("#radio-buy > .circle");
    action.click({ force: true });
    const submit = cy.get("#submitButton");
    submit.click({ force: true });
    return this;
  }
  successMsg() {
    const msg = cy.waitUntil(() =>
      cy.get(".notification-text__text").should("be.visible")
    );
    const verifyMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", `Created exchange limit buy order of`)
        .wait(2000)
    );
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
      '[data-qa-id="orders-filter-side-buy"] > .filter-select__selection-label'
    );
    side.click({ force: true });
    const apply = cy.get(".filter-select__actions > .ui-button");
    apply.click({ force: true });
    const appliedType = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-type-exchange"] > .filter-select__selection-label'
    );
    appliedType.should("contain", "Exchange");
    const appliedSide = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-side-buy"] > .filter-select__selection-label'
    );
    appliedSide.should("contain", "Bids");
    return this;
  }
  cancelOrder() {
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
}
export default buyScaled;
