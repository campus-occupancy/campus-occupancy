import { landingPage } from './landing.page';
import { signinPage } from './signin.page';
import { signupPage } from './signup.page';
import { navBar } from './navbar.component';
import { dataPage } from './data.page';
import { editdataPage } from './editdata.page';

/* global fixture:false, test:false */

/** Creates the credential for this test. */
const user = `user-${new Date().getTime()}@foo.com`;
const credentials = { username: user, password: 'PASSWORD', firstName: 'test', lastName: 'app' };

fixture('Campus-Occupancy localhost test with default db')
    .page('http://localhost:3000');

test('Test that landing page displays', async (testController) => {
  await landingPage.isDisplayed(testController);
});

test('Test Create New Account', async (testController) => {
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, credentials.username, credentials.password);
});

test('Test that the login button at landing page works', async (testController) => {
  await landingPage.isDisplayed(testController);
  await landingPage.gotToLogIn(testController);
  await signinPage.isDisplayed(testController);
});

test('Test that signin and signout work', async (testController) => {
  await landingPage.gotToLogIn(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that signup page, then logout works', async (testController) => {
  // Create a new user email address that's guaranteed to be unique.
  const newUser = `newUser-${new Date().getTime()}@foo.com`;
  await navBar.gotoSignupPage(testController);
  await signupPage.isDisplayed(testController);
  await signupPage.signupUser(testController, newUser, credentials.password);
  // New user has successfully logged in, so now let's logout.
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that Data page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoDataPage(testController);
  await dataPage.isDisplayed(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});

test('Test that Import data page displays', async (testController) => {
  await navBar.ensureLogout(testController);
  await navBar.gotoSigninPage(testController);
  await signinPage.signin(testController, credentials.username, credentials.password);
  await navBar.gotoEditDataPage(testController);
  await editdataPage.isDisplayed(testController);
  await navBar.logout(testController);
  await landingPage.isDisplayed(testController);
});
