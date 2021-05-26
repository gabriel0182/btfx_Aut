class fundingBid {
  goFundingPage() {
    const fundingTab = cy.waitUntil(() =>
      cy
        .get(":nth-child(3) > .header__nav-button")
        .click()
        .get("div.header__dropdown-menu")
        .within(() => {
          cy.get('[href="/funding"]').contains("Funding").click();
        })
    );
    const verifyPageLoads = cy.waitUntil(() =>
      cy
        .get("div#book-bids")
        .should("be.visible", true)
        .get("div#book-asks")
        .should("be.visible", true)
    );
    return this;
  }
  selectTicker() {
    const testData = require("../../fixtures/funding.json");
    testData.forEach((testDataRow) => {
      const data = {
        ticker: testDataRow.ticker,
      };
      context(`Generating a test for ${data.ticker}`, () => {
        const searchTicker = cy
          .get("div.tickerlist__search")
          .get("input#ticker-search-input")
          .click();
        searchTicker.type(`${data.ticker}{enter}`);
        const selectTicker = cy;
        cy.get("div.pair-table-body").within(() => {
          cy.get("span.table-vir__cell")
            .get('[href="/f/USD"]')
            .contains(`${data.ticker}`)
            .click();
        });
        const verifyTicker = cy
          .get(".main-ticker__items > :nth-child(1)")
          .get(":nth-child(1) > .trigger > h5 > span")
          .should("contain", `${data.ticker}`);
      });
      return this;
    });
  }
  requiredFields() {
    const usdBid = cy.get("div.bfx-ui-of-sr").within(() => {
      cy.get("button.ui-button--green").click();
    });
    const msg = cy.waitUntil(() =>
      cy.get(".notification-text__text").should("be.visible")
    );
    const verifyMsg = cy.waitUntil(() =>
      cy
        .get(".notification-text__text")
        .should("contain", "Rate required, Amount required, Period required")
        .get(".notification__wrapper")
        .get(".notification__skip")
        .click({ multiple: true }, { force: true })
    );
    const validateRate = cy
      .get("input#rateInput")
      .clear()
      .type("-1")
      .get("input#amountInput")
      .clear()
      .type("1")
      .get("input#periodInput")
      .clear()
      .type("2")
      .get("div.bfx-ui-of-sr")
      .within(() => {
        cy.get("button.ui-button--green").click();
      })
      .get(".notification-text__text")
      .should("contain", "Rate: invalid")
      .get(".notification__skip")
      .click({ multiple: true }, { force: true });
    const validateAmount = cy
      .get("input#rateInput")
      .clear()
      .type("1")
      .get("input#amountInput")
      .clear()
      .type("-1")
      .get("input#periodInput")
      .clear()
      .type("2")
      .get("div.bfx-ui-of-sr")
      .within(() => {
        cy.get("button.ui-button--green").click();
      })
      .get(".notification-text__text")
      .should("contain", "Amount is negative")
      .get(".notification__skip")
      .click({ multiple: true }, { force: true });
      const validateMinAmount = cy
      .get("input#rateInput")
      .clear()
      .type("1")
      .get("input#amountInput")
      .clear()
      .type("10")
      .get("input#periodInput")
      .clear()
      .type("2")
      .get("div.bfx-ui-of-sr")
      .within(() => {
        cy.get("button.ui-button--green").click();
      })
      .get(".ui-modaldialog__footer")
      .get(".ui-modaldialog__footer > .ui-button--green")
      .click()
      const notification = cy.waitUntil(()=>
      cy.get(".notification-text__text")
      .should("contain", "Invalid offer: incorrect amount, minimum is 50 dollar or equivalent in USD.")
      .get(".notification__skip")
      .click({ multiple: true }, { force: true })
      );
    const validateMinPeriod = cy
      .get("input#rateInput")
      .clear()
      .type("1")
      .get("input#amountInput")
      .clear()
      .type("50")
      .get("input#periodInput")
      .clear()
      .type("1")
      .get("div.bfx-ui-of-sr")
      .within(() => {
        cy.get("button.ui-button--green").click();
      })
      .get(".ui-modaldialog__footer")
      .get(".ui-modaldialog__footer > .ui-button--green")
      .click()
      .get(".notification-text__text")
      .should("contain", "Invalid offer: minimum lending period is 2 days.")
      .get(".notification__skip")
      .click({ multiple: true }, { force: true });
      const validateMaxPeriod = cy
      .get("input#rateInput")
      .clear()
      .type("1")
      .get("input#amountInput")
      .clear()
      .type("50")
      .get("input#periodInput")
      .clear()
      .type("121")
      .get("div.bfx-ui-of-sr")
      .within(() => {
        cy.get("button.ui-button--green").click();
      })
      .get(".ui-modaldialog__footer")
      .get(".ui-modaldialog__footer > .ui-button--green")
      .click()
      .get(".notification-text__text")
      .should("contain", "Invalid offer: maximum lending period is 120 days.")
      .get(".notification__skip")
      .click({ multiple: true }, { force: true });
    return this;
  }
}
export default fundingBid;
