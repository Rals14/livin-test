async function swipeLefft(driver) {
    const size = await driver.getWindowSize();

    // Swipe gesture using Appium command
    await driver.execute('mobile: swipeGesture', {
        direction: 'left',
        left: Math.round(size.width * 0.1),
        top: Math.round(size.height * 0.45),
        width: Math.round(size.width * 0.8),
        height: Math.round(size.height * 0.1),
        percent: 1,
    });
}

async function swipeDown(driver) {
    const size = await driver.getWindowSize();

    await driver.execute('mobile: swipeGesture', {
        direction: 'up', 
        left: Math.round(size.width / 2),
        top: Math.round(size.height * 0.6), 
        width: Math.round(size.width * 0.1),
        height: Math.round(size.height * 0.2), 
        percent: 1,
    });
}

//function to accept terms and conditions of the app
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

//function to login in the app
async function login(driver) {
    const user = await driver.$('android=new UiSelector().text("Usuario")');
    await user.setValue('test_livin25@yopmail.com')

    const password = await driver.$('android=new UiSelector().text("Contraseña")');
    await password.setValue('Livin123$')

    const login = await driver.$('id=com.merckers.livin:id/firebaseId');
    await login.click();
}


module.exports = {
    swipeLefft,
    acceptTerms,
    login,
    swipeDown,
    
};