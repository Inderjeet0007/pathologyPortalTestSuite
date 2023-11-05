const { By } = require('selenium-webdriver');
var assert = require('assert');
const { initializing } = require('../main/base/testBase');
const { login } = require('../main/pages/loginPage');
const { getText, terminateSession } = require('../main/utils/testUtils');
require('dotenv').config({path: '../main/config/.env'});

//test to verify if login functionality is working
const loginTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Executing loginTest");
        console.log(`-> Invoking login method`);
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log(`-> Running assertion`);
        const pageHeading = await driver.findElement(By.xpath("//div[text()='Dashboard']"));
        const pageHeadingText = await getText(driver, pageHeading);
        assert.equal(pageHeadingText, "Dashboard");
        console.log("loginTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("loginTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//test to verify if error is display with invalid email 
const loginWithInvalidEmailTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Executing loginWithInvalidEmailTest");
        console.log(`-> Invoking login method`);
        await login(driver, "test@kennect.id", "Qwerty@1234");
        console.log(`-> Running assertion`);
        const errMsg = await driver.findElement(By.xpath("//div[@class='MuiAlert-message']"));
        const errMsgText = await getText(driver, errMsg);
        assert.equal(errMsgText, "There is no user record corresponding to this identifier. The user may have been deleted.");
        console.log("loginTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("loginTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//test to verify if error is display with invalid password 
const loginWithInvalidPwdTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Executing loginWithInvalidPwdTest");
        console.log(`-> Invoking login method`);
        await login(driver, "test@kennect.io", "Qwerty@123");
        console.log(`-> Running assertion`);
        const errMsg = await driver.findElement(By.xpath("//div[@class='MuiAlert-message']"));
        const errMsgText = await getText(driver, errMsg);
        assert.equal(errMsgText, "The password is invalid or the user does not have a password.");
        console.log("loginTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("loginTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//method to execute tests sequentially 
const executeLoginPageTest = (async () => {
    await loginTest();
    await loginWithInvalidEmailTest();
    await loginWithInvalidPwdTest();
})

module.exports = {
    loginTest,
    executeLoginPageTest
}