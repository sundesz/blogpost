// TODO:: save SERVER_BASE_URL in env file
const SERVER_BASE_URL = 'http://localhost:8080/api/v1';

describe('Blogpost app', function () {
  beforeEach(function () {
    cy.request('POST', `${SERVER_BASE_URL}/test/reset`);
    cy.visit('/');
  });

  it('front page can be opened', function () {
    cy.contains('Welcome to Blog post App');
  });
});
