
class sellMarket{
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
          const selectTicker = cy
            .get('[class="custom-scrollbar"]')
            .get('[href="/t/BTC:USD"]')
            .last();
          selectTicker.click({ force: true });
          const amountBTC = cy.get('[name="amount"]');
            amountBTC.type(data.btc).wait(5000)
          })
          });
        return this;
          }
          sellButton() {
            const exchangeBuy = cy.get('#sellButton')
            exchangeBuy.click({ force: true });
          }
          successMsg() {
            const testData = require("../../fixtures/orders.json");
            testData.forEach((testDataRow) => {
              const data = {
                btc: testDataRow.btc,
              };
              context(`Generating a test for ${data.price}`, () => {
                const msg = cy.waitUntil(() =>
                  cy
                    .get(".notification-text__text")
                    .should("be.visible")
                )
                const verifyMsg = cy.waitUntil(() =>
              cy
                .get(".notification-text__text")
                    .should(
                      "contain",
                      `Margin market sell order of ${data.btc} BTC has been fully executed`
                    )
                );
              });
            });
            return this;
          }
          cancelPosition() {
            const testData = require("../../fixtures/orders.json");
            testData.forEach((testDataRow) => {
              const data = {
                btc: testDataRow.btc,
              };
              context(`Generating a test for ${data.amount}`, () => {
                const positionsTable = cy
                  .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
                  .get("div")
                  .first("div")
                  .each(($div) => {
                    cy.get(
                      '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button'
                    );
                    cy.get(
                      '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button > .fa'
                    ).click({ force: true });
                  });
                const confirm = cy
                  .get(".ui-modaldialog__footer")
                  .get(".ui-modaldialog__footer > .ui-button--green");
                confirm.click({ force: true });
                const msgCancel = cy.waitUntil(() =>
                  cy
                    .get(".notification-text__text")
                    .should("be.visible")
                    .should(
                      "contain",
                      `Margin market buy order of ${data.btc} BTC has been fully executed`
                    )
                );
              });
            });
            return this;
          }
}
export default sellMarket;