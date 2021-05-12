import { should } from "chai";

class buyLimitExch {
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
  verifyFields() {
    const orderType = cy.waitUntil(() =>
      cy
        .get(
          ":nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
        )
        .click()
        .get("ul.dropdown-content")
    );
    const selectOrder = cy.waitUntil(() =>
      cy.get("ul.dropdown-content").within(() => {
        cy.get("#orderFormDropdownItem_limit")
          .get('[data-qa-id="order-form__order-type-dropdown-menu-item-limit"]')
          .click();
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click();
    const OCO = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    OCO.should("be.visible");
    const hidden = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    hidden.should("be.visible");
    const postOnly = cy.get(
      ":nth-child(3) > .ui-labeledcheckbox__container > label"
    );
    postOnly.should("be.visible");
    const TIF = cy.get(
      ":nth-child(4) > .ui-labeledcheckbox__container > label"
    );
    TIF.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click();
    const OCOMargin = cy.get(
      ".orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label"
    );
    OCOMargin.should("be.visible");
    const hiddenMargin = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    hiddenMargin.should("be.visible");
    const postOnlyMargin = cy.get(
      ":nth-child(3) > .ui-labeledcheckbox__container > label"
    );
    postOnlyMargin.should("be.visible");
    const TIFMargin = cy.get(
      ":nth-child(4) > .ui-labeledcheckbox__container > label"
    );
    TIFMargin.should("be.visible");
    const reduceOnlyMargin = cy
      .get(":nth-child(5) > .ui-labeledcheckbox__container > label")
      .get(
        ":nth-child(5) > .ui-labeledcheckbox__container > label > .ui-fieldlabel__container > .ui-fieldlabel__innertag > .trigger"
      );
    reduceOnlyMargin.should("be.visible");
    return this;
  }
  requiredFields(){
    const buy = cy.get("#buyButton");
    buy.click({ force: true });
    const price = cy.get('.order-errors')
    .get('.order-errors__wrapper > :nth-child(1)')
    price.should('contain','Price USD must be a number')
    const btc = cy.get('.order-errors')
    .get('.order-errors__wrapper > :nth-child(2)')
    btc.should('contain','Amount BTC must be a number')
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
        cy.get(".main-ticker__items > :nth-child(5) > :nth-child(2)").then(
          ($btn) => {
            const txt = $btn.text();
            const priceUSD = cy.get('[name="price"]').type(txt);
          }
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click();
        orderForm.wait(2000);
      });
    });
    return this;
  }

  buyButton() {
    const exchangeBuy = cy.get("#buyButton");
    exchangeBuy.click();
    return this;
  }
  successMsg() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.limitprice}`, () => {
        const msg = cy.waitUntil(() =>
          cy.get(".notification-text__text").should("be.visible")
        );
        const validateMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should(
              "contain",
              `Created exchange limit buy order of ${data.btc} BTC`
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
      '[data-qa-id="orders-filter-side-buy"] > .filter-select__selection-label'
    );
    side.click();
    const apply = cy.get(".filter-select__actions > .ui-button");
    apply.click();
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
              `Exchange limit buy order of ${data.btc} BTC has been canceled`
            )
        );
      });
    });
    return this;
  }
}

export default buyLimitExch;
