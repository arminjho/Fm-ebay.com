const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("eBay Product Search Test", function () {
	this.timeout(90000);
	let driver;

	before(async function () {
		// Set up Chrome options
		const options = new chrome.Options();
		options.addArguments(
			"--start-maximized",
			"--disable-extensions",
			"--disable-gpu",
			"--no-sandbox",
			"--disable-dev-shm-usage",
			"--window-size=1920,1080",
			"--disable-blink-features=AutomationControlled"
		);

		// Create driver
		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(options)
			.build();
	});

	it("should find specific product by ID", async function () {
		try {
			// Open eBay page
			await driver.get("https://www.ebay.com/");

			// Wait and click Sign In link with multiple strategies
			const signInLink = await driver.wait(
				until.elementLocated(
					By.xpath(
						"//a[contains(text(), 'Sign in') or contains(@href, 'signin')]"
					)
				),
				15000
			);

			// Scroll and click with multiple methods
			await driver.executeScript(
				"arguments[0].scrollIntoView({block: 'center'});",
				signInLink
			);
			await driver.sleep(2000);

			try {
				await signInLink.click();
			} catch {
				await driver.executeScript("arguments[0].click();", signInLink);
			}

			// Wait for username input with multiple selectors
			const usernameInput = await driver.wait(
				until.elementLocated(
					By.css("input[name='userid'], input[type='email']")
				),
				15000
			);

			// Ensure input is visible and interactable
			await driver.wait(until.elementIsVisible(usernameInput), 10000);

			// Clear and enter username
			await driver.executeScript("arguments[0].value = '';", usernameInput);
			await usernameInput.sendKeys("wifobeg145@fenxz.com");
			await driver.sleep(1000);

			// Find and click Continue button
			const continueButton = await driver.wait(
				until.elementLocated(
					By.css("#signin-continue-btn, button[type='submit']")
				),
				15000
			);

			await driver.wait(until.elementIsVisible(continueButton), 10000);

			try {
				await continueButton.click();
			} catch {
				await driver.executeScript("arguments[0].click();", continueButton);
			}

			// Wait for password input
			const passwordInput = await driver.wait(
				until.elementLocated(
					By.css("input[name='pass'], input[type='password']")
				),
				15000
			);

			await driver.wait(until.elementIsVisible(passwordInput), 10000);

			// Enter password
			await driver.executeScript("arguments[0].value = '';", passwordInput);
			await passwordInput.sendKeys("?yc4P*QvgCnVrN9");
			await driver.sleep(1000);

			// Find and click Sign In button
			const signInButton = await driver.wait(
				until.elementLocated(By.css("#sgnBt, button[type='submit']")),
				15000
			);

			await driver.wait(until.elementIsVisible(signInButton), 10000);

			try {
				await signInButton.click();
			} catch {
				await driver.executeScript("arguments[0].click();", signInButton);
			}

			// Wait for successful login
			await driver.wait(
				until.elementLocated(By.css("#gh-ug, .user-greeting")),
				20000
			);

			// Search for Macbook
			const searchInput = await driver.findElement(By.name("_nkw"));
			await searchInput.sendKeys("Macbook PRO 2017");
			await searchInput.sendKeys(Key.RETURN);

			// Wait for search results and handle potential overlay
			await driver.sleep(3000);

			// Try multiple strategies to find the specific product
			let specificProduct;
			try {
				// First, try direct ID locator
				specificProduct = await driver.wait(
					until.elementLocated(By.id("item1d80459273")),
					15000
				);
			} catch {
				// If direct ID fails, try XPath
				specificProduct = await driver.wait(
					until.elementLocated(
						By.xpath("//*[contains(@id, 'item1d80459273')]")
					),
					15000
				);
			}

			// Ensure element is visible and scroll into view
			await driver.wait(until.elementIsVisible(specificProduct), 10000);
			await driver.executeScript(
				"arguments[0].scrollIntoView({block: 'center'});",
				specificProduct
			);
			await driver.sleep(2000);

			// Assert that the specific product element exists and is displayed
			assert.ok(
				specificProduct,
				"Specific product with ID item1d80459273 not found"
			);

			// Optional: Check if element is displayed
			const isDisplayed = await specificProduct.isDisplayed();
			assert.ok(isDisplayed, "Specific product is not visible on the page");
		} catch (error) {
			console.error("Test failed:", error);

			// Take screenshot on failure
			const screenshot = await driver.takeScreenshot();
			require("fs").writeFileSync("error-screenshot.png", screenshot, "base64");

			throw error;
		}
	});

	after(async function () {
		if (driver) {
			await driver.quit();
		}
	});
});
