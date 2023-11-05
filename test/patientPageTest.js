const { By } = require('selenium-webdriver');
var assert = require('assert');
const { initializing } = require('../main/base/testBase');
const { addPatientWithoutEquipment, addPatientWithoutLabs } = require('../main/pages/patientPage');
const { terminateSession, getText } = require('../main/utils/testUtils');
const { login } = require('../main/pages/loginPage');
require('dotenv').config({path: '../main/config/.env'});

//test to verify if patient can be added without equipment
const addPatientWithoutEquipmentTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Performing login");
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log("\n---\n\n⌛️ Executing addPatientWithoutEquipmentTest");
        console.log(`-> Invoking addPatientWithoutEquipment method`);
        await addPatientWithoutEquipment(driver, "Patient 1", "test@email.com", "1234567890", "170", "70", "25", "120", "60");
        const errMsg = await driver.findElement(By.xpath("//div[@class='MuiAlert-message']"));
        const errMsgText = await getText(driver, errMsg);
        assert.equal(errMsgText, "Please select equipemnt used in tests.");
        console.log("addPatientWithoutEquipmentTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("addPatientWithoutEquipmentTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//test to verify if patient can be added without labs
const addPatientWithoutLabsTest = (async () => {
    let driver = await initializing();

    try{
        console.log("\n---\n\n⌛️ Performing login");
        await login(driver, "test@kennect.io", "Qwerty@1234");
        console.log("\n---\n\n⌛️ Executing addPatientWithoutLabsTest");
        console.log(`-> Invoking addPatientWithoutLabs method`);
        await addPatientWithoutLabs(driver, "Patient 1", "test@email.com", "1234567890", "170", "70", "25", "120", "60");
        const errMsg = await driver.findElement(By.xpath("//div[@class='MuiAlert-message']"));
        const errMsgText = await getText(driver, errMsg);
        assert.equal(errMsgText, "Please select lab in which you want send samples.");
        console.log("addPatientWithoutLabsTest - ✅ PASSED \n\n---");
        terminateSession(driver);
    } catch(e){
        console.log("addPatientWithoutLabsTest - ❌ FAILED \n\n---");
        console.log(e);
        terminateSession(driver);
    }
})

//method to execute tests sequentially 
const executePatientPageTest = (async () => {
    await addPatientWithoutEquipmentTest();
    await addPatientWithoutLabsTest();
})

module.exports = {
    executePatientPageTest
}