const { remote } = require('webdriverio');
const { login, acceptTerms } = require('../helpers/common');

const capabilities = {
    platformName: 'Android',
    'appium:automationName': 'UiAutomator2',
    'appium:deviceName': 'RF8M92XKKRN',
    'appium:appPackage': 'com.merckers.livin',
    'appium:appActivity': 'com.merckers.shoppi.core.navigation.RouteActivity',
};

const wdOpts = {
    hostname: process.env.APPIUM_HOST || 'localhost',
    port: parseInt(process.env.APPIUM_PORT, 10) || 4723,
    logLevel: 'info',
    capabilities,
};

async function paymentDocument(driver) {

    //select menu icon
    const menu = await driver.$('id=com.merckers.livin:id/nav_menu');
    await menu.click();

    //select payment section
    const payment = await driver.$('android=new UiSelector().className("android.widget.LinearLayout").instance(12)');
    await payment.click();

    //select payment document
    const document = await driver.$('android=new UiSelector().className("android.widget.LinearLayout").instance(8)');
    await document.click();

    //select request document
    const request = await driver.$('id=com.merckers.livin:id/newId');
    await request.click();

    //select document type
    const type = await driver.$('id=com.merckers.livin:id/otherId');
    await type.click();

    //insert description
    const description = await driver.$('android=new UiSelector().text("Descripción")');
    await description.setValue('Test');

    //select request button
    const requestButton = await driver.$('id=com.merckers.livin:id/requestAccountStatusId');
    await requestButton.click();


}


async function runTest() {
    const driver = await remote(wdOpts);
    try {
        await acceptTerms(driver);
        await login(driver);
        await paymentDocument(driver);


    } finally {
        await driver.pause(5000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);