///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyImmediateCancel from "../PageObject/buyImmediateCancel.js";
import sellImmediateCancel from "../PageObject/sellImmediateCancel.js";

const staging = new login();
const buyIC = new buyImmediateCancel();
const sellIC = new sellImmediateCancel();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  sellIC.trading();
});

When("I type the order required info", () => {
    buyIC.verifyFields();
    sellIC.requiredFields();
    sellIC.orderInfo();
});

When("I select to Exchange Sell", () => {
    sellIC.sellButton();
});

Then("I verify the Immediate or Cancel sell order from Exchange wallet was created", () => {
    sellIC.successMsg();
});
