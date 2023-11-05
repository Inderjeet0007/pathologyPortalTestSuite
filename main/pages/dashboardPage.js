const { By, Key } = require('selenium-webdriver');
const { clickElementHandler, sendKeysHandler, displayHandler } = require('../utils/testUtils');
require('dotenv').config({path: '../config/.env'});

//method to check if the desired componeents are present
const dashboardComponents = (async (driver) => {
    try{
        console.log(`-> Checking presence of: todoComponent`);
        let todoComponent = await displayHandler(driver, "//div[text()='TODO']");
        console.log(`-> Checking presence of: testCostCalculatorComponent`);
        let testCostCalculatorComponent = await displayHandler(driver, "//div[text()='TODO']");
        console.log(`-> Checking presence of: navDashboardComponent`);
        let navDashboardComponent = await displayHandler(driver, "//a[@href='/dashboard']");
        console.log(`-> Checking presence of: navTestComponent`);
        let navTestComponent = await displayHandler(driver, "//a[@href='/tests']");
        console.log(`-> Checking presence of: navInventoryComponent`);
        let navInventoryComponent = await displayHandler(driver, "//a[@href='/inventory']");
        console.log(`-> Checking presence of: navPatientsComponent`);
        let navPatientsComponent = await displayHandler(driver, "//a[@href='/patients']");
        console.log(`-> Checking presence of: navLabsComponent`);
        let navLabsComponent = await displayHandler(driver, "//a[@href='/labs']");
        console.log(`-> Checking presence of: navDoctorsComponent`);
        let navDoctorsComponent = await displayHandler(driver, "//a[@href='/doctors']");
        console.log(`-> Checking presence of: navAccountingComponent`);
        let navAccountingComponent = await displayHandler(driver, "//a[@href='/accounting']");
        console.log(`-> Checking the state of all components`);
        if(
            todoComponent === true && 
            testCostCalculatorComponent === true &&
            navDashboardComponent === true &&
            navTestComponent === true &&
            navInventoryComponent === true &&
            navPatientsComponent === true &&
            navLabsComponent === true &&
            navDoctorsComponent === true &&
            navAccountingComponent === true
        ){
            return(true);
        }else{
            return(false);
        }
    } catch(e){
        console.log(e);
    }
})

//method to create a todo
const createTodo = (async (driver, todoContent) => {
    try{
        console.log(`-> Finding and clicking to element: addTodoBtn`);
        let addTodoBtn = await driver.findElement(By.xpath("//span[text()='Add']"));
        await clickElementHandler(driver, addTodoBtn);
        console.log(`-> Finding and clicking to element: createTodo`);
        let todoText = await driver.findElement(By.id("outlined-add-todo-input"));
        await sendKeysHandler(driver, todoText, todoContent);
        console.log(`-> Finding and clicking to element: createTodo`);
        let createTodo = await driver.findElement(By.xpath("//span[text()='Save']"));
        await clickElementHandler(driver, createTodo);
    } catch(e){
        console.log(e);
    }
})

//method to select a test type
const selectTestInTestCostCalculator = (async (driver, testType) => {
    try{
        console.log(`-> Finding and sending data element: testsDropdown`);
        let testsDropdown = await driver.findElement(By.xpath("//input[@id='patient-test']"));
        await sendKeysHandler(driver, testsDropdown, testType);
        await sendKeysHandler(driver, testsDropdown, Key.ARROW_DOWN);
        await sendKeysHandler(driver, testsDropdown, Key.RETURN);
        await sendKeysHandler(driver, testsDropdown, Key.TAB);
    } catch(e){
        console.log(e);
    }
})

module.exports = {
    dashboardComponents,
    createTodo,
    selectTestInTestCostCalculator
}