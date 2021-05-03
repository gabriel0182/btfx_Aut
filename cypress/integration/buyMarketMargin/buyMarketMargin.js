///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyMarket from "../PageObject/buyMarket.js";

const staging = new login();
const buyMk = new buyMarket();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  buyMk.trading();
});

When("I type the order required info", () => {
  buyMk.verifyFields();
  buyMk.orderInfo();
});

When("I select to Margin Buy", () => {
  buyMk.buyButton();
});

Then("I verify the Market buy order from Margin wallet was created", () => {
  buyMk.successMsg();
  buyMk.cancelPosition();
});
