///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import sellStop from "../PageObject/sellStop.js";

const staging = new login();
const stopSell = new sellStop();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
  stopSell.trading();
});

When("I type the order required info", () => {
  stopSell.orderInfo();
});

When("I select to Exchange sell", () => {
  stopSell.buyButton();
});

Then("I verify the stop order was created", () => {
  stopSell.successMsg();
  stopSell.cancelSellOrder();
});