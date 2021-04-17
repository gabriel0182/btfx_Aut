class limitSellExch {
  trading() {
    const tradingTab = cy.waitUntil(() =>
      cy
        .get(".header__nav-buttons-wrapper > .header__nav-trading")
        .should("be.visible")
        .click({ force: true })
        .get('.balances-overview-wrap')
        .should("be.visible")
    )
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        type2: testDataRow.type2,
        limitprice2: testDataRow.limitprice2,
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
        cy.get('#orderform-panel').should('be.visible').should('exist')
        )
        const orderType = cy.waitUntil(() =>
        cy.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
        .should('be.visible').scrollIntoView()
          .click({ force: true }).wait(2000)
        .get('ul.dropdown-content',{force:true})
          .within(()=>{
            cy.get('#orderFormDropdownItem_limit')
          .contains(data.type2)
          .click({ force: true })
          })
        )
        const priceUSD = cy.get('[name="price"]');
        priceUSD.type(data.limitprice2);
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click({ force: true });
      });
    });
    return this;
  }
  buyButton() {
    const exchangeBuy = cy.get("#sellButton").contains("Exchange Sell");
    exchangeBuy.click({ force: true });
    return this;
  }
  successMsg() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        limitprice2: testDataRow.limitprice2,
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.limitprice2}`, () => {
        const msg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("be.visible")
            .should(
              "contain",
              `Created exchange limit sell order of ${data.btc} BTC  at  ${data.limitprice2} USD`
            )
        );
      });
    });
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
        })
      })
    return this;
  }
}

export default limitSellExch;
