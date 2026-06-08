import { checkoutUI } from '../ui/checkoutUI.js';

export const purchaseTask = {
    addFirstItemAndGoToCheckout: async () => {
        const addBtn = await $(checkoutUI.addToCartBtn);
        await addBtn.waitForDisplayed();
        await addBtn.click();   
        const cart = await $(checkoutUI.cartIcon);
        await cart.waitForDisplayed({ timeout: 5000 });
        await cart.click();
        
        const checkout = await $(checkoutUI.checkoutBtn);
        await checkout.waitForDisplayed();
        await checkout.click();
    },

    fillInformation: async (name, last, zip) => {

        await $(checkoutUI.firstName).waitForDisplayed({ timeout: 5000 });
        await $(checkoutUI.firstName).setValue(name);
        await $(checkoutUI.lastName).setValue(last);
        await $(checkoutUI.postalCode).setValue(zip);
        await $(checkoutUI.continueBtn).waitForDisplayed({ timeout: 5000 });
        await $(checkoutUI.continueBtn).click();
        const finish = await $(checkoutUI.finishBtn);
        await finish.waitForDisplayed();
        await finish.click();
    }
};