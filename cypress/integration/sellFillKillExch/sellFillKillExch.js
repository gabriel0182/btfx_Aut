///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import sellFillKill from "../PageObject/sellFillKill.js";
import buyFillKill from "../PageObject/buyFillKill.js";

const staging = new login();
const sellFK = new sellFillKill();
const buyFK = new buyFillKill();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
});

When("I go to Trading page", () => {
    sellFK.trading();
});

When("I type the order required info", () => {
    buyFK.verifyFields();
    sellFK.orderInfo();
});

When("I select to Exchange Sell", () => {
    sellFK.sellButton();
});

Then("I verify the Fill or Kill sell order from Exchange wallet was created", () => {
    sellFK.successMsg();
});
