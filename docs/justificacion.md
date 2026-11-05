# VAULT 99 — Justificación empresarial

Responsable: Kendall Salazar Vargas. Mini Proyecto 1. Demostración académica.

VAULT 99 es una boutique conceptual de sneakers de colección. Su público son coleccionistas y aficionados a colaboraciones de diseño de lujo. El problema empresarial es conocer qué modelos existen, quiénes colaboran en cada lanzamiento y cuántos pares quedan en cada talla. Un total por modelo no basta: una talla puede estar agotada mientras otra tiene unidades.

El objetivo general es administrar un archivo curado y su inventario por talla con persistencia real. Objetivos específicos: normalizar marcas y colaboraciones; registrar modelos y precios; mantener tallas consistentes; prevenir duplicados; mostrar disponibilidad desde la base de datos; implementar CRUD completo y validar relaciones.

Las cinco entidades son marcas, colaboraciones, tenis, tallas e inventario. La colaboración reúne dos marcas distintas; cada tenis pertenece a una colaboración; inventario conecta cada tenis con su talla. Este alcance satisface el modelado conectado sin añadir tablas de usuarios, ventas u órdenes.

La propuesta visual usa una galería oscura, grandes siluetas, plataforma iluminada y carrusel inspirados en el video de referencia. El catálogo utiliza fotografías de referencia de ocho modelos distintos, con fuentes documentadas. Precios y stock son ficticios. No existe afiliación comercial con las marcas.

El sistema no implementa autenticación, carrito, compras ni pagos. Se ejecuta en loopback para uso académico local.
