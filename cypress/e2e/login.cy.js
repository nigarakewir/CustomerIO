describe('Customer IO Login Test', () => {
  let connectionName = 'AutomationTest'

  beforeEach(() => {
    //cypress test view size
    cy.viewport(1280, 800)
    //visit the URL
    cy.visit('https://fly.customer.io/login')
    //enter email
    cy.get('.fly-form-control').type(Cypress.env('user_name'))
    //click submit
    cy.get('.cio-login__submit').click()
    //enter password
    cy.get('.fly-form-control').type(Cypress.env('user_password'))
    //click submit
    cy.get('.cio-login__submit').click()
    //2FA
    cy.task('generateToken', Cypress.env('secret_token'))
    .then(token => {
      cy.get("[name ='2fa_code']").type(token)
      cy.get(".cio-login__submit").click()
  })
  })

  it('Add New Source Happy Path', () => {
    //verify user landed on the home page
    cy.url().should('include', '/workspaces')
    //select sources
    cy.contains('Sources').click()
    cy.contains('Add source').click()
    //verify add source page title
    cy.get('.mantine-zjoxxh').should('have.text', 'Select a source')
    cy.get('.mantine-oancs2').should('have.text', 'First, choose the source that you want to connect.')
    //select HTTP
    cy.contains('HTTP').click()
    cy.xpath("//*[contains(@class,'mantine-Button-label') and contains(text(),'Next')]").click()
    //verify token is NOT empty
    cy.get('.token.plain').should('not.be.empty')
    //name the source
    cy.get('input').clear().type(connectionName)
    //save and complete later
    cy.contains('Save & Complete Later').click()
    cy.contains('Install Source').click()
    //verify source name
    cy.xpath("//h1[text()='Name']/../div").should('have.text', connectionName)
    cy.contains('Enable source').click()
    cy.contains('Yes, enable source').click()
    // retry warning message no longer exists
    cy.get('.mantine-Alert-wrapper').should('not.exist')
    //delete the source
    cy.contains('Actions').click()
    cy.contains('Delete source').click()
    cy.contains('Yes, delete source').click()
    //verify source is deleted
    cy.get('.mantine-Card-root').should('exist')
    cy.get('.mantine-acrxpd').should('include.text','Where data is created or stored')
  })
})