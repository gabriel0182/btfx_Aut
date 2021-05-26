///  <reference types="cypress"/>

import login from "../PageObject/login.js";
import fundingBid from "../PageObject/fundingBid.js";

const staging = new login();
const bid = new fundingBid();

Given("I go to funding page", () => {
  staging.landing();
  staging.longIn();
  bid.goFundingPage();
});

When("I select a Ticker", () => {
  bid.selectTicker();
});

When("I fill out all the required fields", () => {
  bid.requiredFields();
});

Then("I verify the bid was created", () => {
    
});
