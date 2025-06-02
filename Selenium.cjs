
const { Builder, By, until } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

const options = new chrome.Options();
options.addArguments('--headless'); // Run headless
options.addArguments('--no-sandbox');
options.addArguments('--disable-dev-shm-usage');

(async function testApp() {
  let driver = await new Builder()
    .forBrowser('chrome')
    .setChromeOptions(options)
    .build();

  try {
    await driver.get('http://65.0.214.68:80');
    await driver.wait(until.titleContains("Story"), 5000);
    console.log("✅ Selenium test passed");
  } catch (err) {
    console.error("❌ Selenium test failed", err);
    process.exit(1);
  } finally {
    await driver.quit();
  }
})();
