# Revisión del Día 1 — VAULT 99

Revisión del 4 de noviembre de 2026 contra Mini_Proyecto_1_Dia_1.docx. El proyecto satisface los requisitos técnicos revisados, pero no se debe afirmar que la entrega está totalmente cerrada.

| Requisito | Resultado y evidencia |
| --- | --- |
| Tema empresarial y justificación | Cumple: docs/justificacion.md explica el inventario por modelo y talla. |
| Mínimo tres entidades relacionadas | Cumple: cinco tablas y claves foráneas en sql/01_schema.sql. |
| Diagrama con atributos y relaciones | Cumple: docs/diagrama_er.mmd y versiones SVG/Markdown. |
| Node.js y API REST JSON | Cumple: Express, rutas y controladores para cinco entidades. |
| React con alta, edición, consulta y eliminación confirmada | Implementado en EntityPage.jsx y las cinco páginas de gestión. |
| Persistencia | Comprobada mediante las pruebas de integración con MySQL y SELECT directo. |
| Campos obligatorios y tipos en backend | Cumple: validation.js; tres pruebas unitarias aprobadas. |
| Sin autenticación | Cumple: sin login, registro, tokens ni roles. |
| POST 201, GET/PUT 200, inexistentes 404, DELETE 204 | Comprobado: 25 grupos de integración y 62 peticiones HTTP aprobados. |
| Estructura backend/frontend | Cumple: models, controllers, routes, components, pages y services. |
| Repositorio entregable | Cumple: proyecto versionado y publicado en [GitHub](https://github.com/Dumani01/vault99), rama `main`. |

## Observaciones antes de entregar

- Actualización: esta copia tiene backend/.env configurado para la misma base local de demostración que la copia hermana. El archivo está excluido de Git.
- Los servidores que ya escuchan en 3011 y 5173 ejecutan esa copia hermana, no esta carpeta VAULT99-complete-project/mini-proyecto-1. Los cambios de esta revisión están en la carpeta activa del IDE.
- Actualización: se separaron los lanzamientos de Air Presto White (2018), Foamposite Supreme Red (2014) y VaporMax Black (2018), tanto en la base local como en los datos iniciales. La actualización de una base existente está en sql/05_corregir_colaboraciones.sql.
- La revisión actual verificó código, pruebas API y compilación. No repitió la prueba interactiva del navegador; las capturas anteriores no documentan las nuevas imágenes.

## Imágenes añadidas

Ocho fotografías locales distintas para los ocho productos existentes; no se añadieron productos ficticios adicionales. Fuentes en imagenes-productos.json. Se eliminaron los filtros de recoloración y se actualizaron textos y SQL inicial.

Para una base demo existente, sql/04_actualizar_imagenes.sql actualiza imagen, color y descripción únicamente de los SKU demo que todavía conservan la imagen original. No elimina registros ni cambia existencias. El frontend también reconoce la imagen antigua por SKU para mostrar la fotografía correspondiente, sin reemplazar imágenes personalizadas.

La compilación React y las pruebas unitarias e integración finalizaron correctamente en esta revisión. Evidencias HTTP: docs/api-evidence.json.
