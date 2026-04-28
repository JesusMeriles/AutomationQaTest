const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');
const { loginTask } = require('../../src/tasks/loginTask.js');
const { loginQuestions } = require('../../src/questions/loginQuestion.js');

Given(/^El usuario se encuentra en la pantalla de inicio de sesión$/, async () => {
    await driver.pause(3000);

});

When(/^intenta ingresar con el usuario "([^"]*)" y la contraseña "([^"]*)"$/, async (user, pass) => {
    await loginTask.as(user, pass);
});

Then(/^debería ver la pantalla principal de productos$/, async () => {
    const isVisible = await loginQuestions.isCatalogVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver el icono del carrito de compras$/, async () => {
    const isVisible = await loginQuestions.isCartVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver al menos un producto en la lista$/, async () => {
    const isVisible = await loginQuestions.isProductVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver el mensaje de error "([^"]*)"$/, async (mensajeEsperado) => {
    await driver.pause(5000); 
    const mensajeReal = await loginQuestions.errorMessage();
    console.log(`Texto capturado: "${mensajeReal}"`);
    expect(mensajeReal).toContain(mensajeEsperado);
});

Then(/^debería ver el widget de error$/, async () => {
    const isVisible = await loginQuestions.isErrorWidgetVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver el icono de error en el campo de usuario$/, async () => {
    const isVisible = await loginQuestions.isErrorIconVisible();
    expect(isVisible).toBe(true);
});
