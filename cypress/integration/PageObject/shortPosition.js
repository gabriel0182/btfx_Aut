class shortPosition {
  addPosition() {
    const tradingTab = cy.get(
      ".header__nav-buttons-wrapper > .header__nav-trading"
    );
    tradingTab.click();
    const add = cy
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button'
      )
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button > .fa'
      )
      .scrollIntoView();
    add.click();
    return this;
  }
  requiredInfo() {
    const testData = require("../../fixtures/positions.json");
    testData.forEach((testDataRow) => {
      const data = {
        type: testDataRow.type,
        amount: testDataRow.amount,
      };
      context(`Generating a test for ${data.type}`, () => {
        const selectType = cy.waitUntil(() =>
          cy
            .get(".ui-modaldialog__body")
            .get(".themed-react-select__value-container")
            .should("be.visible")
        );
        selectType.type(`${data.type}{enter}`).blur({force:true})
        const short = cy.waitUntil(() =>
          cy
            .get("div.ui-radioinput")
            .get("div.circle")
            .last()
            .should("be.visible")
            .click({ force: true })
        );
        const positionAmount = cy.waitUntil(() =>
          cy.get(".increase-positon__input").type(data.amount, "{enter}")
        );
        positionAmount.wait(1000);
      });
      const proceed = cy.waitUntil(() =>
        cy
          .get(".increase-position-modal > .ui-button")
          .should("be.visible")
          .click()
      );
    });
    return this;
  }
  successMsg() {
    const msg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("be.visible")
        .should("contain", "Submitting position increase")
    );
    return this;
  }
  testSortingPositions() {
    const pairUP = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
      .get(
        '[style="height: 25px; width: 100%;"] > .table-vir__row > [style="flex: 1 1 160px; min-width: 160px;"]'
      )
      .should("contain", "BTC/USD");
    const pairDown = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
      .get(
        '[style="height: 25px; width: 100%;"] > .table-vir__row > [style="flex: 1 1 160px; min-width: 160px;"]'
      )
      .should("contain", "BTC/USD");
    const amountUp = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 120px; min-width: 60px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 120px; min-width: 60px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get(
        '[style="flex: 1 1 120px; min-width: 60px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
    const amountDown = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 120px; min-width: 60px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 120px; min-width: 60px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get(
        '[style="flex: 1 1 120px; min-width: 60px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
    const basePriceUP = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get(
        '[style="flex: 1 1 110px; min-width: 100px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
    const basePriceDown = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up'
      )
      .click()
      .get(
        '[style="flex: 1 1 110px; min-width: 100px;"] > .virtable__cellwrapper > :nth-child(1) > :nth-child(1)'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
    const liqPriceUp = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .table__title-titlewrapper > .sort-icons'
      )
      .click()
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .virtable__cellwrapper > span'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
    const liqPriceDown = cy
      .get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .table__title-titlewrapper'
      )
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .table__title-titlewrapper > .sort-icons'
      )
      .click()
      .get(
        '[style="flex: 1 1 110px; min-width: 75px;"] > .virtable__cellwrapper > span'
      )
      .should(($val) => {
        expect($val).not.to.be.null;
      });
      const plUp = cy.get(
        '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
      )
      .get('[style="flex: 1 1 120px;"] > .table__title-titlewrapper')
      .get('[style="flex: 1 1 120px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
      .click()
      .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
      .get('[style="flex: 1 1 120px;"] > div')
        .should('contain','USD')
        const plDown = cy.get(
          '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
        )
        .get('[style="flex: 1 1 120px;"] > .table__title-titlewrapper')
        .get('[style="flex: 1 1 120px;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
        .click()
        .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
        .get('[style="flex: 1 1 120px;"] > div')
          .should('contain','USD')
          const plPerUp = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(8) > .table__title-titlewrapper')
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(8) > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('[style="height: 25px; width: 100%;"] > .table-vir__row > :nth-child(8)')
          .get(':nth-child(8) > .bfx-red-text')
          .should(($val) => {
            expect($val).not.to.be.null;
          });
          const plPerDown = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(8) > .table__title-titlewrapper')
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(8) > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('[style="height: 25px; width: 100%;"] > .table-vir__row > :nth-child(8)')
          .get(':nth-child(8) > .bfx-red-text')
          .should(($val) => {
            expect($val).not.to.be.null;
          });
          const fundingCostUp = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[style="flex: 1 1 120px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper')
          .get('[style="flex: 1 1 120px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('.virtable__cellwrapper > div > .trigger > :nth-child(1) > :nth-child(1)')
          .should(($val) => {
            expect($val).not.to.be.null;
          })
          .get('[style="flex: 1 1 25px; min-width: 25px; max-width: 25px;"] > .show50')
          .should('contain','BTC')
          const fundingCostDown = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[style="flex: 1 1 120px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper')
          .get('[style="flex: 1 1 120px; min-width: 100px; display: flex; justify-content: flex-end;"] > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('.virtable__cellwrapper > div > .trigger > :nth-child(1) > :nth-child(1)')
          .should(($val) => {
            expect($val).not.to.be.null;
          })
          .get('[style="flex: 1 1 25px; min-width: 25px; max-width: 25px;"] > .show50')
          .should('contain','BTC')
          const fundingTypeUp = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(11) > .table__title-titlewrapper')
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(11) > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('[style="height: 25px; width: 100%;"] > .table-vir__row > :nth-child(11) > div')
          .get('.btn-flat > span')
          .should('contain','Daily')
          const fundingTypeDown = cy.get(
            '[style="flex: 1 1 160px; min-width: 160px;"] > .table__title-titlewrapper'
          )
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(11) > .table__title-titlewrapper')
          .get('[data-qa-id="positions-table"] > [style="overflow: visible; height: 0px; width: 0px;"] > [tabindex="-1"] > .table-vir__header > :nth-child(11) > .table__title-titlewrapper > .sort-icons > .fa-sort-up')
          .click()
          .get('[style="height: 25px; width: 100%;"] > .table-vir__row > :nth-child(11) > div')
          .get('.btn-flat > span')
          .should('contain','Daily')
          return this;
  }
  cancelPosition() {
    const testData = require("../../fixtures/positions.json");
    testData.forEach((testDataRow) => {
      const data = {
        amount: testDataRow.amount,
      };
      context(`Generating a test for ${data.amount}`, () => {
        const positionsTable = cy
          .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
          .get("div")
          .first()
          .each(($div) => {
            cy.get(
              '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button'
            );
            cy.get(
              '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button > .fa'
            ).click();
          });
        const confirm = cy
          .get(".ui-modaldialog__footer")
          .get(".ui-modaldialog__footer > .ui-button--green");
        confirm.click();
        const msgCancel = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("be.visible")
            .should(
              "contain",
              `Margin market buy order of ${data.amount} BTC has been fully executed`
            )
        );
      });
    });
    return this;
  }
}
export default shortPosition;
