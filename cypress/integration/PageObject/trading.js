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
    const testData = require("../../fixtures/orders.json");
    testData.forEach((testDataRow) => {
      const data = {
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.wallet1}`, () => {
        const orderForm = cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
        );
    const searchTicker = cy.get("#ticker-search-input");
    searchTicker.type(`${data.ticker}{enter}`);
    const currency = cy
      .get(
        ":nth-child(2) > .ui-dropdown__wrapper > .o-type-select > .ui-dropdown__buttonwrap"
      )
      .click({ force: true })
      .get('[id="Item_USD"]')
      .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
      .click({ force: true });
    const selectTicker = cy
      .get('[class="custom-scrollbar"]')
      .get('[href="/t/BTC:USD"]')
      .last();
    selectTicker.click({ force: true });
      })
    })
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
  addAlert() {
    const setBidAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first("div")
      .each(($div) => {
        cy.get(
          "#book-bids > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click({ force: true });
      });
    const validateBidMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    )
    const deleteAlert = cy.get('div.standalone-notification-drawer__item')
    .get('div.notification__skip')
    .within(()=>{
      cy.get('div.fa-times')
      .click({ force: true });
    })
    const removeBidAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first("div")
      .each(($div) => {
        cy.get(
          "#book-bids > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click({ force: true });
      });
    const validateMsgAlert = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    )
    const deleteAlert2 = cy.get('div.standalone-notification-drawer__item')
    .get('div.notification__skip')
    .within(()=>{
      cy.get('div.fa-times')
      .click({ force: true });
    })
    const setAskAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first("div")
      .each(($div) => {
        cy.get(
          "#book-asks > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click({ force: true });
      })
    const validateAskMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    )
    const deleteAlert3 = cy.get('div.standalone-notification-drawer__item')
    .get('div.notification__skip')
    .within(()=>{
      cy.get('div.fa-times')
      .click({ force: true });
    })
    const removeAskAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first("div")
      .each(($div) => {
        cy.get(
          "#book-asks > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click({ force: true });
      })
    const validateRemoveAskMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
    return this;
  }
  checkBestValue() {
    const values = cy.waitUntil(()=>{
      cy.get(
        ":nth-child(1) > .top-bidask__wrapper > .orderform-bidask__label > .trigger > :nth-child(2) > div > :nth-child(1)"
      ).should('be.visible')
      return this;
    })
    const priceBid = cy.get(
      ":nth-child(1) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(1) > .fa"
    );
    priceBid.click({ force: true });
    const compareBid = cy;
    cy.get(
      ":nth-child(1) > .top-bidask__wrapper > .orderform-bidask__label > .trigger > :nth-child(2) > div > :nth-child(1)"
    ).then(($val) => {
      const txt = $val.text();
      var pointNum = parseFloat(txt);
      cy.get("#priceinput1")
        .get("input#priceinput1.ui-labeledinput__input")
        .should("contain.value", `${pointNum}`);
    });
    const priceAsk = cy.get(
      ":nth-child(1) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(2) > .fa"
    );
    priceAsk.click({ force: true });
    const compareAsk = cy;
    cy.get(
      ":nth-child(2) > .top-bidask__wrapper > .orderform-bidask__label > .trigger > :nth-child(2) > div > :nth-child(1)"
    ).then(($val) => {
      const txt = $val.text();
      var pointNum = parseFloat(txt);
      cy.get("#priceinput1")
        .get("input#priceinput1.ui-labeledinput__input")
        .should("contain.value", `${pointNum}`);
    });
    return this;
  }
  checkMaxValue() {
    const priceUSD = cy.get('#priceinput1')
    priceUSD.clear({force:true})
    .type('1')
    const checkMaxbuy = cy.get(
      ":nth-child(2) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(1) > .fa"
    );
    checkMaxbuy.click({ force: true });
    const compare = cy
      .get(
        '[style="height: 420px; width: 100%;"] > [aria-rowindex="1"] > :nth-child(2) > .trigger-ledger-modal > div > .trigger > .avail'
      )
      .then(($val) => {
        const txt = $val.text();
        var pointNum = parseFloat(txt);
        cy.get("#amountinput2")
          .get("input#amountinput2.ui-labeledinput__input")
          .should("contain.value", `${pointNum}`);
      });
    const checkMaxAsk = cy.get(
      ":nth-child(2) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(2) > .fa"
    );
    checkMaxAsk.click({ force: true });
    const compareAsk = cy
      .get(
        '[aria-rowindex="2"] > :nth-child(2) > .trigger-ledger-modal > div > .trigger > .avail'
      )
      .then(($val) => {
        const txt = $val.text();
        var pointNum = parseFloat(txt);
        cy.get("#amountinput2")
          .get("input#amountinput2.ui-labeledinput__input")
          .should("contain.value", `${pointNum}`);
      });
    return this;
  }
}

export default trading;
