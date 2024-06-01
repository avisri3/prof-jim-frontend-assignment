/// <reference types="cypress" />

describe('Authentication Tests', () => {
  beforeEach(() => {
    cy.visit('/login');
  });

  it('should display the login page', () => {
    cy.get('.login-title').should('contain', 'LOGIN');
  });

  it('should allow the user to log in', () => {
    cy.get('input[name="username"]').type('emilys');
    cy.get('input[name="password"]').type('emilyspass');
    cy.get('button[type="submit"]').click();
  });

  it('should display an error with invalid credentials', () => {
    cy.get('input[name="username"]').type('wronguser');
    cy.get('input[name="password"]').type('wrongpassword');
    cy.get('button[type="submit"]').click();

    cy.get('.MuiAlert-message').should('contain', 'Invalid credentials');
  });

  it('should not navigate to dashboard if not logged in', () => {
    cy.visit('/dashboard');
    cy.url().should('include', '/login');
  });
});
