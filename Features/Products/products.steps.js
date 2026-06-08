import { Given, When, Then } from "@wdio/cucumber-framework";
import { expect } from "@wdio/globals";
import { catalogQuestions } from "../../src/questions/catalogQuestion.js";
import { catalogTask } from "../../src/tasks/catalogTask.js";
import { loginTask } from "../../src/tasks/loginTask.js";

Given(/^El usuario se encuentra en la pantalla principal de productos$/, async () => {
    console.log("Intentando login...");
    await loginTask.as("standard_user", "secret_sauce");

    console.log("Validando catálogo...");
    const isCatalogVisible = await catalogQuestions.isCatalogVisible();
    console.log("Catalog visible:", isCatalogVisible);
});

When(/^Aplica el filtro de precio de menor a mayor$/, async () => {
    await catalogTask.byLowToHigh();
});

Then(/^Deberia ver los productos ordenados por precio de menor a mayor$/, async () => {
    const isOrdered = await catalogQuestions.arePricesOrderedLowToHigh();
    expect(isOrdered).toBe(true);
});

Then(/^Debería ver que la lista de productos no está vacía$/, async () => {
    const isNotEmpty = await catalogQuestions.isProductListNotEmpty();
    expect(isNotEmpty).toBe(true);
});

Then(/^El primer producto debería ser "([^"]*)"$/, async (expectedName) => {
    const actualName = await catalogQuestions.getFirstProductName();
    console.log(`Verificando nombre: Esperado "${expectedName}" - Real "${actualName}"`);
    expect(actualName).toBe(expectedName);
});
