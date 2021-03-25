///  <reference types="cypress"/>

import login from "../PageObject/login.js";

const staging = new login();

Given("I visit the homepage", () => {
  staging.landing();
});

When("I type my user and pass", () => {
  staging.inputCredentials();
 
});

When("Click on the login button", () => {
  staging.loginButton();
  
});

Then("I verify my user is logged on", () => {
  staging.verifyLoggedOn();
});
