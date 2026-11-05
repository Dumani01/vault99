# VAULT 99 — Rare Sneaker Gallery

Galería inspirada en el video de referencia + sistema de inventario académico completo. React 19 / Vite, Express 5, MySQL 8+. Interfaz en español y precios en CRC. Cinco entidades: marcas, colaboraciones, tenis, tallas, inventario. Sin autenticación, carrito ni pagos.

## Abrir la versión preparada en este equipo

URL local: http://127.0.0.1:5173/ — API: http://127.0.0.1:3011/api

La base aislada usa el MySQL instalado en este equipo, puerto 3308 y archivos en la carpeta `work/mysql-data` de esta conversación. No modifica las bases existentes. La configuración de conexión ya está en backend/.env (no se incluye en el ZIP). Ejecuta `INICIAR-LOCAL.ps1` desde PowerShell si los servidores están detenidos. El script inicia los procesos en segundo plano; `DETENER-LOCAL.ps1` detiene solo los iniciados por ese script.

En este equipo, esta copia y `outputs/mini-proyecto-1` comparten la misma base de demostración; los cambios en sus datos se reflejan en ambas. Los puertos 3011 y 5173 pueden estar ocupados por la otra copia, de modo que el script no la sustituye automáticamente. Si deseas ejecutar esta copia, detén primero los servidores de la otra y luego inicia los de esta carpeta.

## Instalación portable / otro equipo

Requisitos: Node.js 22+ y MySQL 8.0.16+ (recomendado MySQL 8.4). Descomprime el ZIP y abre la carpeta mini-proyecto-1 en Visual Studio Code con Archivo → Abrir carpeta.

1. Abre una terminal en backend y ejecuta `npm install`.
2. Copia `.env.example` a `.env`. Configura DB_HOST, DB_PORT, DB_USER y DB_PASSWORD con tu instancia MySQL. El usuario de instalación debe poder crear la base. No publiques ese archivo.
3. En una base nueva, ejecuta `npm run db:setup`. Crea vault99_sneakers, las cinco tablas y datos demo. El instalador no borra tablas ni sobrescribe una base ya existente. Para importar manualmente usa MySQL Workbench: ejecuta sql/01_schema.sql y después sql/02_seed_demo.sql.
   Como alternativa basada en Sequelize, ejecuta `npm run db:migrate` para aplicar las cinco migraciones versionadas. Esta opción crea únicamente el esquema; los datos demo se cargan con el instalador SQL.
4. Ejecuta `npm run dev` en backend. Debe anunciar http://127.0.0.1:3011.
5. En otra terminal, dentro de frontend, ejecuta `npm install` y `npm run dev`.
6. Abre http://127.0.0.1:5173/. Vite redirige /api a 3011. Si cambias el puerto del backend, actualiza frontend/vite.config.js.

Para actualizar una base de demostración antigua sin recrearla, ejecuta en MySQL Workbench `sql/04_actualizar_imagenes.sql` y después `sql/05_corregir_colaboraciones.sql`. Estos scripts actualizan únicamente los registros demo identificados; el segundo puede ejecutarse nuevamente sin duplicar las colaboraciones corregidas. Para una base nueva, el archivo de datos iniciales ya contiene las asociaciones corregidas.

Para pruebas aisladas, desde `backend` ejecuta `npm run db:setup:qa` con una cuenta MySQL que tenga permiso `CREATE DATABASE`. Crea únicamente `vault99_sneakers_qa` y se detiene si esa base ya existe; no modifica `vault99_sneakers`. La cuenta limitada de la aplicación puede ejecutar el CRUD, pero no crear esta base de QA.

Las migraciones Sequelize viven en `backend/migrations`, una por entidad: marcas, tallas, colaboraciones, tenis e inventario. Usa `npm run db:migrate:undo:all` solamente en una base de QA para revertir el esquema administrado por Sequelize.

Si la base se creó con un usuario administrador, puedes cambiar backend/.env a un usuario con SELECT, INSERT, UPDATE y DELETE sobre vault99_sneakers. La instancia preparada ya usa una cuenta limitada. Mantén los servidores enlazados a 127.0.0.1: el panel no tiene autenticación por alcance académico.

## Uso

- Galería: flechas, teclado izquierda/derecha o deslizamiento horizontal cambian la pieza; Explorar pieza abre historia y tallas. El control de inclinación del escritorio transforma una ilustración 2D.
- Colección: filtros por búsqueda, marca, colaboración, rareza y talla con unidades disponibles.
- Gestión: cinco pestañas, cada una con crear, consultar, editar y eliminar con confirmación. Las relaciones se eligen desde datos reales de MySQL.
- Orden de creación: marcas y tallas → colaboraciones → tenis → inventario. Orden de borrado: inverso. Los registros dependientes bloquean el borrado (409).
- Un precio es positivo, el stock es entero no negativo, las marcas de una colaboración deben ser distintas, SKU/marcas/tallas/combinaciones de inventario no se repiten.

## Estructura

```text
mini-proyecto-1/
  backend/
    src/
      models/
      controllers/
      routes/
      app.js
    package.json
    .env.example
    server.js
    scripts/
    tests/
    config/
    migrations/
  frontend/
    src/
      components/
      pages/
      services/
      App.jsx
      main.jsx
      styles.css
    public/assets/
    package.json
    index.html
    .env.example
    vite.config.js
  sql/
    01_schema.sql
    02_seed_demo.sql
    03_consultas.sql
    04_actualizar_imagenes.sql
    05_corregir_colaboraciones.sql
  docs/
    justificacion.md
    modelo_datos.md
    diagrama_er.md
    diagrama_er.mmd
    diagrama_er.svg
    evidencias_dia_1.md
    api-evidence.json
    activos.md
  postman/VAULT99.postman_collection.json
  .gitignore
  README.md
```

## Repositorio

El proyecto está versionado en [GitHub](https://github.com/Dumani01/vault99), rama `main`. Los archivos `.env`, `node_modules` y las salidas de compilación no se publican.

## API

Para cada entidad: POST /api/{entidad}, GET /api/{entidad}, GET /api/{entidad}/:id, PUT /api/{entidad}/:id, DELETE /api/{entidad}/:id. Total: 25 operaciones CRUD.

GET /api/catalogo y /api/catalogo/:id devuelven colaboración, ambas marcas y tallas. GET /api/resumen devuelve agregados. GET /api/health verifica conexión. Respuestas: {success:true,data:...} o {success:false,message:...}; DELETE usa 204 sin cuerpo. PUT requiere todos los campos obligatorios. 400 validación, 404 inexistente, 409 duplicado/relación, 500 indisponibilidad interna. Todas las consultas usan parámetros y nombres de tablas/campos controlados por esquema.

## Pruebas

Dentro de backend: `npm test` y `npm run test:integration`. La integración requiere una base de demostración disponible, crea registros temporales y los elimina al terminar. No ejecutar contra inventario comercial. Registra las respuestas en docs/api-evidence.json. Dentro de frontend: `npm run build`.

Comprobado: 3 pruebas unitarias, 25 grupos de integración / 62 peticiones HTTP; persistencia por SELECT directo; build de producción; navegación y alta/edición/recarga en navegador. Consulta docs/evidencias_dia_1.md para evidencia real y docs/verificacion_interfaz.md para pruebas visuales.

## Límites y entrega

Proyecto local completo; no se ha publicado en internet. MySQL necesita un servidor persistente para desplegarlo. El archivo no incorpora node_modules, .env, datos privados de MySQL ni herramientas temporales. Los datos demo se reconstruyen con SQL.

El diseño recrea la composición del video con fotografías de referencia y una ilustración de respaldo. No es una copia del código original ni incluye sus modelos 3D. Las ocho referencias, precios y existencias son académicas, no una oferta de venta ni autenticidad certificada. El catálogo incorpora ocho fotografías distintas de referencia; sus fuentes están documentadas en docs/imagenes-productos.json. Todos los estados iniciales de autenticidad son PENDIENTE.
