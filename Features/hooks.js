import { Before } from '@wdio/cucumber-framework';

Before(async (scenario) => {
    const appId = 'com.swaglabsmobileapp';

    try {
        console.log(`--- Iniciando Escenario: ${scenario.pickle.name} ---`);
        await driver.terminateApp(appId);
        await driver.activateApp(appId);
        
    } catch (error) {
        console.error(`Error en el Hook Before al iniciar la app: ${error.message}`);
        throw error; 
    }
});

