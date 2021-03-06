class sellFillKill {
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
        type4: testDataRow.type4,
        price: testDataRow.price,
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
        cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').first().then(($btn) => {
          let txt = $btn.text()
          localStorage.setItem("price", txt);
          const distanceUSD = cy.get('[name="price"]');
          distanceUSD.type(`${txt}`)
          const amountBTC = cy.get('[name="amount"]');
          amountBTC.type(data.btc)
          const orderFrom = cy
            .get("#form-choose-exchange")
            .contains(data.wallet1);
          orderFrom.click({ force: true }).wait(5000);
        });
      });
    });
    return this;
  }
  sellButton() {
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click({ force: true })
    /* abovealert = cy.get('.ui-modaldialog__container')
        .get('.ui-modaldialog__footer')
        .get('.ui-modaldialog__footer > .ui-button--green')
        abovealert.click({ force: true });*/
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
              `Exchange fok sell order of ${data.btc} BTC has been fully executed`
            )
        );
      });
    });
    return this;
  }
}

export default sellFillKill;
