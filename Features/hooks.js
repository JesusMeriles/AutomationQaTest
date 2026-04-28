import { Before } from '@wdio/cucumber-framework';

Before(async (scenario) => {
    const appId = 'com.swaglabsmobileapp';

    try {
        console.log(`--- Iniciando Escenario: ${scenario.pickle.name} ---`);
        await driver.terminateApp(appId);
        await driver.activateApp(appId);
        
    } catch (error) {
        console.log('Error en el Hook Before:', error.message);
    }
});

