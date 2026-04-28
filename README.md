# Automation QA Test

Proyecto de automatización de pruebas end-to-end (E2E) utilizando **WebdriverIO**, **Cucumber** (BDD) y **Appium** para testing mobile.

## Requisitos Previos

- **Node.js** (versión 16 o superior)
- **npm** (gestor de paquetes)

Nota: Appium se instala automáticamente como dependencia del proyecto, no es necesario instalarlo manualmente.

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

## Estructura del Proyecto

```
├── Features/              # Archivos de características BDD (Gherkin)
├── src/                   # Código fuente y utilidades
├── app/                   # Archivos de aplicación
├── allure-results/        # Resultados de pruebas (generados automáticamente)
├── allure-report/         # Reportes visuales de Allure
├── wdio.conf.js          # Configuración de WebdriverIO
├── package.json          # Dependencias del proyecto
└── README.md             # Este archivo
```

## Ejecutar Pruebas

### Ejecutar todas las pruebas:
```bash
npm test
```

Este comando:
- Limpia los resultados anteriores
- Ejecuta todas las pruebas en `Features/**/*.feature`
- Genera reportes en `allure-results/`

### Ejecutar solo WebdriverIO:
```bash
npm run wdio
```

### Generar y abrir reporte Allure:
```bash
npm run report
```

### Limpiar resultados previos:
```bash
npm run clean
```

### Ejecutar pruebas con configuración directa:
```bash
npx wdio run wdio.conf.js
```

Este comando ejecuta WebdriverIO directamente con la configuración especificada en `wdio.conf.js`. Útil si necesitas ejecutar las pruebas sin usar los scripts de npm predefinidos.

### Ejecutar pruebas por etiquetas (tags):
```bash
npx wdio run wdio.conf.js --cucumberOpts.tags="@tag"
```

Para usar esta funcionalidad, debes etiquetar tus escenarios en los archivos `.feature`:
```gherkin
@smoke
Scenario: Verificar login
  Given el usuario está en la página de login
  When ingresa sus credenciales
  Then debe ver la página principal
```

## Reporting

El proyecto utiliza **Allure Framework** para generar reportes visuales detallados. Los reportes incluyen:
- Resumen general de pruebas
- Detalles de cada caso de prueba
- Capturas de pantalla (attachments)
- Historial de ejecuciones

Para ver el reporte después de ejecutar las pruebas:
```bash
npm run report
```


## Stack Tecnológico

- **WebdriverIO v9.27.0** - Framework de automatización
- **Cucumber** - Framework BDD para escribir casos de prueba
- **Appium** - Automatización de aplicaciones mobile
- **Allure** - Framework de reporting
- **Node.js** - Runtime de JavaScript

## Escribir Nuevas Pruebas

Las pruebas se escriben en formato Gherkin en archivos `.feature` dentro de la carpeta `Features/`:

```gherkin
Feature: Descripción de la característica

  Scenario: Descripción del escenario
    Given el usuario está en la página principal
    When hace clic en el botón de login
    Then debe ver el formulario de login
```

## Configuración

La configuración principal se encuentra en `wdio.conf.js`:
- **Runner**: Local
- **Port**: 4723 (Appium)
- **Framework**: Cucumber
- **Reporters**: Allure y Spec

## Scripts Disponibles

| Script | Descripción |
|--------|------------|
| `npm test` | Ejecuta todas las pruebas y genera reportes |
| `npm run wdio` | Ejecuta WebdriverIO sin limpiar resultados |
| `npm run report` | Genera y abre el reporte Allure |
| `npm run clean` | Limpia los resultados y reportes anteriores |
