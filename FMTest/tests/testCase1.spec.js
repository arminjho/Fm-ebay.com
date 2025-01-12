const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");
const fs = require("fs");

describe("eBay Login Test", function () {
	this.timeout(90000); // Increased timeout for more robust testing

	let driver;

	before(async function () {
		// Comprehensive Chrome options
		const options = new chrome.Options();
		options.addArguments(
			"--start-maximized",
			"--disable-extensions",
			"--disable-gpu",
			"--no-sandbox",
			"--disable-dev-shm-usage",
			"--remote-debugging-port=9222",
			"--window-size=1920,1080",
			"user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
		);

		// Optional: Headless mode if needed
		// options.addArguments("--headless");

		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(options)
			.build();
	});

	it("should login to eBay successfully", async function () {
		try {
			// Navigate to eBay
			await driver.get("https://www.ebay.com/");

			// Wait and find Sign In link with multiple strategies
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

			// Wait for page load and username input
			await driver.wait(until.urlContains("signin"), 10000);

			// Find username input with multiple selectors
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

			// Wait for successful login indicator
			const greetingElement = await driver.wait(
				until.elementLocated(
					By.css("#gh-ug, .user-greeting, [data-test-id='header-profile-menu']")
				),
				20000
			);

			const greetingText = await greetingElement.getText();

			// Flexible login verification
			assert(
				greetingText.toLowerCase().includes("hi") ||
					greetingText.toLowerCase().includes("welcome"),
				"Login failed: Greeting text not found"
			);

			// Optional: Add a small delay
			await driver.sleep(3000);
		} catch (error) {
			console.error("Detailed Login Error:", error);

			// Take and save screenshot on failure
			const screenshot = await driver.takeScreenshot();
			fs.writeFileSync("login-error-screenshot.png", screenshot, "base64");

			throw error;
		}
	});

	after(async function () {
		if (driver) {
			await driver.quit();
		}
	});
});
