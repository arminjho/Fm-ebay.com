const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

describe("eBay Add to Watchlist Test", function () {
	this.timeout(90000);
	let driver;

	before(async function () {
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

		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(options)
			.build();
	});

	it("should add item to watchlist", async function () {
		try {
			// Open eBay page
			await driver.get("https://www.ebay.com/");

			// Click on the "Sign in" link with multiple strategies
			const signInLink = await driver.wait(
				until.elementLocated(By.xpath("//a[contains(text(), 'Sign in')]")),
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

			// Wait for username input and enter email
			const usernameInput = await driver.wait(
				until.elementLocated(By.name("userid")),
				15000
			);
			await driver.wait(until.elementIsVisible(usernameInput), 10000);
			await driver.executeScript("arguments[0].value = '';", usernameInput);
			await usernameInput.sendKeys("wifobeg145@fenxz.com");
			await driver.sleep(1000);

			// Click Continue button with multiple strategies
			const continueButton = await driver.findElement(
				By.id("signin-continue-btn")
			);
			try {
				await continueButton.click();
			} catch {
				await driver.executeScript("arguments[0].click();", continueButton);
			}

			// Wait for password input and enter password
			const passwordInput = await driver.wait(
				until.elementLocated(By.name("pass")),
				15000
			);
			await driver.wait(until.elementIsVisible(passwordInput), 10000);
			await driver.executeScript("arguments[0].value = '';", passwordInput);
			await passwordInput.sendKeys("?yc4P*QvgCnVrN9");
			await driver.sleep(1000);

			// Click Sign In button with multiple strategies
			const signInButton = await driver.findElement(By.id("sgnBt"));
			try {
				await signInButton.click();
			} catch {
				await driver.executeScript("arguments[0].click();", signInButton);
			}

			// Wait for user greeting to confirm login
			await driver.wait(until.elementLocated(By.id("gh-ug")), 20000);

			// Enter search term
			const searchInput = await driver.findElement(By.name("_nkw"));
			await searchInput.sendKeys("samsung galaxy watch 6 classic 47mm");
			await searchInput.sendKeys(Key.RETURN);

			// Wait and handle potential overlays
			await driver.sleep(3000);

			// Find watchlist heart with multiple strategies
			let watchlistHeart;
			try {
				watchlistHeart = await driver.wait(
					until.elementLocated(By.className("s-item__watchheart")),
					15000
				);
			} catch {
				// Alternative locator if first fails
				watchlistHeart = await driver.wait(
					until.elementLocated(By.css("[aria-label='Watch this item']")),
					15000
				);
			}

			// Scroll to element and use multiple click strategies
			await driver.executeScript(
				"arguments[0].scrollIntoView({block: 'center'});",
				watchlistHeart
			);
			await driver.sleep(2000);

			try {
				await watchlistHeart.click();
			} catch {
				try {
					await driver.executeScript("arguments[0].click();", watchlistHeart);
				} catch {
					// If JavaScript click fails, use Actions
					const actions = driver.actions();
					await actions.move({ origin: watchlistHeart }).click().perform();
				}
			}

			// Navigate to watchlist
			await driver.get("https://www.ebay.com/mye/myebay/watchlist");

			// Check for add to custom list button
			const addToListButton = await driver.wait(
				until.elementLocated(
					By.css(
						'button[aria-disabled="true"][data-template="ADD_TO_LIST_TEMPLATE"][accesskey="a"]'
					)
				),
				15000
			);

			// Assert button exists
			const buttonText = await addToListButton.getText();
			assert.notStrictEqual(
				buttonText,
				"",
				"Add to custom list button is not present"
			);
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
