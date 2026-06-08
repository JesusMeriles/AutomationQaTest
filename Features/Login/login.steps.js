import { Given, When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import { loginTask } from '../../src/tasks/loginTask.js';
import { loginQuestions } from '../../src/questions/loginQuestion.js';
import { catalogQuestions } from '../../src/questions/catalogQuestion.js';

Given(/^El usuario se encuentra en la pantalla de inicio de sesión$/, async () => {
    await driver.pause(3000);
});

When(/^intenta ingresar con el usuario "([^"]*)" y la contraseña "([^"]*)"$/, async (user, pass) => {
    await loginTask.as(user, pass);
});

Then(/^debería ver la pantalla principal de productos$/, async () => {
    const isVisible = await catalogQuestions.isCatalogVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver el icono del carrito de compras$/, async () => {
    const isVisible = await catalogQuestions.isCartVisible();
    expect(isVisible).toBe(true);
});

Then(/^debería ver al menos un producto en la lista$/, async () => {
    const isVisible = await catalogQuestions.isProductVisible();
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
