class buyStopTIF {
  trading() {
    const tradingTab = cy.waitUntil(() =>
      cy
        .get(".header__nav-buttons-wrapper > .header__nav-trading")
        .should("be.visible")
        .click({ force: true })
    )
    const waitForTable = cy.waitUntil(() =>
    cy.get('#chart-header > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
    .should("be.visible")
    )
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
        wallet2: testDataRow.wallet2,
        type1: testDataRow.type1,
        price: testDataRow.price,
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.wallet2}`, () => {
        const orderType = cy.waitUntil(() =>
        cy.get(':nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap')
        .should('be.visible').scrollIntoView()
          .click({ force: true })
        .get('ul.dropdown-content',{force:true})
          .within(()=>{
            cy.get('#orderFormDropdownItem_stop')
          .contains(data.type1)
          .click({ force: true })
          })
        )
        const orderFrom = cy
          .get("#form-choose-margin > span")
          .contains(data.wallet2);
        orderFrom.click({ force: true });
        const addTIF = cy
          .get(".orderform__options")
          .get(".orderform__field > .ui-labeledcheckbox__container > label")
          .get('[data-qa-id="tif-checkbox-label"]')
          .click({ force: true });
        const priceUSD = cy.get('[name="price"]');
        priceUSD.type(data.price);
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
      cy.get("#buyButton").contains("Margin Buy").click({ force: true })
    );
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
              `Created margin stop buy order of ${data.btc} BTC  at  ${data.price} USD`
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
