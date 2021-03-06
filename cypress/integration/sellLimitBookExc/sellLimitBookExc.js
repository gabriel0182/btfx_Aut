///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyLimitBook from "../PageObject/buyLimitBook.js";
import sellLimitBook from "../PageObject/sellLimitBook.js";

const staging = new login();
const limitBk = new buyLimitBook();
const sellLimitBk = new sellLimitBook();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  sellLimitBk.trading();
});

When("I type the order required info", () => {
  limitBk.verifyFields();
  sellLimitBk.orderInfo();
});

When("I select and order from the book", () => {
    sellLimitBk.selectField();
});

Then(
  "I verify the Limit Order Book sell order from Exchange wallet was created",
  () => {
    sellLimitBk.successMsg();
  }
);
