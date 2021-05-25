class stopLimitExch {
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
    const buy = cy.get("#buyButton");
    buy.click();
    const limitPrice = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
      limitPrice.should("contain", "Limit price USD must be a number");
    const btc = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
    btc.should("contain", "Amount BTC must be a number");
    const priceUSD = cy
      .get(".order-errors")
      .get('.order-errors__wrapper')
    .get('li')
      priceUSD.should("contain", "Price USD must be a number");
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
        cy.get("#orderFormDropdownItem_stoplimit")
          .get(
            '[data-qa-id="order-form__order-type-dropdown-menu-item-stoplimit"]'
          )
          .click();
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click();
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
    marginWallet.click();
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
        const selectTicker = cy.get('div.virtable__cellwrapper--rightalign')
        .within(()=>{
          cy.get('[href="/t/BTC:USD"]')
          .click()
        })
        cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1115;
          var value = amout + 100;
          var value2 = amout + 20;
          const priceUSD = cy.get('[name="price"]').type(txt);
          const limitUSD = cy
          .get(".orderform > :nth-child(4)")
          .get("#priceinput5");
        limitUSD.clear({force:true});
        limitUSD.type(value2);
        })
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.min);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click();
      });
    });
    const exchangeBuy = cy.get("#buyButton");
    exchangeBuy.click();
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
      context(`Generating a test for ${data.max}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1115;
          var value = amout + 100;
          var value2 = amout + 20;
          const priceUSD = cy.get('[name="price"]').clear({force:true})
          .type(txt);
          const limitUSD = cy
          .get(".orderform > :nth-child(4)")
          .get("#priceinput5");
        limitUSD.clear({force:true});
        limitUSD.type(value2);
        })
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear()
        .type(data.max);
      })
    })
    const exchangeBuy = cy.get("#buyButton");
    exchangeBuy.click();
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
        //Read the current BTC/USD price
        cy.get('.main-ticker__items > :nth-child(6) > :nth-child(2)').then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1115;
          var value = amout + 100;
          var value2 = amout + 20;
          const priceUSD = cy.get('[name="price"]').clear({force:true})
          .type(txt);
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear({force:true})
        .type(data.btc);
        const limitUSD = cy
          .get(".orderform > :nth-child(4)")
          .get("#priceinput5");
        limitUSD.clear({force:true});
        limitUSD.type(value2);
        const hidden = cy.get('.orderform__options')
        .get('.orderform__options > :nth-child(1) > .ui-labeledcheckbox__container > label')
        hidden.click()
      });
    })
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
  validateHidden(){
    const ordersTable = cy
    .get('[data-qa-id="orders-table"]')
    .get("div")
    .first()
    .each(($div) => {
      cy.get(
        '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
      )
      cy.get('[style="flex: 1 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY')
      .get('._3dKqlccyvmhGBRePnFboTW > svg')
        .should("be.visible");
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
