///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import trailingStopSellExch from "../PageObject/trailingStopSellExch.js";

const staging = new login();
const sellTrailingStop = new trailingStopSellExch();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
    sellTrailingStop.trading();
});

When("I type the order required info", () => {
    sellTrailingStop.orderInfo();
});

When("I select to Exchange Sell", () => {
    sellTrailingStop.sellButton();
});

Then("I verify the Trailing Stop sell order from Exchange wallet was created", () => {
    sellTrailingStop.successMsg();
    sellTrailingStop.cancelOrder();
});
