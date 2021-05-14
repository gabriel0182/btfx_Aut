class TradesTable {
  validateMarket() {
    const headers = cy.waitUntil(() =>
      cy
        .get(
          "#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
        )
        .get(
          '.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]'
        ).invoke('text')
        .should("contain", "Time")
        .get(
          '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]'
        ).invoke('text')
        .should("contain", "Price")
        .get(
          '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]'
        ).invoke('text')
        .should("contain", "Amount")
    );
    const color = cy.get('#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
    .invoke("css", "background-color")
      .then((background) => {
          cy.get('div.trades-table')
    .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          });
        })
        .should('have.css', 'color','rgb(255, 255, 255)')
    return this;
  }
  validateYours() {
      const yours = 
      cy.get('#recent-trades > .collapsible > .ui-collapsible__header > [style="visibility: visible;"] > [style="display: flex; font-size: 0.8rem; flex-direction: row; align-items: flex-end; justify-content: center;"]')
      .get('#trades-toggle > span')
      yours.click();
      const yourHeaders = cy.get('.trades-table__header')
      .get('.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]')
      .invoke('text')
        .should("contain", "Time")
        .get('.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]')
        .invoke('text')
        .should("contain", "Price")
        .get('.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]')
        .invoke('text')
        .should("contain", "Amount")
        const yoursColor = cy
        .get('#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body')
        .should('have.css', 'color','rgb(255, 255, 255)')
      return this;
  }
}
export default TradesTable;
