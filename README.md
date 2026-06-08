# Automation QA Test

Proyecto de automatización de pruebas end-to-end (E2E) para **Android** utilizando **WebdriverIO**, **Cucumber** (BDD), **Appium** y **Allure**.

La aplicación bajo prueba es [Sauce Labs Mobile Sample App](https://github.com/saucelabs/sample-app-mobile) (Swag Labs).

---

## Requisitos previos

### Software base

| Requisito | Versión recomendada |
|-----------|---------------------|
| **Node.js** | 18 o superior |
| **npm** | Incluido con Node.js |
| **Java JDK** | 11 o superior (requerido por Android SDK y Appium) |

### Android

1. **Android Studio** con Android SDK instalado.
2. Variables de entorno configuradas:
   - `ANDROID_HOME` → ruta del SDK (ej. `C:\Users\<usuario>\AppData\Local\Android\Sdk`)
   - Agregar al `PATH`:
     - `%ANDROID_HOME%\platform-tools`
     - `%ANDROID_HOME%\emulator`
3. **Emulador Android** creado en AVD Manager, o un **dispositivo físico** con depuración USB habilitada.
4. Verificar que el entorno esté listo:
   ```bash
   adb devices
   ```

### Herramientas del proyecto

- **Appium** se instala automáticamente como dependencia (`npm install`). El servicio `@wdio/appium-service` lo levanta al ejecutar las pruebas.
- **Allure CLI** (opcional, solo para abrir reportes localmente):
  ```bash
  npm install -g allure-commandline
  ```

---

## Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <repository-url>
   cd "Automation QA"
   ```

2. **Instalar dependencias:**
   ```bash
   npm install
   ```

3. **Colocar el APK** (ver sección siguiente).

4. **Ajustar el emulador** en `wdio.conf.js` si es necesario (`deviceName`, `platformVersion`).

---

## Configuración del APK

El APK **no se incluye en el repositorio**. Debes descargarlo y colocarlo manualmente.

### Ubicación esperada

```
app/
└── Android.SauceLabs.Mobile.Sample.app.2.3.0.apk
```

La ruta se resuelve automáticamente en `wdio.conf.js`:

```js
"appium:app": join(__dirname, 'app', 'Android.SauceLabs.Mobile.Sample.app.2.3.0.apk')
```

### Cómo obtenerlo

1. Ir a [Releases de Sauce Labs Sample App](https://github.com/saucelabs/sample-app-mobile/releases).
2. Descargar `Android.SauceLabs.Mobile.Sample.app.2.3.0.apk` (o la versión compatible).
3. Crear la carpeta `app/` en la raíz del proyecto si no existe.
4. Copiar el archivo dentro de `app/`.

### Verificar instalación

Con el emulador o dispositivo conectado:

```bash
adb install app/Android.SauceLabs.Mobile.Sample.app.2.3.0.apk
```

---

## Estructura del proyecto

```
Automation QA/
├── Features/                        # Capa BDD (Gherkin + Step Definitions)
│   ├── hooks.js                   # Hooks globales de Cucumber (reinicio de app)
│   ├── Login/
│   │   ├── 1.Login.feature        # Escenarios de inicio de sesión
│   │   └── login.steps.js         # Steps que conectan Gherkin con el código
│   ├── Products/
│   │   ├── 1.FilterProducts.feature
│   │   └── products.steps.js
│   └── Purchase/
│       ├── 1.PurchaseLowestPriceProduct.feature
│       └── purchase.steps.js
│
├── src/                           # Capa técnica (patrón Screenplay)
│   ├── ui/                        # Selectores de elementos (Page Objects)
│   │   ├── loginUI.js
│   │   ├── catalogUI.js
│   │   └── checkoutUI.js
│   ├── tasks/                     # Acciones / interacciones del usuario
│   │   ├── loginTask.js
│   │   ├── catalogTask.js
│   │   └── purchaseTask.js
│   ├── questions/                 # Validaciones y lecturas de estado
│   │   ├── loginQuestion.js
│   │   ├── catalogQuestion.js
│   │   └── purchaseQuestion.js
│   └── data/                      # Datos de prueba centralizados
│       └── Purchase.js
│
├── app/                           # APK de la aplicación (no versionado)
├── allure-results/                # Resultados crudos de Allure (generado)
├── allure-report/                 # Reporte HTML de Allure (generado)
├── wdio.conf.js                   # Configuración principal de WebdriverIO
├── package.json
└── README.md
```

---

## Patrón Screenplay

El proyecto separa responsabilidades en tres capas dentro de `src/`:

| Capa | Carpeta | Responsabilidad | Ejemplo |
|------|---------|-----------------|---------|
| **UI** | `src/ui/` | Selectores de elementos. Un archivo por pantalla o módulo. | `loginUI.userInput` → `'~test-Username'` |
| **Tasks** | `src/tasks/` | Acciones que el usuario realiza. No contienen aserciones. | `loginTask.as(user, pass)` |
| **Questions** | `src/questions/` | Consultas sobre el estado de la UI. Usadas en los `Then`. | `catalogQuestions.isCatalogVisible()` |

### Flujo de una prueba

```
.feature (Gherkin)
    ↓
.steps.js (Step Definitions)
    ↓
Task (When)  →  interactúa con  →  UI (selectores)
Question (Then)  →  valida contra  →  UI (selectores)
```

### Convención de nombres

| Tipo | Archivo | Export |
|------|---------|--------|
| UI | `loginUI.js` | `loginUI` |
| Task | `catalogTask.js` | `catalogTask` |
| Question | `catalogQuestion.js` | `catalogQuestions` |
| Data | `Purchase.js` | `customer`, `expectedSuccessMessage` |

El nombre del archivo usa **singular** (`loginTask.js`). El export de Questions usa **plural** (`loginQuestions`) porque agrupa múltiples validaciones.

---

## Ejecutar pruebas

### Todas las pruebas

```bash
npm test
```

Limpia resultados anteriores, ejecuta todos los `.feature` y genera `allure-results/`.

### Solo WebdriverIO (sin limpiar)

```bash
npm run wdio
```

### Por etiquetas (tags)

Los escenarios usan tags como `@qa`, `@login`, `@products`, `@purchase`:

```bash
# Solo login
npx wdio run wdio.conf.js --cucumberOpts.tags="@login"

# Solo productos
npx wdio run wdio.conf.js --cucumberOpts.tags="@products"

# Solo compra
npx wdio run wdio.conf.js --cucumberOpts.tags="@purchase"

# Toda la suite de QA
npx wdio run wdio.conf.js --cucumberOpts.tags="@qa"
```

### Limpiar resultados

```bash
npm run clean
```

---

## Reporting

El proyecto usa **Allure** para reportes visuales.

```bash
npm run report
```

Genera el reporte HTML desde `allure-results/` y lo abre en el navegador.

---

## Datos de prueba

Los datos que pueden cambiar entre ejecuciones o entornos se centralizan en `src/data/`, no en los archivos `.feature`.

Ejemplo en `src/data/Purchase.js`:

```js
export const customer = {
    firstName: 'Bruce',
    lastName: 'Wayne',
    postalCode: '1939'
};

export const expectedSuccessMessage = 'THANK YOU FOR YOU ORDER';
```

Los steps consumen estos datos:

```js
import { customer, expectedSuccessMessage } from '../../src/data/Purchase.js';

await purchaseTask.fillInformation(
    customer.firstName,
    customer.lastName,
    customer.postalCode
);
```

Para cambiar los datos de una prueba de compra, edita `Purchase.js` sin modificar el feature ni los steps.

---

## Escribir nuevas pruebas

### 1. Crear el escenario Gherkin

En `Features/<Modulo>/`, crea o edita un archivo `.feature`:

```gherkin
@qa @mi-modulo
Feature: Descripción de la funcionalidad

  Scenario: Descripción del escenario
    Given El usuario se encuentra en la pantalla de inicio de sesión
    When intenta ingresar con el usuario "standard_user" y la contraseña "secret_sauce"
    Then debería ver la pantalla principal de productos
```

### 2. Implementar la capa técnica (si es nueva funcionalidad)

Sigue este orden:

1. **`src/ui/miModuloUI.js`** — Agrega los selectores.
   - Preferir accessibility IDs (`~test-...`) sobre XPath cuando sea posible.
2. **`src/tasks/miModuloTask.js`** — Agrega las acciones del usuario.
   - Usa `waitForDisplayed()` en lugar de `driver.pause()`.
3. **`src/questions/miModuloQuestion.js`** — Agrega las validaciones.
4. **`src/data/`** (opcional) — Datos que no deben estar hardcodeados en el feature.

### 3. Conectar con Step Definitions

En `Features/<Modulo>/<modulo>.steps.js`:

```js
import { When, Then } from '@wdio/cucumber-framework';
import { expect } from '@wdio/globals';
import { miModuloTask } from '../../src/tasks/miModuloTask.js';
import { miModuloQuestions } from '../../src/questions/miModuloQuestion.js';

When(/^realiza alguna acción$/, async () => {
    await miModuloTask.algunaAccion();
});

Then(/^debería ver el resultado esperado$/, async () => {
    expect(await miModuloQuestions.esValido()).toBe(true);
});
```

### 4. Registrar el archivo de steps

Si creas un nuevo archivo de steps, agrégalo en `wdio.conf.js` dentro de `cucumberOpts.require`:

```js
require: [
    join(__dirname, 'Features/Login/login.steps.js'),
    join(__dirname, 'Features/Products/products.steps.js'),
    join(__dirname, 'Features/Purchase/purchase.steps.js'),
    join(__dirname, 'Features/MiModulo/miModulo.steps.js'),  // nuevo
    join(__dirname, 'Features/hooks.js')
],
```

### Buenas prácticas del proyecto

- Los **features** describen el comportamiento en lenguaje de negocio (español).
- Los **steps** son delgados: delegan lógica a Tasks y Questions.
- Los **selectores** viven solo en `src/ui/`, nunca en los steps.
- Los **datos variables** van en `src/data/`, no en el `.feature`.
- Usa **tags** (`@qa`, `@smoke`, etc.) para ejecutar subconjuntos de pruebas.
- El hook `Features/hooks.js` reinicia la app antes de cada escenario para garantizar aislamiento.

---

## Configuración (`wdio.conf.js`)

| Parámetro | Valor |
|-----------|-------|
| Runner | `local` |
| Puerto Appium | `4723` |
| Framework | `cucumber` |
| Reporters | `spec` + `allure` |
| Specs | `Features/**/*.feature` |
| Timeout por step | `60000` ms |
| App package | `com.swaglabsmobileapp` |

Para cambiar de emulador en local, define las variables de entorno o edita los valores por defecto en `wdio.conf.js`:

```js
'appium:deviceName': process.env.ANDROID_DEVICE_NAME || 'Pixel 8 Pro API 31',
'appium:platformVersion': process.env.ANDROID_PLATFORM_VERSION || '12.0',
```

En local, el `deviceName` debe coincidir con el nombre del AVD creado en Android Studio.

---

## Scripts disponibles

| Script | Descripción |
|--------|-------------|
| `npm test` | Limpia resultados, ejecuta todas las pruebas y genera `allure-results/` |
| `npm run test:ci` | Ejecuta solo escenarios `@qa` (usado en GitHub Actions) |
| `npm run wdio` | Ejecuta WebdriverIO sin limpiar resultados previos |
| `npm run report` | Genera y abre el reporte Allure |
| `npm run clean` | Elimina `allure-results/` y `allure-report/` |

---

## Integración continua (GitHub Actions)

El workflow `.github/workflows/android-e2e.yml` ejecuta automáticamente las pruebas E2E en un emulador Android.

### Cuándo se ejecuta

- Push a `main`, `master` o `UI-Automation`
- Pull requests hacia esas ramas
- Manualmente desde **Actions → Android E2E Tests → Run workflow**

### Qué hace el pipeline

1. Instala dependencias (`npm ci`)
2. Descarga el APK de Sauce Labs (no requiere tenerlo en el repo)
3. Levanta un emulador Android API 31 (Pixel 6)
4. Ejecuta `npm run test:ci` (escenarios con tag `@qa`)
5. Sube `allure-results/` como artefacto descargable

### Variables de entorno en CI

| Variable | Valor en CI | Descripción |
|----------|-------------|-------------|
| `CI` | `true` | Desactiva el servicio visual y reduce logs |
| `ANDROID_DEVICE_NAME` | `emulator-5554` | Dispositivo del emulador |
| `ANDROID_PLATFORM_VERSION` | `12` | Versión de Android del emulador |

`wdio.conf.js` lee estas variables automáticamente. En local se usan los valores por defecto.

### Ver el reporte Allure desde CI

1. Ir a la ejecución del workflow en GitHub → **Artifacts**
2. Descargar `allure-results`
3. Generar y abrir localmente:
   ```bash
   allure generate allure-results --clean -o allure-report
   allure open allure-report
   ```

### Ejecutar localmente como en CI

```bash
# Con emulador Android API 31 en ejecución
set CI=true
set ANDROID_DEVICE_NAME=emulator-5554
set ANDROID_PLATFORM_VERSION=12
npm run test:ci
```

En PowerShell:

```powershell
$env:CI = "true"
$env:ANDROID_DEVICE_NAME = "emulator-5554"
$env:ANDROID_PLATFORM_VERSION = "12"
npm run test:ci
```

---

## Stack tecnológico

- **WebdriverIO v9** — Framework de automatización
- **Cucumber** — BDD con Gherkin
- **Appium 3** — Automatización mobile (driver UiAutomator2)
- **Allure** — Reporting visual
- **Node.js (ESM)** — Runtime (`"type": "module"` en `package.json`)

---

## Escenarios actuales

| Feature | Tags | Descripción |
|---------|------|-------------|
| `Login` | `@login` | Login exitoso y casos de error (usuario bloqueado, credenciales inválidas) |
| `FilterProducts` | `@products` | Filtro de precio de menor a mayor |
| `Purchase` | `@purchase` | Compra del producto más barato y validación de checkout |
