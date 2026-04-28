const { loginUI } = require('../ui/loginUI.js');

const loginTask = {
    as: async (username, password) => {
        await driver.pause(5000); 
        await $(loginUI.userInput).waitForDisplayed({ timeout: 10000 });
        await $(loginUI.passInput).waitForDisplayed({ timeout: 10000 });
        await $(loginUI.loginBtn).waitForDisplayed({ timeout: 10000 });

        await $(loginUI.userInput).clearValue();
        await $(loginUI.userInput).setValue(username);

        await $(loginUI.passInput).clearValue();
        await $(loginUI.passInput).setValue(password);

        await $(loginUI.loginBtn).click();
    }
};

module.exports = { loginTask };
