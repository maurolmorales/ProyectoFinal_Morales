# Simulador de Cobranzas - Proyecto Final JavaScript

Este proyecto es un **simulador interactivo de cobranzas** desarrollado como entrega final del curso de JavaScript. Permite calcular punitorios, registrar pagos, identificar clientes morosos, emitir recordatorios y visualizar un resumen consolidado por cliente.

# Funciones principales

- **Cálculo de punitorios** por saldo, tasa e interés diario.
- **Ingreso de pagos** y visualización del estado posterior.
- **Detección automática de clientes morosos**.
- **Generación de recordatorios** de deuda con persistencia en `localStorage`.
- **Pantalla de resumen de cliente** (saldo, estado, últimos pagos, recordatorios).
- **Filtro por nombre o estado del cliente** mediante un input de búsqueda.
- Datos obtenidos desde archivos `.json` remotos vía `fetch`.

---

## Lógica de negocio

El sistema simula el proceso de gestión de cobranzas:

1. Se consulta el estado de un cliente.
2. Se calcula su deuda punitoria.
3. Se registran pagos manualmente.
4. Se identifica si el cliente está en estado **moroso**.
5. Se genera un **recordatorio** (que queda almacenado en `localStorage`).
6. Se puede consultar un resumen con todos los datos consolidados por cliente.

---

## Tecnologías y herramientas utilizadas

Este proyecto se desarrolló utilizando herramientas modernas del ecosistema web y funcionalidades de JavaScript:

### Estructura y Simulación de Datos

- Se creó una carpeta `mockapi/` con archivos `.json` que simulan una base de datos:
  - `clientes.json` contiene datos personales y estado de los clientes.
  - `cuentas.json` contiene información financiera (saldo, estado).
  - `pagos.json` registra pagos asociados a clientes.

- Los datos son cargados de forma remota desde GitHub mediante el uso de `fetch()`.

---

### Interfaz de Usuario

- Se utilizó **Bootstrap** para el diseño responsive y estilizado de los componentes (inputs, botones, tarjetas, layout general).

- Los elementos HTML dinámicos (como resultados, recordatorios y resúmenes) se generan completamente desde **JavaScript** mediante `document.createElement`, `innerHTML` y `appendChild`.

---


### Lógica y Manipulación de Datos

- Se usaron estructuras de datos como **arrays** de objetos para manejar los registros de clientes, cuentas y pagos.

- Métodos de array aplicados:
  - `.filter()` para encontrar clientes morosos o pagos por ID.
  - `.find()` para obtener datos individuales (cliente, cuenta, pago).
  - `.some()` para validar si existe un recordatorio en `localStorage`.
  - `.forEach()` para recorrer y mostrar resultados en el DOM.

- El procesamiento es asíncrono:
  - Se utilizó `async/await` junto con `fetch()` para garantizar el acceso correcto a los datos antes de operar sobre ellos.

---

### Almacenamiento Local

- Se utilizó `localStorage` para guardar recordatorios personalizados de cada cliente moroso. Esto permite mantener la información entre recargas de la página.

---