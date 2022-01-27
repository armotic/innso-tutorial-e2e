/// <reference path="../../../support/index.d.ts" />

import { Given, When, Then } from "cypress-cucumber-preprocessor/steps";

Then(/^I should have (\d+) items$/, (count: number) => {
  cy.get('.todo-list li').should('have.length', count)
});

Then(/^(\w+) item should be '(.+)'$/, (selector: string, item: string) => {
  cy.get('.todo-list li')[selector]().should('have.text', item)
});

When(/^I add the item '(.+)'$/, (newItem: string) => {
  cy.get('[data-test=new-todo]').type(`${newItem}{enter}`)
});

When(/^I check the item '(.+)'$/, (item: string) => {
  cy.contains(item)
    .parent()
    .find('input[type=checkbox]')
    .check()
});

Then(/^the item '(.+)' should be (\w+)$/, (item: string, status: string) => {
  cy.contains(item)
    .parents('li')
    .should('have.class', status)
});