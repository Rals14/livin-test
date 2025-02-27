const { remote } = require('webdriverio');
const { login, acceptTerms} = require('../helpers/common');

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


async function createReservation(driver) {
    //select reservation icon
    const reservation = await driver.$('id=com.merckers.livin:id/nav_reservations');
    await reservation.click();

    //select reserve button
    const reserve = await driver.$('id=com.merckers.livin:id/newId');
    await reserve.click();

    // //select amenity
    // const amenity = await driver.$('id=com.merckers.livin:id/amenityId');
    // amenity.click();

    // //select the type of amenity (Is on a different context)
    // const type = await driver.$('~Cancha de futbol');
    // await type.click();

    //select next arrow
    const arrow = await driver.$('id=android:id/next');
    await arrow.click();

    //select date
    const date = await driver.$('~02 marzo 2025');
    await date.click();

    //select time
    const time = await driver.$('android=new UiSelector().className("android.widget.TextView").instance(7)');
    await time.click();

    //select create reservation
    const create = await driver.$('id=com.merckers.livin:id/createIssueId');
    await create.click();

}


async function runTest() {
    const driver = await remote(wdOpts);
    try {
        await acceptTerms(driver);
        await login(driver);
        await createReservation(driver);


    } finally {
        await driver.pause(5000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);