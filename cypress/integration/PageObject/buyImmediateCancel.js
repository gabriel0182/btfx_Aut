class buyImmediateCancel {
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
      cy
        .get(
          ":nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
        )
        .click({ force: true })
        .get("ul.dropdown-content", { force: true })
    );
    const selectOrder = cy.waitUntil(() =>
      cy.get("ul.dropdown-content", { force: true }).within(() => {
        cy.get("#orderFormDropdownItem_immediateorcancel")
          .get(
            '[data-qa-id="order-form__order-type-dropdown-menu-item-immediateorcancel"]'
          )
          .click({ force: true });
      })
    );
    const marginWallet = cy.get("#form-choose-margin");
    cy.get("#form-choose-margin > span");
    marginWallet.click({ force: true });
    const reduceOnlyMargin = cy.get('.orderform__field > .ui-labeledcheckbox__container > label')
    reduceOnlyMargin.should("be.visible");
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        type6: testDataRow.type6,
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
      cy.get(":nth-child(2) > h5 > span").then(($btn) => {
        const txt = $btn.text();
        var pointNum = parseInt(txt);
        var amout = pointNum * 1120;
        var value = amout + 100;
        localStorage.setItem("price", value);
        const distanceUSD = cy.get('[name="price"]');
        distanceUSD.type(value);
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click({ force: true }).wait(5000)
      })
      });
    });
    return this;
      }
  buyButton() {
    const exchangeBuy = cy.get("#buyButton")
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
        )
        const verifyMsg = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should(
              "contain",
              `Exchange ioc buy order of ${data.btc} BTC has been fully executed`
            )
        );
      });
    });
    return this;
  }
}
export default buyImmediateCancel;
