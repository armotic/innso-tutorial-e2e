/// <reference path="../../../support/index.d.ts" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Given("I'm visiting {string}", function (path: string) {
  cy.visit(path)
});
