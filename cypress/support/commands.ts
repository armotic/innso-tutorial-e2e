Cypress.Commands.add('input', (name) => {
  return cy.get(`[name="${name}"]`)
})

Cypress.Commands.add('withinIframe', {
    prevSubject: true,
}, ($iframe: JQuery, method) => {
    cy.wrap($iframe, { log: false, timeout: 10000 })
        .should(($i: JQuery) => assert.exists($i.contents(), "iframe is created"))
        .and(_ => {
            const iframeDocument = $iframe.contents()[0] as Document
            assert.isTrue(iframeDocument.URL !== "about:blank", "iframe is loaded")
        })
        .then(($i: JQuery) => cy.wrap($i.contents(), { log: false }).find('html', { log: false }).within(method))
})

chai.Assertion.addMethod('multiline-text', function (expectedString: string) {
  const $element = this._obj
  if (!new chai.Assertion($element).to.be.exist) {
    return;
  }
  const actualText = $element.text().trim().replaceAll('\r\n', '\n')
    .split('\n').map(s => s.trim()).reduce((one, two) => one + '\n' + two)
  const expected = expectedString.trim()
  this.assert(
    actualText.includes(expected)
    , 'expected #{this} to have text or value #{exp}, found #{act}'
    , 'expected #{this} not to have text or value #{exp}, found #{act}'
    , expected
    , actualText
  );
});

chai.Assertion.addMethod('textOrValue', function (expectedString: string) {
  const $element = this._obj
  if (!new chai.Assertion($element).to.be.exist) {
    return;
  }
  const actualText = $element.text().trim()
  const actualValue = $element.val()
  const expected = expectedString.trim()
  this.assert(
    actualValue === expected || actualText === expected
    , 'expected #{this} to have text or value #{exp}, found #{act}'
    , 'expected #{this} not to have text or value #{exp}, found #{act}'
    , expected
    , actualValue || actualText
  );
});