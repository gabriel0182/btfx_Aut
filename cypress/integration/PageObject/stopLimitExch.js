class stopLimitExch {
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
    const buy = cy.get("#buyButton");
    buy.click({ force: true });
    const limitPrice = cy
      .get(".order-errors")
      .get(".order-errors__wrapper > :nth-child(1)");
      limitPrice.should("contain", "Limit price USD must be a number");
    const btc = cy
      .get(".order-errors")
      .get('.order-errors__wrapper > :nth-child(3)')
    btc.should("contain", "Amount BTC must be a number");
    const priceUSD = cy
      .get(".order-errors")
      .get('.order-errors__wrapper > :nth-child(2)')
      priceUSD.should("contain", "Price USD must be a number");
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
        cy.get("#orderFormDropdownItem_stoplimit")
          .get(
            '[data-qa-id="order-form__order-type-dropdown-menu-item-stoplimit"]'
          )
          .click({ force: true });
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click({ force: true });
    const TIF = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    TIF.should("be.visible");
    const hidden = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    hidden.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click({ force: true });
    const TIFMargin = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    TIFMargin.should("be.visible");
    const hiddenMargin = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    hiddenMargin.should("be.visible");
    const reduceOnlyMargin = cy.get(
      ":nth-child(3) > .ui-labeledcheckbox__container > label"
    );
    reduceOnlyMargin.should("be.visible");
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
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
        cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1115;
          var value = amout + 100;
          var value2 = amout + 20;
          const priceUSD = cy.get('[name="price"]').type(txt);
          localStorage.setItem("price", value);
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click({ force: true });
        orderForm.wait(2000);
        const limitUSD = cy
          .get(".orderform > :nth-child(4)")
          .get("#priceinput5");
        limitUSD.click({ force: true });
        limitUSD.type(value2);
      });
    })
    });
    return this;
  }
  buyButton() {
    const exchangeBuy = cy.get("#buyButton");
    exchangeBuy.click({ force: true });
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
              `Created exchange stop limit buy order of ${data.btc} BTC`
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
                  `Exchange stop limit buy order of ${data.btc} BTC has been canceled`
                )
            );
          });
        });
      });
    return this;
  }
}
export default stopLimitExch;
