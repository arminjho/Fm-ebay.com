const { Builder, By, until, Key } = require("selenium-webdriver");
const assert = require("assert");
const chrome = require("selenium-webdriver/chrome");

// Increase global timeout
describe("eBay Search and Sort Test", function () {
	// Increase timeout to 30 seconds
	this.timeout(30000); // Add this line

	let driver;

	before(async function () {
		// Increase timeout for this specific hook if needed
		this.timeout(30000);

		let options = new chrome.Options();
		driver = await new Builder()
			.forBrowser("chrome")
			.setChromeOptions(options)
			.build();
	});

	it("should search for laptops and sort by price", async function () {
		// Increase timeout for this specific test if needed
		this.timeout(30000);

		await driver.get("https://www.ebay.com/");

		let searchInput = await driver.findElement(By.name("_nkw"));
		await searchInput.sendKeys("laptop", Key.RETURN);

		let sortDropdownXPath =
			'button[aria-label="Sort selector. Best Match selected."]';
		await driver.wait(until.elementLocated(By.css(sortDropdownXPath)), 15000);

		let sortDropdown = await driver.findElement(By.css(sortDropdownXPath));
		await sortDropdown.click();

		let sortButton = await driver.wait(
			until.elementLocated(By.linkText("Price + Shipping: lowest first")),
			15000
		);
		await sortButton.click();

		let actualTitle = await driver.getTitle();
		assert.ok(
			actualTitle.toLowerCase().includes("laptop"),
			`Expected title to include 'laptop', Actual title: ${actualTitle}`
		);

		await driver.sleep(5000);
	});

	after(async function () {
		// Increase timeout for cleanup
		this.timeout(30000);
		await driver.quit();
	});
});
