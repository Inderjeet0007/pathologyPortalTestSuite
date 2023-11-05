const { By, Key } = require('selenium-webdriver');
const { sendKeysHandler, clickElementHandler } = require('../utils/testUtils');
require('dotenv').config({path: '../config/.env'});

//method to add a patient without equipment
const addPatientWithoutEquipment = (async (driver, name, email, phone, height, weight, age, systolic, diastolic, mode) => {
    try{
        console.log(`-> Finding and clicking to element: patientsTab`);
        let patientsTab = await driver.findElement(By.xpath("//span[text()='Patients']"));
        await clickElementHandler(driver, patientsTab);
        console.log(`-> Finding and clicking to element: createPatientBtn`);
        let createPatientBtn = await driver.findElement(By.xpath("(//a[@href='/patients/add'])[1]"));
        await clickElementHandler(driver, createPatientBtn);
        console.log(`-> Finding and sending data to element: patientName`);
        let patientName = await driver.findElement(By.xpath("//input[@name='name']"));
        await sendKeysHandler(driver, patientName, name);
        console.log(`-> Finding and sending data to element: patientEmail`);
        let patientEmail = await driver.findElement(By.xpath("//input[@name='email']"));
        await sendKeysHandler(driver, patientEmail, email);
        console.log(`-> Finding and sending data to element: patientPhone`);
        let patientPhone = await driver.findElement(By.xpath("//input[@name='phone']"));
        await sendKeysHandler(driver, patientPhone, phone);
        console.log(`-> Finding and clicking to element: generalSectionBtn`);
        let generalSectionBtn = await driver.findElement(By.xpath("(//span[text()='General Details'])[2]"));
        await clickElementHandler(driver, generalSectionBtn);
        console.log(`-> Finding and clicking to element: addTestBtn`);
        let addTestBtn = await driver.findElement(By.xpath("(//span[text()='Add Tests'])[2]"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", addTestBtn);
        await driver.sleep(1000);
        await clickElementHandler(driver, addTestBtn);
        if(mode != "disabled"){
            console.log(`-> Finding and clicking to element: addPatientBtn`);
            let addPatientBtn = await driver.findElement(By.xpath("//span[text()='Add Patient']"));
            await driver.executeScript("arguments[0].scrollIntoView(true);", addPatientBtn);
            await driver.sleep(1000);
            await clickElementHandler(driver, addPatientBtn);
        }
    } catch(e){
        console.log(e);
    }
})

//method to add a patient without labs
const addPatientWithoutLabs = (async (driver, name, email, phone, height, weight, age, systolic, diastolic) => {
    try{
        await addPatientWithoutEquipment(driver, name, email, phone, height, weight, age, systolic, diastolic, "disabled");
        console.log(`-> Finding and sending data element: testsDropdown`);
        let testsDropdown = await driver.findElement(By.xpath("//input[@id='patient-test']"));
        await sendKeysHandler(driver, testsDropdown, 'Beans');
        await sendKeysHandler(driver, testsDropdown, Key.ARROW_DOWN);
        await sendKeysHandler(driver, testsDropdown, Key.RETURN);
        console.log(`-> Finding and clicking to element: addEquipment`);
        await driver.sleep(2000);
        let addEquipment = await driver.findElement(By.xpath("(//button[@class='MuiButtonBase-root MuiIconButton-root MuiIconButton-colorInherit'])[2]"));
        await clickElementHandler(driver, addEquipment);
        await driver.sleep(2000);
        console.log(`-> Finding and sending data element: equipmentDropdown`);
        let equipmentDropdown = await driver.findElement(By.xpath("//*[@class='MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input']"));
        await driver.executeScript("arguments[0].scrollIntoView(true);", equipmentDropdown);
        await driver.sleep(2000);
        await sendKeysHandler(driver, equipmentDropdown, Key.RETURN);
        console.log(`-> Finding and clicking to element: equipmentOption`);
        let equipmentOption = await driver.findElement(By.xpath("//*[@id='menu-']/div[3]/ul/li"));
        await clickElementHandler(driver, equipmentOption);
        console.log(`-> Finding and clicking to element: confirmEquipment`);
        let confirmEquipment = await driver.findElement(By.xpath("//span[text()='check']"));
        await clickElementHandler(driver, confirmEquipment);
        console.log(`-> Finding and clicking to element: confirmPatient`);
        let confirmPatient = await driver.findElement(By.xpath("//span[text()='Add Patient']"));
        await clickElementHandler(driver, confirmPatient);
    } catch(e){
        console.log(e);
    }
})

module.exports = {
    addPatientWithoutEquipment,
    addPatientWithoutLabs
}