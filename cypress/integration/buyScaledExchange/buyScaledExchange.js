///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyscaled from "../PageObject/buyscaled.js";

const staging = new login();
const buyscld = new buyscaled();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I type the order required info", () => {
  buyscld.trading();
  buyscld.verifyFields();
  buyscld.orderInfo();
});

When("I select to Exchange Submit", () => {
  buyscld.submitButton();
});

Then("I verify the Scaled order from Exchange wallet was created", () => {
  buyscld.successMsg();
  buyscld.cancelOrder();
});
