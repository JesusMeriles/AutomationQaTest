import { When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { customer, expectedSuccessMessage } from "../../src/data/Purchase.js";
import { purchaseTask } from "../../src/tasks/purchaseTask.js";
import { purchaseQuestions } from "../../src/questions/purchaseQuestion.js";

When(/^Agrega el primer producto al carrito$/, async () => {
    await purchaseTask.addFirstItemAndGoToCheckout();
    await driver.pause(3000);
});

When(/^Completa el proceso de compra$/, async () => {
    await purchaseTask.fillInformation(
        customer.firstName,
        customer.lastName,
        customer.postalCode
    );
    await driver.pause(3000);
});

Then(/^Debería ver la pantalla de compra completada exitosamente$/, async () => {
    expect(await purchaseQuestions.isTitleCorrect()).toBe(true);
});

Then(/^El mensaje de confirmación debería ser el esperado$/, async () => {
    const actualMsg = await purchaseQuestions.getSuccessMessage();
    expect(actualMsg).toBe(expectedSuccessMessage);
});

Then(/^La imagen del Pony Express debería estar presente$/, async () => {
    expect(await purchaseQuestions.isPonyExpressVisible()).toBe(true);
});
