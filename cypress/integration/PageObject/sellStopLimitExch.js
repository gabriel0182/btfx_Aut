
class sellStopLimitExch{
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
          wallet1: testDataRow.wallet1,
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
          //Read the current BTC/USD price
          cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').first()
          .then(($btn) => {
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
          orderForm.wait(5000);
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
      sellButton() {
        const exchangeSell = cy.get('#sellButton')
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
            )
            const validateMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
                .should(
                  "contain",
                  `Created exchange stop limit sell order of ${data.btc} BTC`
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
                )
                    const validateMsg = cy.waitUntil(() =>
                    cy
                      .get(".notification-text__text")   
                    .should(
                      "contain",
                      `Exchange stop limit sell order of ${data.btc} BTC has been canceled`
                    )
                );
              });
            });
          });
        return this;
      }
}
export default sellStopLimitExch;