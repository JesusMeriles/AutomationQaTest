const { checkoutUI } = require('../ui/checkoutUI');

const purchaseQuestions = {
    isTitleCorrect: async () => {
        const title = await $(checkoutUI.checkoutCompleteTitle);
        return await title.isDisplayed();
    },
    getSuccessMessage: async () => {
    const msg = await $(checkoutUI.successMessage);
    await msg.waitForDisplayed({ timeout: 5000 });
    const text = await msg.getText();
    return text.trim().replace(/\n/g, ' '); 
    },
    isPonyExpressVisible: async () => {
        const image = await $(checkoutUI.ponyExpressImage);
        return await image.isDisplayed();
    }
};

module.exports = { purchaseQuestions };