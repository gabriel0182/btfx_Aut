///  <reference types="cypress"/>

class login {
  landing() {
    cy.clearCookies("_bfx_session");
    cy.clearLocalStorage();
    return this;
  }
longIn(){
  cy.visitBitfinexAndLogin();
    return this;
}
verifyLoggedOn() {
   const accountName = cy.waitUntil(() =>
   cy
      .get(".page-footer__content > :nth-child(1) > :nth-child(1)")
      .get(":nth-child(1) > :nth-child(1) > .page-footer__title").should('be.visible')
      .scrollIntoView()
    .should("contain.text", "gabriel.aguar")
   )
    return this;
  }
}

export default login;
