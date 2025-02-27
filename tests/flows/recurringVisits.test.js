const { remote } = require('webdriverio');
const { login, acceptTerms, swipeDown } = require('../helpers/common');

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

async function recurringVisits(driver) {
    //select visit icon
    const visit = await driver.$('id=com.merckers.livin:id/nav_visitors');
    await visit.click();

    //selec add visit button
    const addVisit = await driver.$('id=com.merckers.livin:id/newId');
    await addVisit.click();

    //insert name
    const name = await driver.$('id=com.merckers.livin:id/namesId');
    await name.setValue('Test');

    //insert last name
    const lastName = await driver.$('id=com.merckers.livin:id/lastNameId');
    await lastName.setValue('Visitor');

    //insert ID
    const id = await driver.$('id=com.merckers.livin:id/documentsId');
    await id.setValue('123456789');

    //insert phone number
    const phone = await driver.$('id=com.merckers.livin:id/phoneId');
    await phone.setValue('1234567890');

    //select transport by card
    const transport = await driver.$('id=com.merckers.livin:id/byCarId');
    await transport.click();

    //Insert plate
    const plate = await driver.$('id=com.merckers.livin:id/carPlateId');
    await plate.setValue('123456');

    //select type of visit (one time)
    const type = await driver.$('id=com.merckers.livin:id/isRecurrentId');
    await type.click();

    //select days
    const monday = await driver.$('id=com.merckers.livin:id/dayMondayId');
    await monday.click();

    const wednesday = await driver.$('id=com.merckers.livin:id/dayWednesdayId');
    await wednesday.click();

    const friday = await driver.$('id=com.merckers.livin:id/dayFridayId');
    await friday.click();

    //scroll down
    await swipeDown(driver);

    //insert reason
    const reason = await driver.$('id=com.merckers.livin:id/reasonId');
    await reason.setValue('Visit');

    //select create visit
    const create = await driver.$('id=com.merckers.livin:id/createId');
    await create.click();


}

async function runTest() {
    const driver = await remote(wdOpts);
    try {
        await acceptTerms(driver);
        await login(driver);
        await recurringVisits(driver);


    } finally {
        await driver.pause(5000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);