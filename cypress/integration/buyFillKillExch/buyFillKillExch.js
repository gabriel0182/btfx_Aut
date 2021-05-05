///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import buyFillKill from "../PageObject/buyFillKill.js";

const staging = new login();
const buyFK = new buyFillKill();

Given("I go to Trading page", () => {
  staging.landing();
  staging.longIn();
  buyFK.trading();
});

When("I type the order required info", () => {
    buyFK.verifyFields();
    buyFK.requiredFields();
    buyFK.orderInfo();
});

When("I select to Exchange Buy", () => {
    buyFK.buyButton();
});

Then("I verify the Fill or Kill buy order from Exchange wallet was created", () => {
    buyFK.successMsg();
});
