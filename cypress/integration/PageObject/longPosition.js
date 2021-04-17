class longPosition {
  addPosition() {
    const tradingTab = cy.get(
      ".header__nav-buttons-wrapper > .header__nav-trading"
    );
    tradingTab.click({ force: true })
    const add = cy
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button'
      )
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button > .fa'
      )
      .scrollIntoView();
    add.click({ force: true });
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
          .should('be.visible')
        )
        selectType.type(`${data.type}{enter}{enter}`);
        const Long = cy.waitUntil(() =>
          cy
            .get(".ui-radioinput > :nth-child(1)")
            .get(":nth-child(1) > .circle")
            .should("be.visible")
            .click({ force: true })
        );
        const positionAmount = cy.waitUntil(() =>
        cy.get(".increase-positon__input")
        .type(data.amount).wait(1000)
        )
      });
      const proceed = cy.waitUntil(() =>
        cy
          .get(".increase-position-modal > .ui-button")
          .contains('Proceed')
          .should("be.visible")
          .click({ force: true })
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
          .first("div")
          .each(($div) => {
            cy.get(
              '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button'
            );
            cy.get(
              '[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button > .fa'
            ).click({ force: true });
          });
        const confirm = cy
          .get(".ui-modaldialog__footer")
          .get(".ui-modaldialog__footer > .ui-button--green");
        confirm.click({ force: true });
        const msgCancel = cy.waitUntil(() =>
          cy
            .get(".notification-text__text")
            .should("be.visible")
            .should(
              "contain",
              `Margin market sell order of ${data.amount} BTC has been fully executed`
            )
        );
      });
    });
    return this;
  }
}
export default longPosition;
