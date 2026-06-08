import { loginUI } from '../ui/loginUI.js';

export const loginTask = {
    as: async (username, password) => {
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
