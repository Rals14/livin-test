const { remote } = require('webdriverio');

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


async function swipeLefft(driver) {
    const size = await driver.getWindowSize();

    // Swipe gesture using Appium command
    await driver.execute('mobile: swipeGesture', {
        direction: 'left',
        left: Math.round(size.width * 0.1),      // 10% desde izquierda
        top: Math.round(size.height * 0.45),     // 45% desde arriba
        width: Math.round(size.width * 0.8),     // 80% del ancho
        height: Math.round(size.height * 0.1), 
        percent: 1,    // Distancia del deslizamiento como porcentaje (0-1)
    });
}

async function acceptTerms(driver) {
    swipeLefft(driver);
    for (let i = 0; i < 2; i++) {
        await swipeLefft(driver);
    }
    const check = await driver.$('id=com.merckers.livin:id/checkbox_id');
    check.click();
    const next = await driver.$('id=com.merckers.livin:id/next_id');
    next.click();
}

async function login(driver) {
    const user = await driver.$('android=new UiSelector().text("Usuario")');
    await user.setValue('test_livin25@yopmail.com')

    const password = await driver.$('android=new UiSelector().text("Contraseña")');
    await password.setValue('Livin123$')

    const login = await driver.$('id=com.merckers.livin:id/firebaseId');
    await login.click();
}

async function createReservation(driver) {
    //select reservation icon
    const reservation = await driver.$('android=new UiSelector().resourceId("com.merckers.livin:id/navigation_bar_item_icon_view").instance(1)');
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