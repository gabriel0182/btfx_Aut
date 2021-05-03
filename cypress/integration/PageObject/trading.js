///  <reference types="cypress"/>

class trading {
  currency() {
    const tradingTab = cy.get(
      ".header__nav-buttons-wrapper > .header__nav-trading"
    );
    tradingTab.click({ force: true });
    const selectCurrency = cy.get(
      '[aria-rowindex="1"] > [style="flex: 0 1 83px;"] > .virtable__cellwrapper > .tickerlist__symbolcell'
    );
    selectCurrency.click({ force: true });
    return this;
  }
  verifyCurrency() {
    const selectTicker =
    cy.get('[class="custom-scrollbar"]')
    .get('[href="/t/BTC:USD"]').last()
    selectTicker.click({force:true})
    const mainticker = cy.waitUntil(() =>
      cy
        .get(".main-ticker__container")
        .should("be.visible")
        .should("contain", "BTC/USD")
    );
    const chart = cy.get(
      "#chart-header > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
    );
    chart.should("be.visible", true);
    const chartLabel = cy.get(
      "#chart-header > .collapsible > .ui-collapsible__header > :nth-child(1)"
    );
    chartLabel.should("contain", "BTC/USD");
    return this;
  }
}

export default trading;
