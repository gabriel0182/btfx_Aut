class partialHidden {
  placeLimit() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        hiddenAmt: testDataRow.hiddenAmt,
      };
      context(`Generating a test for ${data.hiddenAmt}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        cy.get(
          "#book-asks > .book__rows > :nth-child(1) > :nth-child(4) > span"
        )
          .first()
          .then(($btn) => {
            const txt = $btn.text();
            var pointNum = parseInt(txt);
            var amount = pointNum * 945;
            const priceUSD = cy
              .get("#priceinput1")
              .clear({ force: true })
              .type(amount);
          });
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear().type(data.hiddenAmt).wait(2000);
      });
    });
    const hidden = cy.get(
      ".orderform__options > :nth-child(2) > .ui-labeledcheckbox__container > label"
    );
    hidden.click();
    const exchangeBuy = cy.get("#buyButton");
    exchangeBuy.click();
    return this;
  }
  placeMarket() {
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
      cy.get("#orderFormDropdownItem_market")
        .get(
          '[data-qa-id="order-form__order-type-dropdown-menu-item-market"]'
        )
        .click();
    })
  );
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        sellPartiall: testDataRow.sellPartiall,
      };
      context(`Generating a test for ${data.sellPartiall}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.clear().type(data.sellPartiall).wait(2000);
      });
    });
    const exchangeSell = cy.get("#sellButton");
    exchangeSell.click();
    return this;
  }
  verifyPartialLabel() {
    const ordersTable = cy.get('[style="height: 50px; width: 100%;"] > .table-vir__row-odd')
    .first()
    .get('[style="flex: 1 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > :nth-child(1) > ._3ZT6FhS8zuiHfgB0PXtJOI')
    .should('contain','Partially filled')
    .get('[style="flex: 1 1 90px; min-width: 90px;"] > .virtable__cellwrapper > ._3gvQcbWp-vbomwHFC_BrJY > :nth-child(1) > ._3ZT6FhS8zuiHfgB0PXtJOI')
    .trigger('mouseover')
    .invoke('show')
    .should('contain','Partially filled')
    return this;
  }
  cancelOrders() {
    const selectAll = cy
      .get(
        '[style="flex: 0 1 105px; min-width: 105px; max-width: 105px;"] > :nth-child(1) > .ui-button'
      )
      .click()
      .get('.confirm-modal')
      .click()
      .get('.edit-order-offer-modal')
      .get('.edit-order-offer-modal__data-area')
      .get('.edit-order-offer-modal__buttons > :nth-child(1) > .ui-button')
      .click();
    return this;
  }
}
export default partialHidden;
