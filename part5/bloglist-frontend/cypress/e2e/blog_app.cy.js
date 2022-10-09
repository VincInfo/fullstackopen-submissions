describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Test Name',
      username: 'TestUsername',
      password: 'TestPassword'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })
  it('Login from is shown', function () {
    cy.contains('Blogs')
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('User can not log in with wrong credentials', function () {
      cy.get('#username').type('TestUsername')
      cy.get('#password').type('wrong')
      cy.get('#login-button').click()

      cy.contains('error')
      cy.contains('login')
    })

    it('User can log in with correct credentials', function () {
      cy.get('#username').type('TestUsername')
      cy.get('#password').type('TestPassword')
      cy.get('#login-button').click()

      cy.contains('Test Name logged-in')
    })
  })

  describe('when logged in', function () {
    beforeEach(function () {
      cy.get('input:first').type('TestUsername')
      cy.get('input:last').type('TestPassword')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function () {
      cy.contains('new blog').click()
      cy.get('#title').type('TestTitle')
      cy.get('#author').type('TestAuthor')
      cy.get('#url').type('TestUrl')
      cy.contains('add')
    })

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.contains('new blog').click()
        cy.get('#title').type('TestTitle1')
        cy.get('#author').type('TestAuthor1')
        cy.get('#url').type('TestUrl1')
        cy.get('#add-button').click()

        cy.contains('new blog').click()
        cy.get('#title').type('TestTitle2')
        cy.get('#author').type('TestAuthor2')
        cy.get('#url').type('TestUrl2')
        cy.get('#add-button').click()

        cy.contains('new blog').click()
        cy.get('#title').type('TestTitle3')
        cy.get('#author').type('TestAuthor3')
        cy.get('#url').type('TestUrl3')
        cy.get('#add-button').click()
      })

      it('User can like a blog', function () {
        cy.contains('new blog').click()
        cy.contains('TestTitle2').parent().contains('show').click().parent().parent()
          .contains('like').click()
        cy.contains('blog TestTitle2 successfully updated')
      })

      it('User can delete a blog', function () {
        cy.contains('new blog').click()
        cy.contains('TestTitle2').parent().contains('show').click().parent().parent()
          .contains('remove').click()
        cy.contains('blog TestTitle2 successfully deleted')

        // cy.contains('new blog').click()
        cy.should('not.contain', 'TestTitle2 - TestAuthor2')
      })

      describe('and they have likes', async function () {
        beforeEach(function () {
          cy.contains('new blog').click()
          cy.contains('TestTitle1').parent().contains('show').click().parent().parent()
            .contains('like').click().wait(500).click()

          // cy.contains('new blog').click()
          cy.contains('TestTitle2').parent().contains('show').click().parent().parent()
            .contains('like').click().wait(500).click().wait(500).click().wait(500).click()

          // cy.contains('new blog').click()
          cy.contains('TestTitle2').parent().contains('show').click().parent().parent()
            .contains('like').click().wait(500).click().wait(500).click()
        })

        it.only('Blogs are ordered according to likes', function () {
          cy.get('.blog').eq(0).should('contain', 'TestTitle2')
          cy.get('.blog').eq(1).should('contain', 'TestTitle3')
          cy.get('.blog').eq(2).should('contain', 'TestTitle1')

        })
      })


    })
  })
})