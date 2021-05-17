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
  limitSell.trading();
});

When("I type the order required info", () => {
    limitBuy.verifyFields();
    limitSell.requiredFields();
    limitSell.validateMin();
    limitSell.validateMax();
    limitSell.orderInfo();
});

When("I select to Exchange sell", () => {
    limitSell.sellButton();
});

Then("I verify the limit sell order was created", () => {
    limitSell.successMsg();
    limitSell.orderFilter();
    limitSell.cancelSellOrder();
});
