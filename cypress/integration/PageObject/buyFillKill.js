
class buyFillKill{
    trading() {
        const tradingTab = cy.waitUntil(() =>
          cy
            .get(".header__nav-buttons-wrapper > .header__nav-trading")
            .should("be.visible")
            .click({ force: true })
        )
        return this;
      }
      orderInfo() {
        const testData = require("../../fixtures/orders.json");
        testData.forEach((testDataRow) => {
          const data = {
            wallet1: testDataRow.wallet1,
            type5: testDataRow.type5,
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
              .click({ force: true }).wait(2000)
            .get('ul.dropdown-content',{force:true})
              .within(()=>{
                cy.get('#orderFormDropdownItem_fillorkill')
              .contains(data.type5)
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
      buyButton() {
        const exchangeBuy = cy.get("#buyButton").contains("Exchange Buy");
        exchangeBuy.click({ force: true });
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
                  `Exchange fok buy order of ${data.btc} BTC has been fully executed`
                )
            );
          });
        });
        return this;
      }

}
export default buyFillKill;