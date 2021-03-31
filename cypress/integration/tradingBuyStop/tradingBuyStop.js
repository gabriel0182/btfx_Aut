///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyStop from "../PageObject/buyStop.js";

const staging = new login();
const stop = new buyStop();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
  stop.trading();
});

When("I type the order required info", () => {
  stop.orderInfo();
});

When("I select to Exchange Buy", () => {
  stop.buyButton();
});

Then("I verify the stop order was created", () => {
  stop.successMsg();
  stop.cancelOrder();
});
