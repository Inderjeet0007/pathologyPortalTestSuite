const { By, until } = require('selenium-webdriver');
require('dotenv').config({path: '../config/.env'});

//helper for wait
const waitHandler = (async (driver, targetedElement) => {
    await driver.wait(until.elementIsVisible(targetedElement), parseInt(process.env.TIMEOUT));
    await driver.wait(until.elementIsEnabled(targetedElement), parseInt(process.env.TIMEOUT));
})

//helper for performing click
const clickElementHandler = (async (driver, targetedElement) => {
    await waitHandler(driver, targetedElement);
    await targetedElement.click();
})

//helper for performing sendKeys
const sendKeysHandler = (async (driver, targetedElement, value) => {
    await waitHandler(driver, targetedElement);
    await targetedElement.sendKeys(value);
})

//helper for retriving title
const getTitle = (async (driver) => {
    let title = await driver.getTitle();
    return (title);
})

//helper for retriving text
const getText = (async (driver, elementTofindTextOf) => {
    await waitHandler(driver, elementTofindTextOf);
    let value = await elementTofindTextOf.getText();
    return (value);
})

//helper for determing if elements are displayed
const displayHandler = (async (driver, targetedElement) => {
    let component = await driver.findElement(By.xpath(targetedElement));
    await waitHandler(driver, component);
    let componentPresent = await component.isDisplayed();
    return (componentPresent);
})

//helper to switch tab
const switchToCurrentTab = (async (driver) => {
    let tabs = await driver.getAllWindowHandles();
    await driver.switchTo().window(tabs[1]);
})

//helper for initilizing browserstack caps
const browserstack = (async () => {
    var browserstackCapabilities = {
        "os" : "11",
        "os_version" : "Windows",
        "browserName" : "Chrome",
        "browser_version" : "latest",
        "browserstack.local" : "false",
        "browserstack.debug" : "true",
        "browserstack.console" : "verbose",
        "browserstack.networkLogs" : "true"
    }
    return browserstackCapabilities;
})

//helper for initilizing Selenium Grid caps
const grid = (async () => {
    var gridCapabilities = {
        "platformName" : "mac",
        "browserName" : `${process.env.DEFAULT_BROWSER}`,
    }
    return gridCapabilities;
})

//helper for quitting the driver
const terminateSession = (async (driver) => {
    await driver.quit();
})

module.exports = {
    clickElementHandler,
    sendKeysHandler,
    waitHandler,
    getTitle,
    getText,
    displayHandler,
    switchToCurrentTab,
    browserstack,
    grid,
    terminateSession
}