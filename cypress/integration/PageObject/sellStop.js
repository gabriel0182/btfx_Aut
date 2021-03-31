class sellStop {
  trading() {
    const tradingTab = cy.get(
      ".header__nav-buttons-wrapper > .header__nav-trading"
    );
    tradingTab.click({ force: true });
    return this;
  }
  orderInfo() {
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        wallet1: testDataRow.wallet1,
        type1: testDataRow.type1,
        price: testDataRow.price,
        btc: testDataRow.btc,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderType = cy
          .get(
            ":nth-child(1) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
          )
          .click({ force: true })
          .get('[id="orderFormDropdown"]')
          .get('[id="orderFormDropdownItem_stop"]')
          .contains(data.type1)
          .click({ force: true });
        const priceUSD = cy.get('[name="price"]');
        priceUSD.type(data.price);
        const amountBTC = cy.get('[name="amount"]');
        amountBTC.type(data.btc);
        const orderFrom = cy
          .get("#form-choose-exchange")
          .contains(data.wallet1);
        orderFrom.click({ force: true });
      });
    });
    return this;
  }
  buyButton() {
    const exchangeBuy = cy.get("#sellButton").contains("Exchange Sell");
    exchangeBuy.click({ force: true });
    exchangeBuy.wait(1000);
    return this;
  }
  successMsg (){
      const msg = cy
      .get('.notification-text__text')
      .invoke('text')
      msg.should('contain', "Created exchange stop sell order of 0.0001 BTC  at  40000 USD")
  }
}

export default sellStop;
