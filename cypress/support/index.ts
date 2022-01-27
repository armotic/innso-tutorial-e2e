import "./commands"

import { default as dayjs } from 'dayjs';
import { default as customParseFormat } from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat)
Cypress.dayjs = dayjs

Cypress.baseUrl = function () {
  return Cypress.config().baseUrl;
}

cy.on('uncaught:exception', (e) => {
  debugger;
})
