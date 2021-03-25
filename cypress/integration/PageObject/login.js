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
  /*const notUS = cy
    .get('.ui-modaldialog__footer')
    .get('.ui-modaldialog__footer > :nth-child(2)')
    notUS.click({ force: true })
    notUS.wait(5000)
    return this;*/
  verifyLoggedOn() {
    const accountName = cy
      .get(".page-footer__content > :nth-child(1) > :nth-child(1)")
      .get(":nth-child(1) > :nth-child(1) > .page-footer__title")
      .scrollIntoView();
    accountName.should("contain.text", "gabriel.aguar");
    return this;
  }
}

export default login;
