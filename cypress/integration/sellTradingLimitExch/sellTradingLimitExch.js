///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import limitSellExch from "../PageObject/limitSellExch.js";
import buyLimitExch from "../PageObject/buyLimitExch.js";

const staging = new login();
const limitSell = new limitSellExch()
const limitBuy = new buyLimitExch()

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
    limitBuy.verifyFields();
    limitSell.trading();
});

When("I type the order required info", () => {
    limitSell.orderInfo();
});

When("I select to Exchange sell", () => {
    limitSell.sellButton();
});

Then("I verify the limit sell order was created", () => {
    limitSell.successMsg();
    //limitSell.cancelSellOrder();
});
