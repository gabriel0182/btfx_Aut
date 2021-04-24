class buyStopTIF {
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
  verifyFields() {
    const orderType = cy.waitUntil(() =>
    cy.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
          .click({ force: true })
          .get("ul.dropdown-content", { force: true })
    )
    const selectOrder  = cy.waitUntil(() =>
    cy.get("ul.dropdown-content", { force: true })
        .within(() => {
          cy
          .get("#orderFormDropdownItem_stop")
          .get('[data-qa-id="order-form__order-type-dropdown-menu-item-stop"]')
          //.contains('Stop')
          .click({ force: true });
        })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click({ force: true });
    const TIF = cy.get('.orderform__field > .ui-labeledcheckbox__container > label')
    TIF.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click({ force: true });
    const TIFMargin = cy.get('.orderform__field > .ui-labeledcheckbox__container > label')
    TIFMargin.should("be.visible");
    const reduceOnlyMargin = cy.get('.orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label')
    reduceOnlyMargin.should("be.visible");
    return this;
  }
  orderInfo() {
    let now = new Date();
    var year = now.getUTCFullYear();
    let month = ("0" + (now.getMonth() + 1)).slice(-2);
    var day = ("0" + (now.getDate() + 1)).slice(-2);
    var date = `${year}"-"${month}"-"${day}" ""03:00:30"`;
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.wallet2}`, () => {
        const orderForm = cy.waitUntil(() =>
        cy.get("#orderform-panel").should("be.visible").should("exist")
      );
      const selectTicker = cy
        .get('[class="custom-scrollbar"]')
        .get('[href="/t/BTC:USD"]')
        .last();
      selectTicker.click({ force: true })
      //Read the current BTC/USD price
      cy.get(":nth-child(2) > h5 > span").then(($btn) => {
        const txt = $btn.text();
        var pointNum = parseInt(txt);
        var amout = pointNum * 950;
        var value = amout + 100;
        const priceUSD = cy.get('[name="price"]').type(value);
        localStorage.setItem("price", value);
      });
        const addTIF = cy
          .get(".orderform__options")
          .get(".orderform__field > .ui-labeledcheckbox__container > label")
          .get('[data-qa-id="tif-checkbox-label"]')
          .click({ force: true });
        const TIFDate = cy.waitUntil(() =>
          cy
            .get(".react-datepicker__input-container > input")
            .should("be.visible")
            .type(`${date}`)
            .get('.react-datepicker').blur({ force: true })
        );
        const amountBTC = cy.get('[name="amount"]').click({force:true})
        amountBTC.type(data.btc);
      });
    });
    return this;
  }
  buyButton() {
    const exchangeBuy = cy.waitUntil(() =>
      cy.get("#buyButton").click({ force: true })
    );
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
          cy
            .get(".notification-text__text")
            .should("be.visible")
        )
        const verifyMsg = cy.waitUntil(() =>
            cy
              .get(".notification-text__text")
            .should(
              "contain",
              `Created margin stop buy order of ${data.btc} BTC`
            )
        );
      });
    });
    return this;
}
    verifyTIF(){
        const ordersTable = cy
        .get('[data-qa-id="orders-table"]')
        .get("div")
        .first("div")
        .each(($div) => {
          cy.get(
            '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
          )
          .get('[style="flex: 1 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > ._2prYApikgYf4Vw1y8YDuKB > .trigger > .fa')
          .get('[class="trigger ui-tooltip ui-tooltip--cursor-pointer"]').first()
          .trigger('mouseover')
          .get('[class="trigger ui-tooltip ui-tooltip--cursor-pointer"]').first().invoke('show')
          .should('be.visible')
        }) 
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
            const verifyMsg = cy.waitUntil(() =>
            cy
              .get(".notification-text__text")
                .should(
                  "contain",
                  `Margin stop buy order of ${data.btc} BTC has been canceled`
                )
            );
          });
        });
      });
    return this;
  }
}
export default buyStopTIF;
