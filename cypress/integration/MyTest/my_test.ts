/// <reference path="../../support/index.d.ts" />

import {Given, When, Then} from "cypress-cucumber-preprocessor/steps";

Given('a user visiting the action\'s page', () => {
    cy.visit('https://example.cypress.io/commands/actions')
})

When('he writes his email', () => {
    cy.get('.action-email')
        .type('fake@email.com')
        .should('have.value', 'fake@email.com')
})

Then('it should appear', () => {
    cy.get('.action-email')
        .should('have.value', 'fake@email.com')
})