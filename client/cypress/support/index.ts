/* eslint-disable @typescript-eslint/no-namespace */
/// <reference types="cypress" />

import { SignUp } from '../e2e/blogpost.cy';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
declare namespace Cypress {
  interface Chainable {
    createUser(signUpData: SignUp): void;
  }
}
