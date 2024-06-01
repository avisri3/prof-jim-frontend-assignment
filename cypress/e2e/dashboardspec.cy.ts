/// <reference types="cypress" />

describe('Dashboard Tests', () => {
  beforeEach(() => {
    // Log in before each test
    cy.visit('/login');
    cy.get('input[name="username"]').type('emilys');
    cy.get('input[name="password"]').type('emilyspass');
    cy.get('button[type="submit"]').click();

    // Wait for the URL to include /dashboard, indicating that we have logged in successfully
    cy.url({ timeout: 10000 }).should('include', '/dashboard');

    // Wait for products to load
    cy.get('.product-card', { timeout: 10000 }).should('have.length.greaterThan', 0);
  });

  it('should display the navbar', () => {
    cy.get('.navbar-username').should('contain', 'Welcome, emilys');
  });

  it('should load products on the dashboard', () => {
    cy.get('.product-card').should('have.length.greaterThan', 0);
  });


  it('should add a new product', () => {
    cy.get('button[aria-label="add"]').click();
    cy.get('input[name="name"]').type('New Product');
    cy.get('input[name="price"]').type('10');
    cy.get('input[name="rating"]').type('5');
    cy.get('button').contains('Save').click();

    // Wait for the new product to appear
    cy.get('.product-card').should('contain', 'New Product');
  });

  it('should edit a product', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('button[aria-label="edit"]').click();
    });
    cy.get('input[name="name"]').clear().type('Updated Product');
    cy.get('button').contains('Save').click();

    // Wait for the product to be updated
    cy.get('.product-card').first().should('contain', 'Updated Product');
  });

  it('should delete a product', () => {
    cy.get('.product-card').first().within(() => {
      cy.get('button[aria-label="delete"]').click();
    });
    cy.get('button').contains('Confirm').click();

    // Wait for the product to be removed
    cy.get('.product-card').should('have.length.lessThan', Cypress.$('.product-card').length+1);
  });

  it('should log out', () => {
    cy.get('button').contains('Logout').click();
    cy.url().should('include', '/login');
  });
});
