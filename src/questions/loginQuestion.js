const { loginUI} = require('../ui/loginUI.js');
const { catalogUI } = require('../ui/catalogUI.js');

const loginQuestions = {
    errorMessage: async () => {
        await $(loginUI.errorMessage).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorMessage).getText();
    },
    isErrorWidgetVisible: async () => {
        await $(loginUI.errorWidget).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorWidget).isDisplayed();
    },
    isErrorIconVisible : async () => {
        await $(loginUI.errorIcon).waitForDisplayed({ timeout: 10000 });
        return await $(loginUI.errorIcon).isDisplayed();
    },
    
    isProductVisible: async () => {
        await $(catalogUI.productItem).waitForDisplayed({ timeout: 10000 });
        return await $(catalogUI.productItem).isDisplayed();
    },
    isCatalogVisible: async () => {
        await $(catalogUI.titleProducts).waitForDisplayed({ timeout: 10000 });
        return await $(catalogUI.titleProducts).isDisplayed();
    },
    isCartVisible: async () => {
        await $(catalogUI.cart).waitForDisplayed({ timeout: 10000 });
        return await $(catalogUI.cart).isDisplayed();
    }   
};

module.exports = { loginQuestions };
