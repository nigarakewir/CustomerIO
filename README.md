# Automation repo for Customer.IO

## Getting Started

1. Install npm
2. Run `npm install` to properly install the project's dependencies
3. `npm install cypress --save-dev`
4. `npm install otplib --save-dev`
5. `npm install -D cypress-xpath`

**Note:** If you're creating these variables in your cypress.env.json file, you just omit the CYPRESS_ prefix

## How to run the tests

To run the tests using Cypress' UI run

`npx cypress open`

This will open the UI and you can work your way to the e2e tests and run from there.

To run the tests using your terminal run

`npx cypress run`

or

`npx cypress run --spec "cypress/e2e/fileName.cy.js"`