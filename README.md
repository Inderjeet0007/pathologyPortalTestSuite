## Pathology Portal Test Suite

### Suite Foundation
Selenium with JS (Node JS)

### Dependencies
-> assert [v2.1.0]: helps performing assertions <br />
-> dotenv [v14.3.2]: helps in adding custom environment variables in one file <br />
-> selenium [v2.20.0]: helps in getting webdriver and supported methods to execute test via Selenium 

### Envrionments
This test suite supports three envrionments (where one can execute the test):

-> Local system <br />
-> Selenium Grid <br />
-> BrowserStack (remote testing infra)

The test suite has been tested on all environments mentioned above using a <code> Mac</code>.

### Test structure
The suite is divided into the followings parts/sections: <br />

#### Section 1> main:

This conprises of base, config, pages, and utils.

##### -> base:

This section contains the base method to create a driver with certain properties (like pageLoad, implicit timeout, environment etc) that can be used by the test methods.

##### -> config:

This section contains .env file which stores all the environment variables required for the test to function. 

##### -> pages:

This section contains all the pages and their respective functinalities that we are testing via certain methods.

##### -> utils:

This section contains a set of helper functions which perform basic/repetative actions (like click)/contains configuration and are invoked multiple times during test methods.

#### Section 2> test:

This section comprises of all the test methods for each page we are testing.

#### Section 3> testSuite:

This section comprises of a runner file that aids in runnning all or specific tests.

### Why this approach?
While creating a test suite, I could see many functionalities that could be used/invoked multiple times from different methods/functions. Due to this, I created a seperate section called utils for such generic/common functions and base method for invoking/creating the driver with set configuration, so that I can invoke those methods from anywhere in the suite. For better understanding and structuring I adpoted the page object model such that pages being tested and testcases for them are seperated in a specific folder structure.

### Running the test/test suite 
In order to execute the test you first need to set a desired configuration. By defualt the environment is set to <code>local</code> with the browser <code>chrome</code> and test level <code>all</code>.

Currently, we can customize the following configuration:
```
> ENVIRO: can be local, grid, browserstack
> TEST_LEVEL: can be set (homeFurnishing, product, search, all) based on which test you want to execute
> BASE_URL: this is set to Myntra Home furnishing as the tests are designed for the same (we can change this; however, in that case we would have to change the test as well)
> DEFAULT_BROWSER: can be chrome, firefox, safari, MicrosoftEdge
> PAGELOAD_TIMEOUT: can be any value (currently set to 20000)
> IMPLICIT_WAIT: can be any value (currently set to 20000)
> TIMEOUT: can be any value (currently set to 20000)
> LOCAL_GRID: can update to grid hub address
> BROWSERSTACK_HUB: this is set to BrowserStack's hub
> BROWSERSTACK_USERNAME: can update your BrowserStack userName
> BROWSERSTACK_ACCESS_KEY: can update your BrowserStack accessKey
```
Once done, we can execute the command <code>npm i</code> to install all the dependencies. 

In order to kick-off the test, you would have to execute <code>npm run executeRunner</code>.

### Note
I have executed these tests on BrowserStack and I am sharing a public URL of my buuild executed on remote Windows 10 machine below (build will expire after 60 days):
https://automate.browserstack.com/dashboard/v2/public-build/K29RSERmSFEzMnFNNlAwZ0VxQUpPZFNjdVRHb0ROZi9TVVc3WlI0bjhnOXhzOWFFMVF4VjdtTGdaV0xVVExvZVBtdEV6SDVCeXNQMHFaTUZCcVdyS3c9PS0tNmpRbTM3QWJFdmhiV2tXdjJVTU9pZz09--e6bd91566ee4ee0ecc345b0cf7b39f36a7413d9d