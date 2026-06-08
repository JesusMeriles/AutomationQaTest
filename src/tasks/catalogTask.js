import { catalogUI } from '../ui/catalogUI.js';

export const catalogTask = {
    byLowToHigh: async () => {
        const btn = await $(catalogUI.filterBtn);
        await btn.waitForDisplayed();
        await btn.click();

        const option = await $(catalogUI.filterOptionLowToHigh);
        await option.waitForDisplayed({ timeout: 5000 });
        await option.click();

        await $(catalogUI.titleProducts).waitForDisplayed({ timeout: 5000 });
    },
};
