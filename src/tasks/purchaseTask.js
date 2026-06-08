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

        const firstNameInput = await $(checkoutUI.firstName);
        await firstNameInput.waitForDisplayed({ timeout: 10000 });
        await firstNameInput.setValue(name);

        const lastNameInput = await $(checkoutUI.lastName);
        await lastNameInput.waitForDisplayed({ timeout: 10000 });
        await lastNameInput.setValue(last);

        const postalCodeInput = await $(checkoutUI.postalCode);
        await postalCodeInput.waitForDisplayed({ timeout: 10000 });
        await postalCodeInput.setValue(zip);

        const continueBtn = await $(checkoutUI.continueBtn);
        await continueBtn.waitForDisplayed({ timeout: 15000 });
        await driver.pause(1000); 
        await continueBtn.click();

        const finish = await $(checkoutUI.finishBtn);
        
        try {
            await finish.waitForDisplayed({ timeout: 5000 });
        } catch (e) {
            console.log('El botón FINISH no es visible, ejecutando scroll estratégico de Android...');
            
            const androidScrollSelector = 'new UiScrollable(new UiSelector().scrollable(true)).scrollIntoView(new UiSelector().description("test-FINISH"))';
            await $(`android=${androidScrollSelector}`);
        }

        await finish.waitForDisplayed({ timeout: 10000 });
        await finish.click();
    }
};