class trailingStopSellExch {
  trading() {
    const tradingTab = cy.waitUntil(() =>
      cy
        .get(".header__nav-buttons-wrapper > .header__nav-trading")
        .should("be.visible")
        .click({ force: true })
       .get('.grid-layout__component-wrapper-orderHistory > .grid-layout__component > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
        .should("be.visible")
    );
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
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
        cy.get('#orderform-panel').should('be.visible').should('exist')
        )
        const orderType = cy.waitUntil(() =>
        cy.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
        .should('be.visible').scrollIntoView()
          .click({ force: true })
        .get('ul.dropdown-content',{force:true})
          .within(()=>{
            cy.get('#orderFormDropdownItem_trailingstop')
          .contains(data.type4)
          .click({ force: true })
          })
        )
        const distanceUSD = cy.get('[name="price"]');
        distanceUSD.type(data.price);
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
  sellButton() {
    const exchangeSell = cy.get('#sellButton').contains("Exchange Sell");
    exchangeSell.click({ force: true });
    return this;
  }
  successMsg() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        price: testDataRow.price,
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.price}`, () => {
        const msg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("be.visible")
            .should(
              "contain",
              `Created exchange trailing stop sell order of ${data.btc} BTC`
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
              cy
                .get(".notification-text__text")
                .should("be.visible")
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
