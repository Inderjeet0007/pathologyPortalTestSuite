const { By } = require('selenium-webdriver');
var assert = require('assert');
const { initializing } = require('../main/base/testBase');
const { dashboardComponents, selectTestInTestCostCalculator, createTodo } = require('../main/pages/dashboardPage');
const { getText, terminateSession } = require('../main/utils/testUtils');
const { login } = require('../main/pages/loginPage');
require('dotenv').config({path: '../main/config/.env'});

//test to verify if a product is being added to cart
const dashboardComponentsTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Performing login");
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log("\n---\n\n⌛️ Executing dashboardComponentsTest");
        console.log(`-> Invoking dashboardComponents method`);
        let componentsPresent = await dashboardComponents(driver);
        console.log(`-> Performing assertion`);
        assert.equal(componentsPresent, true);
        console.log(`-> Terminating session`);
        console.log("dashboardComponentsTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("dashboardComponentsTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//test to select a test and verify the cost
const createTodoTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Performing login");
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log("\n---\n\n⌛️ Executing createTodoTest");
        console.log(`-> Invoking createTodo method`);
        await createTodo(driver, 'Testing ToDo');
        console.log(`-> Performing assertion`);
        const errMsg = await driver.findElement(By.xpath("//div[@class='MuiAlert-message']"));
        const errMsgText = await getText(driver, errMsg);
        assert.equal(errMsgText, "Todo added successfully!");
        console.log(`-> Terminating session`);
        console.log("createTodoTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("createTodoTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//test to select a test and verify the cost
const selectTestInTestCostCalculatorTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Performing login");
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log("\n---\n\n⌛️ Executing selectTestInTestCostCalculatorTest");
        console.log(`-> Invoking selectTestInTestCostCalculator method`);
        await selectTestInTestCostCalculator(driver, 'Beans');
        console.log(`-> Performing assertion`);
        const totalCost = await driver.findElement(By.xpath("(//div[text()='250 ₹'])[2]"));
        const totalCostText = await getText(driver, totalCost);
        assert.equal(totalCostText, "250 ₹");
        console.log(`-> Terminating session`);
        console.log("selectTestInTestCostCalculatorTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("selectTestInTestCostCalculatorTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//method to execute tests sequentially 
const executeDashboardPageTest = (async () => {
    await dashboardComponentsTest();
    await createTodoTest();
    await selectTestInTestCostCalculatorTest();
})

module.exports ={
    executeDashboardPageTest
}