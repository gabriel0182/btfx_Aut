class buyStopTIF {
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
  verifyFields() {
    const orderType = cy.waitUntil(() =>
      cy
        .get(
          ":nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
        )
        .click()
        .get("ul.dropdown-content")
    );
    const selectOrder = cy.waitUntil(() =>
      cy.get("ul.dropdown-content").within(() => {
        cy.get("#orderFormDropdownItem_stop")
          .get('[data-qa-id="order-form__order-type-dropdown-menu-item-stop"]')
          .click();
      })
    );
    const wallet = cy
      .get("#form-choose-exchange")
      .get("#form-choose-exchange > span")
      .click();
    const TIF = cy.get(
      ".orderform__field > .ui-labeledcheckbox__container > label"
    );
    TIF.should("be.visible");
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click();
    const TIFMargin = cy.get(
      ".orderform__field > .ui-labeledcheckbox__container > label"
    );
    TIFMargin.should("be.visible");
    const reduceOnlyMargin = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
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
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet2}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const searchTicker = cy.get("#ticker-search-input");
        searchTicker.type(`${data.ticker}{enter}`);
        const currency = cy
          .get(
            ":nth-child(2) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
          )
          .click()
          .get('[id="Item_USD"]')
          .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
          .click();
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click();
        //Read the current BTC/USD price
        cy.get(":nth-child(2) > h5 > span").then(($btn) => {
          const txt = $btn.text();
          var pointNum = parseInt(txt);
          var amout = pointNum * 1160;
          var value = amout + 100;
          const priceUSD = cy.get('[name="price"]').type(value);
        });
        const addTIF = cy
          .get(".orderform__options")
          .get(".orderform__field > .ui-labeledcheckbox__container > label")
          .get('[data-qa-id="tif-checkbox-label"]')
          .click();
        const TIFDate = cy.waitUntil(() =>
          cy
            .get(".react-datepicker__input-container > input")
            .should("be.visible")
            .type(`${date}`)
            .get(".react-datepicker")
            .blur({force:true})
        );
        const amountBTC = cy.get('[name="amount"]').click();
        amountBTC.type(data.btc);
      });
    });
    return this;
  }
  buyButton() {
    const exchangeBuy = cy.waitUntil(() =>
      cy.get("#buyButton").click()
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
          cy.get(".notification-text__text").should("be.visible")
        );
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
  verifyTIF() {
    const ordersTable = cy
      .get('[data-qa-id="orders-table"]')
      .get("div")
      .first()
      .each(($div) => {
        cy.get(
          '[style="position: absolute; left: 0px; top: 25px; height: 25px; width: 100%; padding-right: 0px;"]'
        )
          .get(
            '[style="flex: 1 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > ._2prYApikgYf4Vw1y8YDuKB > .trigger > .fa'
          ).should('be.visible')
          .get('[class="trigger ui-tooltip ui-tooltip--cursor-pointer"]')
          .first()
          .trigger("mouseover")
          .get('[class="trigger ui-tooltip ui-tooltip--cursor-pointer"]')
          .first()
          .invoke("show")
          .should("be.visible");
      });
    return this;
  }
  orderFilter() {
    const filter = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .ui-contextmenu__wrapper > .btn'
    );
    filter.click();
    const type = cy.get(
      '[data-qa-id="orders-filter-type-margin"] > .filter-select__selection-label'
    );
    type.click();
    const side = cy.get(
      '[data-qa-id="orders-filter-side-buy"] > .filter-select__selection-label'
    );
    side.click();
    const apply = cy.get(".filter-select__actions > .ui-button");
    apply.click();
    const appliedType = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-type-margin"] > .filter-select__selection-label'
    );
    appliedType.should("contain", "Margin");
    const appliedSide = cy.get(
      '[style="display: flex; align-items: center; min-width: 200px;"] > .filter-select > .filter-select__summary > [data-qa-id="orders-filter-summary-side-buy"] > .filter-select__selection-label'
    );
    appliedSide.should("contain", "Bids");
    return this;
  }
  cancelOrder() {
    const ordersTable = cy
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
          .click();
        const testData = require("../../fixtures/orders.json");
        testData.forEach((testDataRow) => {
          const data = {
            btc: testDataRow.btc,
          };
          context(`Generating a test for ${data.btc}`, () => {
            const msgCancel = cy.waitUntil(() =>
              cy.get(".notification-text__text").should("be.visible")
            );
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
