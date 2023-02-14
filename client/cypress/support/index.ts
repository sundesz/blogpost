/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

interface ISignUp {
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    createUser(signUpData: ISignUp): void;
  }
}
