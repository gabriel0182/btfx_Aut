import { type } from "ramda";

class shortPosition {
  addPosition() {
    const tradingTab = cy.get(
      ".header__nav-buttons-wrapper > .header__nav-trading"
    );
    tradingTab.click({ force: true });
    const add = cy
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button'
      )
      .get(
        '[style="display: flex; align-items: baseline;"] > .trigger > .ui-button > .fa'
      )
      .scrollIntoView();
    add.click({ force: true });
    add.wait(1000);
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
        const selectType = cy
          .get(".ui-modaldialog__body")
          .get(".themed-react-select__value-container");
        selectType.type(`${data.type}{enter}{enter}`);
        selectType.wait(1000);
        const short = cy
          .get(".ui-radioinput > :nth-child(2)")
          .get(":nth-child(2) > .circle");
        short.click({ force: true });
        const positionAmount = cy.get(".increase-positon__input");
        positionAmount.type(data.amount);
        positionAmount.wait(1000);
      });
      const proceed = cy.get(".increase-position-modal > .ui-button");
      proceed.click({ force: true });
    });
    return this;
  }
  successMsg() {
    const msg = cy.get(".notification-text__text").invoke("text");
    msg.should("contain", "Submitting position increase");
    msg.wait(4000);
    return this;
  }
  cancelPosition(){
    const testData = require("../../fixtures/positions.json");
    testData.forEach((testDataRow) => {
      const data = {
        amount: testDataRow.amount
      };
      context(`Generating a test for ${data.amount}`, () => {
    const positionsTable = cy
    .get('[style="height: 25px; width: 100%;"] > .table-vir__row')
    .get('div')
    .first('div')
    .each(($div)=>{
      cy.get('[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button')
      cy.get('[style="flex: 0 1 110px;"] > div > :nth-child(1) > .ui-button > .fa')
    .click({force:true})
    })
    const confirm = cy
    .get('.ui-modaldialog__footer')
    .get('.ui-modaldialog__footer > .ui-button--green')
    confirm.click({force:true})
    confirm.wait(2000)
    const msgCancel = cy.get(".notification-text__text").invoke("text");
    msgCancel.should("contain", `Margin market buy order of ${data.amount} BTC has been fully executed`);
  });
});
    return this;
  }
}
export default shortPosition;
