/// <reference types="cypress" />

Cypress.Commands.add('withinIframe', {
    prevSubject: true,
}, ($iframe, method) => {
    cy.wrap($iframe, { log: false, timeout: 10000 })
        .should(i => assert.exists(i.contents(), "iframe is created"))
        .and(_ => assert.isTrue($iframe.contents()[0].URL !== "about:blank", "iframe is loaded"))
        .then(i => cy.wrap(i.contents(), { log: false }).find('html', { log: false }).within(method))
})
