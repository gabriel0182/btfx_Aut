///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyStopTIF from "../PageObject/buyStopTIF.js";
import buyStop from "../PageObject/buyStop.js";

const staging = new login();
const stopTIF = new buyStopTIF();
const stopBuy = new buyStop();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  stopTIF.trading();
});

When("I type the order required info", () => {
    stopTIF.verifyFields();
    stopBuy.requiredFields();
    stopTIF.orderInfo();
});

When("I select to Exchange Buy", () => {
    stopTIF.buyButton();
});

Then("I verify the stop order with TIF from Margin wallet was created", () => {
    stopTIF.successMsg();
    stopTIF.orderFilter();
    stopTIF.verifyTIF();
    stopTIF.cancelOrder();
});
