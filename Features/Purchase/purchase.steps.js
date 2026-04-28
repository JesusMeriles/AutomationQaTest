const { Given, When, Then } = require("@wdio/cucumber-framework");
const { expect, $} = require("@wdio/globals");
const { productsTask } = require("../../src/tasks/productsTask.js");
const { customer } = require("../../src/data/Purchase.js");
const { loginTask } = require("../../src/tasks/loginTask.js");
const { loginQuestions } = require("../../src/questions/loginQuestion.js");
const { purchaseTask } = require("../../src/tasks/purchaseTask.js");
const { purchaseQuestions } = require("../../src/questions/purchaseQuestion.js");


When(/^Agrega el primer producto al carrito$/, async () => {
    await purchaseTask.addFirstItemAndGoToCheckout();
    await driver.pause(3000);

});

When(
  'Completa el proceso de compra con los datos {string}, {string} y {string}',
  async (nombre, apellido, zip) => {
    await purchaseTask.fillInformation(nombre, apellido, zip);
    await driver.pause(3000);
  }
);

Then(/^Debería ver la pantalla de compra completada exitosamente$/, async () => {
    expect(await purchaseQuestions.isTitleCorrect()).toBe(true);
});

Then(/^El mensaje de confirmación debería ser "([^"]*)"$/, async (expectedMsg) => {
    const actualMsg = await purchaseQuestions.getSuccessMessage();
    expect(actualMsg).toBe(expectedMsg);
});

Then(/^La imagen del Pony Express debería estar presente$/, async () => {
    expect(await purchaseQuestions.isPonyExpressVisible()).toBe(true);
});