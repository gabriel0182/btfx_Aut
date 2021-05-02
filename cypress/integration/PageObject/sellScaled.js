class sellScaled {
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        orderCount: testDataRow.orderCount,
        amountVariance: testDataRow.amountVariance,
        priceVariance: testDataRow.priceVariance,
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
                const lowerUSD = cy.get('#priceinput3')
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
                orderFrom.click({ force: true });;
              }
            );
          }
        );
      });
    });
    return this;
  }
  submitButton() {
    const distribution = cy.get('#radio-upwards > .circle')
    distribution.click({force:true})
    const action = cy.get('#radio-sell > .circle')
    action.click({force:true})
    const submit = cy.get('#submitButton')
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
            .should(
              "contain",
              `Created exchange limit sell order of`
            ).wait(5000)
        );
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
                .should(
                  "contain",
                  `has been canceled`
                )
            );
          });
    return this;
  }
}
export default sellScaled;
