///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyLimitBook from "../PageObject/buyLimitBook.js";

const staging = new login();
const limitBk = new buyLimitBook();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  limitBk.trading();
});

When("I type the order required info", () => {
  limitBk.verifyFields();
  limitBk.requiredFields();
  limitBk.orderInfo();
});

When("I select and order from the book", () => {
  limitBk.selectField();
});

Then(
  "I verify the Limit Order Book buy order from Exchange wallet was created",
  () => {
    limitBk.successMsg();
  }
);
