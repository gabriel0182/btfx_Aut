///  <reference types="cypress"/>

class trading {
  currency() {
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
          .click()
          .get('[id="Item_USD"]')
          .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
          .click();
        const selectTicker = cy
          .get('[class="custom-scrollbar"]')
          .get('[href="/t/BTC:USD"]')
          .last();
        selectTicker.click();
      });
    });
    const mainticker = cy.waitUntil(() =>
      cy
        .get(".main-ticker__container")
        .should("be.visible")
        .should("contain", "BTC/USD")
    );
    return this;
  }
  bookZoomAdd() {
    for (let n = 0; n < 10; n++) {
      const increase = cy
        .get(
          ".split__main > .ui-panel > .collapsible > .ui-collapsible__header"
        )
        .get(
          '.split__main > .ui-panel > .collapsible > .ui-collapsible__header > [style="visibility: visible;"]'
        )
        .get("#book-agg-controls > :nth-child(6)")
        .get(":nth-child(6) > .ui-button")
        .get(":nth-child(6) > .ui-button > .fa");
      increase.click();
    }
    const bookTable = cy
      .get(
        '#book-bids > .book__rows > :nth-child(4) > [style="width: 65px; min-width: 65px; max-width: 65px;"]'
      )
      .invoke("css", "background-color")
      .then((background) => {
        cy.get(
          '#book-bids > .book__rows > :nth-child(4) > [style="width: 65px; min-width: 65px; max-width: 65px;"] > span'
        )
          .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          });
      });
    return this;
  }
  bookZoomReduce() {
    for (let n = 0; n < 10; n++) {
      const decrease = cy
        .get(
          ".split__main > .ui-panel > .collapsible > .ui-collapsible__header"
        )
        .get(
          '.split__main > .ui-panel > .collapsible > .ui-collapsible__header > [style="visibility: visible;"]'
        )
        .get("#book-agg-controls > :nth-child(5)")
        .get("#book-agg-controls > :nth-child(5) > .ui-button")
        .get(":nth-child(5) > .ui-button > .fa");
      decrease.click();
    }
    const book = cy
      .get(
        '#book-bids > .book__rows > :nth-child(4) > [style="width: 65px; min-width: 65px; max-width: 65px;"]'
      )
      .invoke("css", "background-color")
      .then((background) => {
        cy.get(
          '#book-bids > .book__rows > :nth-child(4) > [style="width: 65px; min-width: 65px; max-width: 65px;"] > span'
        )
          .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          });
      });
    return this;
  }
  verifyCurrency() {
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
        ).click();
      });
    const validateBidMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    );
    const deleteAlert = cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
    const removeBidAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first()
      .each(($div) => {
        cy.get(
          "#book-bids > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click();
      });
    const validateMsgAlert = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
    const deleteAlert2 = cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
    const setAskAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first()
      .each(($div) => {
        cy.get(
          "#book-asks > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click();
      });
    const validateAskMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    );
    const deleteAlert3 = cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
    const removeAskAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get("div")
      .first()
      .each(($div) => {
        cy.get(
          "#book-asks > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).click();
      });
    const validateRemoveAskMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
    return this;
  }
  checkBestValue() {
    const values = cy.waitUntil(() => {
      cy.get(
        ":nth-child(1) > .top-bidask__wrapper > .orderform-bidask__label > .trigger > :nth-child(2) > div > :nth-child(1)"
      ).should("be.visible");
      return this;
    });
    const priceBid = cy.get(
      ":nth-child(1) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(1) > .fa"
    );
    priceBid.click();
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
    priceAsk.click();
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
    const priceUSD = cy.get("#priceinput1");
    priceUSD.clear().type("1");
    const checkMaxbuy = cy.get(
      ":nth-child(2) > .orderform__field > .ui-labeledinput__container > .ui-fieldlabel__container > .ui-buysellinputindicator > :nth-child(1) > .fa"
    );
    checkMaxbuy.click();
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
    checkMaxAsk.click();
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
  increaseDecreasePrecision() {
    for (let n = 0; n < 2; n++) {
      const decrease = cy
        .get(
          '.split__main > .ui-panel > .collapsible > .ui-collapsible__header > [style="visibility: visible;"]'
        )
        .get("#book-agg-controls > :nth-child(1)")
        .get("#book-agg-controls > :nth-child(1) > .ui-button")
        .get("#book-agg-controls > :nth-child(1) > .ui-button > .fa")
        .click();
      const bookDescreased = 
        cy.get("#book-bids > .book__rows").should("be.visible");
    }
    const increase = cy
        .get(
          '.split__main > .ui-panel > .collapsible > .ui-collapsible__header > [style="visibility: visible;"]'
        )
        .get("#book-agg-controls > :nth-child(2)")
        .get("#book-agg-controls > :nth-child(2) > .ui-button")
        .get('#book-agg-controls > :nth-child(2) > .ui-button > .fa')
        .click();
      const book = 
        cy.get("#book-bids > .book__rows").should("be.visible");
    return this;
  }
}
export default trading;
