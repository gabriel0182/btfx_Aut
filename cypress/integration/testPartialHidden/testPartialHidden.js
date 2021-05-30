///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyLimitExch from "../PageObject/buyLimitExch.js";
import partialHidden from "../PageObject/partialHidden.js";

const staging = new login();
const limitExch = new buyLimitExch();
const ptHidden = new partialHidden();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  limitExch.trading();
});

When("I place a hidden limit order at the spread price", () => {
  ptHidden.placeLimit();
});

When(
  "I place a market order in the opposite direction for half the amount",
  () => {
    ptHidden.placeMarket();
  }
);

Then(
  "The hidden limit order will get partially filled for half the amount",
  () => {
    ptHidden.verifyPartialLabel();
    ptHidden.cancelOrders();
  }
);
