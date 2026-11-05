# Verificación de interfaz — 4 de noviembre de 2026

- Carrusel: Siguiente cambia el modelo, marcas, precio y contador.
- Detalle: carga desde API; talla EU 42 muestra dos pares en la referencia Off-White.
- Gestión: crear marca mediante formulario, editar descripción y recargar conserva el registro en MySQL.
- Borrado: diálogo de confirmación visible; se cancela. Eliminaciones efectivas y restricciones probadas por API.
- Inventario: selects muestran modelos y tallas de la base de datos.
- Búsqueda: Dior devuelve una pieza; filtros incluyen marcas, colaboración, rareza y talla.
- Backend apagado (P24): la galería muestra «El servidor no está disponible. Inicia el backend y vuelve a intentar.» y un botón de reintento.
- Build React (P25): completado sin errores.
- Diseño responsive: comprobación en viewport móvil de 390 × 844 y escritorio de 1440 × 900. Sin desbordamiento horizontal del documento.

Capturas: vista-movil.png y vista-escritorio.png.

Los modelos de demostración se ampliaron a 8, con 5 marcas, 7 colaboraciones, 8 tallas y 15 filas de inventario. Incluye un modelo agotado y modelos con una sola talla disponible.

La galería utiliza ilustraciones 2D originales y filtros de color, no los modelos 3D ni el código del video de referencia. No se ha desplegado en internet.

## Verificación final con Sequelize y QA

Verificada el 5 de noviembre de 2026 contra la instancia local de la copia `VAULT99-complete-project` y la base `vault99_sneakers_qa`.

- La página de Gestión cargó con API y MySQL disponibles; los indicadores mostraron los totales devueltos por `/api/resumen`.
- En Marcas se creó el registro temporal `QA Visual Marca`, se editó su descripción, se recargó la página y el registro persistió.
- El diálogo de confirmación de borrado se mostró y la eliminación posterior devolvió la tabla a cero registros. La API confirmó `GET /api/marcas` con cero filas.
- El formulario de Colaboraciones cargó las marcas reales desde MySQL en ambos selectores de relación.
- Los CRUD de las cinco entidades se verificaron además en la batería de integración: 25 grupos aprobados y 62 solicitudes HTTP, con persistencia, validaciones, restricciones de claves foráneas y limpieza de datos temporales.
