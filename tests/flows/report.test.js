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

//create a report of an issue
async function createReport(driver) {
    //select report icon
    const reports = await driver.$('id=com.merckers.livin:id/nav_issues');
    await reports.click();

    //select add report button
    const addReport = await driver.$('id=com.merckers.livin:id/newId');
    await addReport.click();

    //grant camera permission
    const allow = await driver.$('id=com.android.permissioncontroller:id/permission_allow_foreground_only_button');
    await allow.click();

    //select the type of issue
    const type = await driver.$('android=new UiSelector().className("android.widget.RadioButton").instance(0)');
    await type.click();

    //insert description
    const description = await driver.$('android=new UiSelector().text("Descripción")');
    await description.setValue('Test report');

    //select create report
    const create = await driver.$('id=com.merckers.livin:id/createIssueId');
    await create.click();
}


async function runTest() {
    const driver = await remote(wdOpts);
    try {
        await acceptTerms(driver);
        await login(driver);
        await createReport(driver);

    } finally {
        await driver.pause(5000);
        await driver.deleteSession();
    }
}

runTest().catch(console.error);