describe('Customer IO Login Test', () => {
  let secret = "75jcclk4cttgqqzk";  

  beforeEach(() => {
    //cypress test view size
    cy.viewport(1280, 800)
    //visit the URL
    cy.visit('https://fly.customer.io/login')
    //enter email
    cy.get('.fly-form-control').type('nigara.kewir@gmail.com')
    //click submit
    cy.get('.cio-login__submit').click()
    //enter password
    cy.get('.fly-form-control').type('Nigara12345!')
    //click submit
    cy.get('.cio-login__submit').click()
    //2FA
    cy.task('generateToken', secret)
    .then(token => {
      cy.get("[name ='2fa_code']").type(token)
      cy.get(".cio-login__submit").click()
  })
  })

  it('Add New Source Happy Path', () => {
    cy.contains('Sources').click()
    cy.contains('Add source').click()
    cy.contains('HTTP').click()
    cy.xpath("//*[contains(@class,'mantine-Button-label') and contains(text(),'Next')]").click()
    cy.contains('Save & Complete Later').click()
    cy.contains('Install Source').click()
    cy.contains('Enable source').click()
    cy.contains('Yes, enable source').click()
    cy.contains('Actions').click()
    cy.contains('Delete source').click()
    cy.contains('Yes, delete source').click()
    
  })
})