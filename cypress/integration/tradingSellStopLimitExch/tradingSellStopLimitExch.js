///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import sellStopLimitExch from "../PageObject/sellStopLimitExch.js";
import stopLimitExch from "../PageObject/stopLimitExch.js";

const staging = new login();
const sellstopLmt = new sellStopLimitExch();
const stopLmt = new stopLimitExch();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
    sellstopLmt.trading();
});

When("I type the order required info", () => {
    stopLmt.verifyFields();
    sellstopLmt.orderInfo();
});

When("I select to Exchange sell from Exchange wallet", () => {
    sellstopLmt.sellButton();
});

Then("I verify the stop limit order was created", () => {
    sellstopLmt.successMsg();
    sellstopLmt.cancelOrder();
});
