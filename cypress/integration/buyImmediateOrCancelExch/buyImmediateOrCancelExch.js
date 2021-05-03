///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyImmediateCancel from "../PageObject/buyImmediateCancel.js";

const staging = new login();
const buyIC = new buyImmediateCancel();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  buyIC.trading();
});

When("I type the order required info", () => {
    buyIC.verifyFields();
    buyIC.orderInfo();
});

When("I select to Exchange Buy", () => {
    buyIC.buyButton();
});

Then("I verify the Immediate or Cancel buy order from Exchange wallet was created", () => {
    buyIC.successMsg();
});
