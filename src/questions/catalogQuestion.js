import { catalogUI } from '../ui/catalogUI.js';

export const catalogQuestions = {
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
    },
    arePricesOrderedLowToHigh: async () => {
        const priceElements = await $$(catalogUI.productPrices);
        const prices = [];
        for (const element of priceElements) {
            const text = await element.getText();
            prices.push(parseFloat(text.replace('$', '')));
        }
        for (let i = 0; i < prices.length - 1; i++) {
            if (prices[i] > prices[i + 1]) {
                return false;
            }
        }
        return prices.length > 0;
    },
    isProductListNotEmpty: async () => {
        const products = await $$(catalogUI.productPrices);
        return products.length > 0;
    },
    getFirstProductName: async () => {
        const firstProduct = await $(catalogUI.productNames);
        await firstProduct.waitForDisplayed();
        return await firstProduct.getText();
    },
};
