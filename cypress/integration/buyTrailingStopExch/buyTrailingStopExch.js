///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import trailingStopExch from "../PageObject/trailingStopExch.js";

const staging = new login();
const trailingStop = new trailingStopExch();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  trailingStop.trading();
});

When("I type the order required info", () => {
    trailingStop.verifyFields();
    trailingStop.orderInfo();
});

When("I select to Exchange Buy", () => {
    trailingStop.buyButton();
});

Then("I verify the Trailing Stop buy order from Exchange wallet was created", () => {
    trailingStop.successMsg();
    trailingStop.cancelOrder();
});
