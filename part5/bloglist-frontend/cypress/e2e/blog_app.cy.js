describe('Blog app', function () {
  beforeEach(function () {
    cy.visit('http://localhost:3000')
  })
  it('front page can be opened', function () {
    cy.contains('Blogs')
  })

  it('login form can be opened', function () {
    cy.get('#username').type('SchwartenSchorschi')
    cy.get('#password').type('Schwarte')
    cy.get('#login-button').click()

    cy.contains('Schorsch Schorschinger logged-in')
  })
})