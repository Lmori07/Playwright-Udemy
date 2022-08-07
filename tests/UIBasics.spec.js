const { test, expect } = require("@playwright/test");

test("Browser PW testing code", async ({ browser }) => {
  /*In Javascript code is async that mean is not run in squence, using command await it will
    JS that it needs to wait for that step to be completed. Also the '=>' represent anonymous function*/

  /*{browser} is curly brack represent an element of playwright and not a simple browser object for JS*/

  const initialBrowser = await browser.newContext();
  const page = await initialBrowser.newPage();
  await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
  console.log(await page.title());
});

test("Page PW testing code", async ({ page }) => {
  /*Depending on he parameters that are pass playwright will know if
    there are plugins or special feature pass on those method*/

  await page.goto("https://google.com");
  console.log(await page.title());
  /*Expect is the new to do the assertion, this must be exported as well from the main playwright module */
  await expect(page).toHaveTitle("Google");
});
