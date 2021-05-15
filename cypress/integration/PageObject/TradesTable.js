

class TradesTable {
  validateMarket() {
    const headers = cy.waitUntil(() =>
      cy
        .get(
          "#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
        )
        .get(
          '.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]'
        )
        .invoke("text")
        .should("contain", "Time")
        .get(
          '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]'
        )
        .invoke("text")
        .should("contain", "Price")
        .get(
          '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]'
        )
        .invoke("text")
        .should("contain", "Amount")
    );
    const color = cy
      .get(
        "#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .invoke("css", "background-color")
      .then((background) => {
        cy.get("div.trades-table")
          .invoke("attr", "style", `background-color: ${background}`)
          .then((element) => {
            expect(element).to.have.css("background-color", background);
          });
      })
      .should("have.css", "color", "rgb(255, 255, 255)");
    return this;
  }
  validateYours() {
    const yours = cy
      .get(
        '#recent-trades > .collapsible > .ui-collapsible__header > [style="visibility: visible;"] > [style="display: flex; font-size: 0.8rem; flex-direction: row; align-items: flex-end; justify-content: center;"]'
      )
      .get("#trades-toggle > span");
    yours.click();
    const yourHeaders = cy
      .get(".trades-table__header")
      .get(
        '.trades-table__header > [style="display: flex; justify-content: center; width: 180px; min-width: 68px; flex-grow: 1;"]'
      )
      .invoke("text")
      .should("contain", "Time")
      .get(
        '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 207px; min-width: 61px; flex-grow: 1;"]'
      )
      .invoke("text")
      .should("contain", "Price")
      .get(
        '.trades-table__header > [style="display: flex; justify-content: flex-end; width: 306px; min-width: 76px; flex-grow: 1;"]'
      )
      .invoke("text")
      .should("contain", "Amount");
    const yoursColor = cy
      .get(
        "#recent-trades > .collapsible > .ui-collapsible__body-wrapper > .ui-collapsible__body"
      )
      .should("have.css", "color", "rgb(255, 255, 255)");
    return this;
  }
  sortingOrderHistory() {
    const pairUp = cy
      .get(
        '[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    pairUp.click();
    const pairDown = cy
      .get(
        '[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 0 1 160px; min-width: 160px; max-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    pairDown.click();
    const contextUp = cy
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(3) > .table__title-titlewrapper'
      )
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(3) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    contextUp
      .click()
      .get('[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"]')
      .get(
        '[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"] > :nth-child(3)'
      )
      .first()
      .should("contain", "Exchange");
    const contextDown = cy
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(3) > .table__title-titlewrapper'
      )
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(3) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    contextDown
      .click()
      .get('[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"]')
      .get(
        '[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"] > :nth-child(3)'
      )
      .first()
      .should("contain", "Margin");
    const typeUp = cy
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(4) > .table__title-titlewrapper'
      )
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(4) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    typeUp
      .click()
      .get('[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"]')
      .within(() => {
        cy.get("span.table-vir__cell")
          .get(":nth-child(4)")
          .first()
          .invoke("text")
          .should("contain", "Fill or kill");
      });
    const typeDown = cy
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(4) > .table__title-titlewrapper'
      )
      .get(
        '[style="height: 340px; overflow: auto hidden; width: 100%; position: relative;"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(4) > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    typeDown
      .click()
      .get('[style="height: 5000px; width: 100%;"] > [aria-rowindex="1"]')
      .within(() => {
        cy.get("span.table-vir__cell")
          .get(":nth-child(4)")
          .first()
          .invoke("text")
          .should("contain", "Trailing stop");
      });
    const amountUp = cy
      .get(
        '[style="flex: 1 1 110px; min-width: 60px; max-width: 400px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 60px; max-width: 400px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    amountUp
      .click()
      .get('span.table-vir__cell')
      .within(() => {
        cy.get(
          'div.virtable__cellwrapper.virtable__cellwrapper--rightalign'
        )
          .get('span[style="line-height: 20px;"]')
          .first()
          .should(($val) => {
            expect($val).not.to.be.null;
          });
      });const amountDown = cy
      .get(
        '[style="flex: 1 1 110px; min-width: 60px; max-width: 400px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 60px; max-width: 400px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      );
    amountDown
      .click()
      .get('span.table-vir__cell')
      .within(() => {
        cy.get(
          'div.virtable__cellwrapper.virtable__cellwrapper--rightalign'
        )
          .get('span[style="line-height: 20px;"]')
          .first()
          .should(($val) => {
            expect($val).not.to.be.null;
          });
      });
      const ccyUp  = cy.get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper')
      .get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
      ccyUp.click()
      .get('[aria-rowindex="1"]')
      .get('span.table-vir__cell')
      .get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .show50')
      .first()
        .should('contain','BTC')
        const ccyDown  = cy.get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper')
        .get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
        ccyDown.click()
        .get('[aria-rowindex="1"]')
        .get('span.table-vir__cell')
        .get('[style="flex: 0 1 65px; min-width: 65px; max-width: 65px;"] > .show50')
        .first()
          .should('contain','BTC')
      return this;
  }
}
export default TradesTable;
