class sellStop {
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
    const Sell = cy.get("#sellButton")
    Sell.click();
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
  validateMin() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        min: testDataRow.min,
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const searchTicker = cy.get("#ticker-search-input");
        searchTicker.type(`${data.ticker}{enter}`);
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
          cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').first()
        .then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          const priceUSD = cy.get('[name="price"]').clear({force:true})
          .type(txt);
        });
        selectTicker.click({ force: true });
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.min);
      });
    });
    const exchangeSell = cy.get("#sellButton")
    exchangeSell.click();
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
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        )
        cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').first()
        .then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          const priceUSD = cy.get('[name="price"]').clear({force:true})
          .type(txt);
        });
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear()
        .type(data.max);
      });
    });
    const exchangeSell = cy.get("#sellButton")
    exchangeSell.click();
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
        wallet1: testDataRow.wallet1,
        btc: testDataRow.btc,
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        cy.get('#book-bids > .book__rows > :nth-child(1) > :nth-child(4) > span').first()
        .then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          const priceUSD = cy.get('#priceinput3').clear({force:true})
          .type(txt);
        });
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear({force:true})
        .type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click();
        orderForm.wait(3000)
      });
    });
    return this;
  }
  sellButton() {
    const exchangeSell = cy.get("#sellButton")
    exchangeSell.click();
    return this;
  }
  successMsg() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.price2}`, () => {
        const msg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should('be.visible')
        )
            const verifyMsg = cy.waitUntil(() =>
            cy
              .get(".notification-text__text")
            .should(
              "contain",
              `Created exchange stop sell order of ${data.btc} BTC`
            )
        );
      });
    });
    return this;
  }
  cancelSellOrder() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.btc}`, () => {
        const ordersTable = cy.waitUntil(() =>
        cy
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
              .click()
          })
        )
        const msgCancel = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
             .should(
              "contain",
              `Exchange stop sell order of ${data.btc} BTC has been canceled`
            )
        );
      });
    });
    return this;
  }
}

export default sellStop;
