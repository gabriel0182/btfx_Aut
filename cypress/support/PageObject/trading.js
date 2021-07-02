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
      cy.get('span#book-agg-controls')
      .within(()=>{
        cy.get('i.fa-search-plus')
        .click();
      })
    }
    cy.waitUntil(()=>
    cy.get("#book-bids")
    .within(()=>{
      cy.get('.book__row')
      .first()
      .invoke("css", "background-color")
      .then((background) => {
      cy.get('span')
      .eq(4)
          .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          })
        })
      })
  )
  }
  static bookZoomReduce() {
    for (let n = 0; n < 10; n++) {
      cy.get('span#book-agg-controls')
      .within(()=>{
        cy.get('i.fa-search-minus')
        .click();
      })
    }
    cy.waitUntil(()=>
    cy.get("#book-bids")
    .within(()=>{
      cy.get('.book__row')
      .first()
      .invoke("css", "background-color")
      .then((background) => {
      cy.get('span')
      .eq(4)
          .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          })
        })
      })
  )
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
    cy.get("#book-bids")
    .within(()=>{
      cy.get('.book__row')
      .first()
      .get('i.fa-bell')
      .first()
        .click();
    })
    cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    );
    cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
      cy.get("#book-bids")
      .within(()=>{
        cy.get('.book__row')
        .first()
        .get('i.fa-bell')
        .first()
          .click();
      })
    cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
    cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
      cy.get("#book-asks")
      .within(()=>{
        cy.get('.book__row')
        .first()
        .get('i.fa-bell')
        .first()
          .click();
      })
    cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Added new price alert BTC/USD")
    );
    cy
      .get("div.standalone-notification-drawer__item")
      .get("div.notification__skip")
      .within(() => {
        cy.get("div.fa-times").click();
      });
      cy.get("#book-asks")
      .within(()=>{
        cy.get('.book__row')
        .first()
        .get('i.fa-bell')
        .first()
          .click();
      })
    cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Removed price alert BTC/USD")
    );
  }
  static checkBestValue() {
    cy.intercept('GET', 'https://api-pub.staging.bitfinex.com/v2/tickers?symbols=ALL').as('trading')
    cy.wait('@trading').its('response.statusCode').should('eq', 200)
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
        cy.get('#balances-search-input')
        .clear()
    .type('BTC','{enter}')
    .get('[data-qa-id="balancesTable-row-cell"]')
      .get('.trigger')
      .get('span.avail')
      .first()
      .then(($val) => {
        const txt = $val.text()
        var pointNum = Number(txt.replace(/[^0-9\.-]+/g,''))
        cy.get('#amountinput2')
        .get('input#amountinput2')
        .should('contain.value',pointNum)
      })
        });
  }
  static increaseDecreasePrecision() {
    for (let n = 0; n < 2; n++) {
      cy.get('span#book-agg-controls')
      .within(()=>{
        cy.get('i.fa-minus')
        .first()
        .click();
      })
       cy.waitUntil(()=>
        cy.get("#book-bids")
        .within(()=>{
          cy.get('.book__row')
          .first()
          .should("be.visible")
        })
       )
       cy.waitUntil(()=>
        cy.get("#book-asks")
        .within(()=>{
          cy.get('.book__row')
          .first()
          .should("be.visible")
        })
      )
    }
    for (let n = 0; n < 2; n++) {
      cy.get('span#book-agg-controls')
      .within(()=>{
        cy.get('i.fa-plus')
        .first()
        .click();
      })
      cy.waitUntil(()=>
      cy.get("#book-bids")
      .within(()=>{
        cy.get('.book__row')
        .first()
        .should("be.visible")
      })
     )
     cy.waitUntil(()=>
      cy.get("#book-asks")
      .within(()=>{
        cy.get('.book__row')
        .first()
        .should("be.visible")
      })
    )
    }
  }
}
export default trading
