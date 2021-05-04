///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyMarket from "../PageObject/buyMarket.js";
import sellMarket from "../PageObject/sellMarket.js";

const staging = new login();
const buyMk = new buyMarket();
const sellMk = new sellMarket();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  sellMk.trading();
});

When("I type the order required info", () => {
    buyMk.verifyFields();
    sellMk.requiredFields();
    sellMk.orderInfo();
});

When("I select to Margin Sell", () => {
    sellMk.sellButton();
});

Then("I verify the Market sell order from Margin wallet was created", () => {
    sellMk.successMsg();
    sellMk.orderFilter();
    sellMk.cancelPosition();
});
