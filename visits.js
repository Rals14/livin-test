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

// create one time visit
async function createVisit(driver) {
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
    const type = await driver.$('id=com.merckers.livin:id/isOneTimeId');
    await type.click();

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
        await createVisit(driver);

    } finally {
        await driver.pause(5000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);