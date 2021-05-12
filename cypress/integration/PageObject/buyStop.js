class buyStop {
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
        cy.get("#orderFormDropdownItem_stop")
          .get('[data-qa-id="order-form__order-type-dropdown-menu-item-stop"]')
          .click();
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click();
    const TIF = cy.get(
      ".orderform__field > .ui-labeledcheckbox__container > label"
    );
    TIF.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click();
    const TIFMargin = cy.get(
      ".orderform__field > .ui-labeledcheckbox__container > label"
    );
    TIFMargin.should("be.visible");
    const reduceOnlyMargin = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    reduceOnlyMargin.should("be.visible");
    return this;
  }
  requiredFields() {
    const buy = cy.get("#buyButton");
    buy.click();
    const price = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    price.should("contain", "Stop price USD must be a number");
    const btc = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    btc.should("contain", "Amount BTC must be a number");
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
        cy.get(":nth-child(2) > h5 > span").then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1120;
          var value = amout + 100;
          const priceUSD = cy.get('[name="price"]').type(value);
        });
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click();
        orderForm.wait(3000);
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
      context(`Generating a test for ${data.price}`, () => {
        const msg = cy.waitUntil(() => cy.get(".notification-text__text"));
        const validateMsg = cy.waitUntil(() =>
          cy.get(".notification-text__text").should("be.visible")
        );
        const verifyMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should(
              "contain",
              `Created exchange stop buy order of ${data.btc} BTC`
            )
        );
      });
    });
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
                  `Exchange stop buy order of ${data.btc} BTC has been canceled`
                )
            );
          });
        });
      });
    return this;
  }
}

export default buyStop;
