const { Builder } = require('selenium-webdriver');
const { grid, browserstack } = require('../utils/testUtils');
require('dotenv').config({path: '.env'});
  
//method to create driver instace based on environment, browser
//then maximize the window, set timeouts, and navigate to the url on the browser
const initializing = (async () => {
    let driver;
    let executionEnv = process.env.ENVIRO;
    let browser = process.env.DEFAULT_BROWSER;
    console.log(`Environment: ${process.env.ENVIRO}`);
    console.log(`Browser selected: ${process.env.DEFAULT_BROWSER}\n`);
    try{
        switch(executionEnv){
            case "local":
                //browser can be chrome, firefox, safari, MicrosoftEdge 
                driver = await new Builder()
                    .forBrowser(`${browser}`)
                    .build();
                break;
            case "grid":
                driver = await new Builder()
                    .usingServer(`${process.env.LOCAL_GRID}`)
                    .withCapabilities(await grid())
                    .build();
                break;
            case "browserstack":
                driver = await new Builder()
                    .usingServer(`https://${process.env.BROWSERSTACK_USERNAME}:${process.env.BROWSERSTACK_ACCESS_KEY}@${process.env.BROWSERSTACK_HUB}`)
                    .withCapabilities(await browserstack())
                    .build();
                break;
            default:
                console.log(`${executionEnv} ENVIRO is not supported!`);
                break;
        }
        await driver.manage().window().maximize();
        await driver.manage().setTimeouts({ 
            implicit: parseInt(process.env.IMPLICIT_WAIT), 
            pageLoad: parseInt(process.env.PAGELOAD_TIMEOUT) 
        });
        
        await driver.get(process.env.BASE_URL);
        return driver;

    } catch(e){
        console.log(e);
    }
})

module.exports = {
    initializing
}