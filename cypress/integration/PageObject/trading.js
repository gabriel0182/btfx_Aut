///  <reference types="cypress"/>

class trading {
 static currency() {
  cy.fixture('orders').then((trading) => {
    context(`Generating a test for ${trading[0].ticker}`, () => {
   cy.waitUntil(() =>
          cy.get("#orderform-panel").should("be.visible").should("exist")
   )
      cy.get("#ticker-search-input")
        .type(`${trading[0].ticker}{enter}`)
        cy.get('[data-qa-id="ticker-list-pair-filter"]')
        .click()
          cy.get('[id="Item_USD"]')
          .get('[data-qa-id="ticker-list-pair-filter-menu-item-USD"]')
          .click();
        cy.get('div.virtable__cellwrapper--rightalign')
        .within(()=>{
          cy.get('[href="/t/BTC:USD"]')
          .click()
        })
      })
    })
    cy.waitUntil(() =>
      cy
        .get(".main-ticker__container")
        .should("be.visible")
        .should("contain", "BTC/USD")
    );
  }
  static bookZoomAdd() {
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
  static bookZoomReduce() {
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
  static verifyCurrency() {
    cy.get('div#chart-header')
    .get('div.ui-collapsible__header')
    .within(()=>{
      cy.get('span.show50')
      .should("be.visible", true)
      .should("contain", "BTC/USD")
    })
  }
  static addAlert() {
    const setBidAlert = cy
      .get(
        ".split__main > .ui-panel > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .get(
          "#book-bids > .book__rows > :nth-child(1) > .book__alert > .fa"
        ).first()
        .click();
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
    .get(
        "#book-bids > .book__rows > :nth-child(1) > .book__alert > .fa"
      ).first()
      .click();
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
      })
    const validateRemoveAskMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
    return this;
  }
  static checkBestValue() {
    cy.intercept('GET', 'https://api-pub.staging.bitfinex.com/v2/tickers?symbols=ALL').as('trading')
    cy.wait('@trading').its('response.statusCode').should('eq', 200)
    cy.waitUntil(() =>
    cy.get('span.ui-fieldlabel__innertag')
    .should('be.visible')
    )
    cy.get('.ui-buysellinputindicator')
    .within(()=>{
      cy.get('i')
      .first()
      .click()
    }) 
    cy.get('span.ui-fieldlabel__innertag')
    .contains('Bid')
    .next('span')
    .then(($val) => {
      const txt = $val.text();
      var pointNum = Number(txt.replace(/[^0-9\.-]+/g,''))
      cy.get("#priceinput1")
        .get("input#priceinput1.ui-labeledinput__input")
        .should("contain.value", `${pointNum}`);
    })
    cy.get('.ui-buysellinputindicator')
    .within(()=>{
      cy.get('i.bfx-red-text')
      .first()
      .click()
    }) 
    cy.get('span.ui-fieldlabel__innertag')
    .contains('Ask')
    .next('span')
    .then(($val) => {
      const txt = $val.text();
      var pointNum = Number(txt.replace(/[^0-9\.-]+/g,''))
      cy.get("#priceinput1")
        .get("input#priceinput1.ui-labeledinput__input")
        .should("contain.value", `${pointNum}`);
    })
  }
  static checkMaxValue() {
    cy.get("#priceinput1")
    .clear().type("1");
    cy.get('div.ui-buysellinputindicator')
    .last()
    .within(()=>{
      cy.get('i')
      .first()
      .click()
    })
    .click();
    cy.get('#balances-search-input')
    .type('USD','{enter}')
    //cy.get('.table-vir__row-odd > :nth-child(2) > .trigger-ledger-modal > :nth-child(1) > .trigger > .total')
    .get('[data-qa-id="balancesTable-row-cell"]')
    .eq(5)
      .get('.trigger')
      .get('span.avail')
      .eq(3)
      .then(($val) => {
        const txt = $val.text()
        var pointNum = Number(txt.replace(/[^0-9\.-]+/g,''))
        cy.get('#amountinput2')
        .get('input#amountinput2')
        .should('contain.value',pointNum)
        cy.get('div.ui-buysellinputindicator')
        .last()
        .within(()=>{
          cy.get('i')
          .last()
          .click()
        })
        cy.get("#amountinput2")
          .get('input.ui-labeledinput__input')
          .should(($val) => {
            expect($val).not.to.be.null;
          });
        });
  }
  static increaseDecreasePrecision() {
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
export default trading
