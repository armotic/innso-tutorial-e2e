/// <reference types="cypress" />

Cypress.Cookies.defaults({
  preserve: ['JSESSIONID', 'LOCAL']
})

cy.on('uncaught:exception', (e) => {
  debugger;
})
