///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import trading from "../PageObject/trading.js";

const staging = new login();
const trd= new trading();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I Select a currency", () => {
  trd.currency()
});

Then("I verify the graph is shown", () => {
  trd.verifyCurrency();
 trd.checkBestValue();
  trd.checkMaxValue();
  trd.addAlert();
});

Then("I Verify Balance table is shown", () => {});
