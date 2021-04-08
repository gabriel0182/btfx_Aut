///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import limitSellExch from "../PageObject/limitSellExch.js";

const staging = new login();
const limitSell = new limitSellExch();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
    limitSell.trading();
});

When("I type the order required info", () => {
    limitSell.orderInfo();
});

When("I select to Exchange sell", () => {
    limitSell.buyButton();
});

Then("I verify the limit sell order was created", () => {
    limitSell.successMsg();
    limitSell.cancelSellOrder();
});
