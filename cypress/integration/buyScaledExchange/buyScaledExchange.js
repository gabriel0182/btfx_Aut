///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyScaled from "../PageObject/buyScaled.js";

const staging = new login();
const buyScld = new buyScaled();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I type the order required info", () => {
  buyScld.trading();
  buyScld.verifyFields();
  buyScld.requiredFields();
  buyScld.orderInfo();
});

When("I select to Exchange Submit", () => {
  buyScld.submitButton();
});

Then("I verify the Scaled buy order from Exchange wallet was created", () => {
  buyScld.successMsg();
  buyScld.orderFilter();
  buyScld.sortingOrdersTable();
  buyScld.cancelOrder();
});
