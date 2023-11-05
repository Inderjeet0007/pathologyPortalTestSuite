const { executeDashboardPageTest } = require('../test/dashboardPageTest');
const { executePatientPageTest } = require('../test/patientPageTest');
const { executeLoginPageTest } = require('../test/loginPageTest');
require('dotenv').config({path: '../main/config/.env'});

// this is IIFE - immediately invoked func execution
//IIFE method to run specific or all tests
const runner = (async () => {
    let level = process.env.TEST_LEVEL;
    console.log(`\nTest level set to: ${level}`);
    switch(level){
        case "dashboard":
            await executeDashboardPageTest();
            break;
        case "patient":
            await executePatientPageTest();
            break;
        case "login":
            await executeLoginPageTest();
            break;
        case "all":
            await executeLoginPageTest();
            await executeDashboardPageTest();
            await executePatientPageTest();
            break;
        default:
            console.log(`${level} Level is not supported!`);
            break;
    }
})()
