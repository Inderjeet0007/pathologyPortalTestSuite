const { By } = require('selenium-webdriver');
const { sendKeysHandler, clickElementHandler } = require('../utils/testUtils');
require('dotenv').config({path: '../config/.env'});

//method to log into the portal
const login = (async (driver, email, pwd) => {
    try{
        console.log(`-> Finding and sending data to element: email`);
        let emailInput = await driver.findElement(By.xpath("//input[@name='email']"));
        await sendKeysHandler(driver, emailInput, email);
        console.log(`-> Finding and sending data element: pwd`);
        let pwdInput = await driver.findElement(By.xpath("//input[@name='password']"));
        await sendKeysHandler(driver, pwdInput, pwd);
        console.log(`-> Finding and clicking element: loginBtn`);
        let loginBtn = await driver.findElement(By.className("MuiButton-containedPrimary"));
        await clickElementHandler(driver, loginBtn);
    } catch(e){
        console.log(e);
    }
})

module.exports = {
    login
}