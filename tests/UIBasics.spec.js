const { test, expect } = require("@playwright/test");

test.skip("Browser PW testing code", async ({ browser }) => {
  /*In Javascript code is async that mean is not run in squence, using command await it will tell
    JS that it needs to wait for that step to be completed. Also the '=>' represent anonymous function*/

  /*{browser} is curly brack represent an element of playwright and not a simple browser object for JS*/

  const initialBrowser = await browser.newContext();
  const page = await initialBrowser.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
  await page.locator("#username").type("rahulshettyacademy");
  await page.locator("[name=password]").type("pass");
  await page.locator("#signInBtn").click();
  console.log(await page.locator("[style*=block]").textContent());
  //Assertion
  await expect(page.locator("[style*=block]")).toContainText("Incorrect");

  await page.locator("[name=password]").fill("learning");
  /*we also need to identify if our application is client-side or not so we can used a wait
  mechanism that allow us to interact with the elements that we need*/

  /*This promise reeference is in place to let us know he will wait for Navigation even rigth
  after the click even because they are wrap up in a promise statement that will be executed
  and return something, this race condition will be covered and we are going to be able to
  get allTextContents, this is important when we are using method that does not support
  auto wait.*/
  await Promise.all([
    page.waitForNavigation(),
    page.locator("#signInBtn").click(),
  ]);
  //console.log(await page.locator(".card-body a").first().textContent());
  /*if we remove the line above this will fail, becuase playwright have not implemented yet
  a wait mechanism for allTextContest and will pring a bla array is still valid but will not
  print all header as we expected, but because the previous line is in effect it will wait until
  page load, so all element are loaded and allTextContest then can grab all the text and print it.*/
  console.log(await page.locator(".card-body a").allTextContents());
});

test.skip("Page PW testing code", async ({ page }) => {
  /*Depending on he parameters that are pass playwright will know if
    there are plugins or special feature pass on those method*/

  await page.goto("https://google.com");
  console.log(await page.title());
  /*Expect is the new to do the assertion, this must be exported as well from the main playwright module */
  await expect(page).toHaveTitle("Google");
});

test.only("UI Controls", async ({ page }) => {
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  const usernName = page.locator("#username");
  const signIn = page.locator("#signInBtn");
  const dropDown = page.locator("select.form-control");
  await dropDown.selectOption("teach");
  await page.locator(".radiotextsty").last().click();
  await page.locator("#okayBtn").click();
  console.log(await page.locator(".radiotextsty").last().isChecked());

  //assertion
  await expect(page.locator(".radiotextsty").last()).toBeChecked();

  await page.pause();
});
