/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject = any> {
    /**
     * Scopes all subsequent cy commands to within this iframe.
     * @example cy.get('iframe').withinIframe(($body) => {
     *   cy.get() will only search for elements within form,
     *   not within the entire document
     * })
     */
    withinIframe(fn: (currentSubject: Subject) => void): Chainable<Subject>
  }
}
