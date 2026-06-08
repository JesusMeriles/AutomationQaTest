import { loginUI } from '../ui/loginUI.js';

export const loginQuestions = {
    errorMessage: async () => {
        await $(loginUI.errorMessage).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorMessage).getText();
    },
    isErrorWidgetVisible: async () => {
        await $(loginUI.errorWidget).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorWidget).isDisplayed();
    },
    isErrorIconVisible: async () => {
        await $(loginUI.errorIcon).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorIcon).isDisplayed();
    },
};
