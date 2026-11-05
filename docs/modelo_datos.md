# Modelo de datos y normalización

Motor MySQL 8+, InnoDB, utf8mb4. Exactamente cinco tablas de negocio. El DDL siguiente es el contrato completo de campos, tipos, PK, FK, UNIQUE, valores por defecto y CHECK.

```sql
CREATE DATABASE IF NOT EXISTS vault99_sneakers CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE vault99_sneakers;
CREATE TABLE marcas (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(120) NOT NULL UNIQUE,
 descripcion VARCHAR(255), pais_origen VARCHAR(100)
) ENGINE=InnoDB;
CREATE TABLE tallas (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 sistema ENUM('US_HOMBRE','US_MUJER','EU') NOT NULL,
 valor DECIMAL(4,1) NOT NULL,
 UNIQUE KEY uq_talla(sistema,valor), CHECK(valor>0)
) ENGINE=InnoDB;
CREATE TABLE colaboraciones (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 nombre VARCHAR(180) NOT NULL,
 marca_principal_id INT UNSIGNED NOT NULL,
 marca_colaboradora_id INT UNSIGNED NOT NULL,
 anio_lanzamiento SMALLINT UNSIGNED NOT NULL,
 historia TEXT, edicion_limitada BOOLEAN NOT NULL DEFAULT TRUE,
 FOREIGN KEY(marca_principal_id) REFERENCES marcas(id) ON DELETE RESTRICT,
 FOREIGN KEY(marca_colaboradora_id) REFERENCES marcas(id) ON DELETE RESTRICT,
 CHECK(marca_principal_id<>marca_colaboradora_id), CHECK(anio_lanzamiento>=1900)
) ENGINE=InnoDB;
CREATE TABLE tenis (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 colaboracion_id INT UNSIGNED NOT NULL,
 sku VARCHAR(60) NOT NULL UNIQUE,
 modelo VARCHAR(180) NOT NULL,
 colorway VARCHAR(120) NOT NULL, descripcion TEXT,
 precio_venta_crc DECIMAL(12,2) NOT NULL,
 costo_adquisicion_crc DECIMAL(12,2),
 rareza ENUM('EXCLUSIVO','MUY_RARO','GRAIL') NOT NULL,
 condicion ENUM('NUEVO','COLECCION') NOT NULL,
 autenticidad_estado ENUM('PENDIENTE','VERIFICADA') NOT NULL DEFAULT 'PENDIENTE',
 imagen_url VARCHAR(500),
 FOREIGN KEY(colaboracion_id) REFERENCES colaboraciones(id) ON DELETE RESTRICT,
 CHECK(precio_venta_crc>0), CHECK(costo_adquisicion_crc>=0)
) ENGINE=InnoDB;
CREATE TABLE inventario (
 id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
 tenis_id INT UNSIGNED NOT NULL, talla_id INT UNSIGNED NOT NULL,
 cantidad INT UNSIGNED NOT NULL DEFAULT 0, ubicacion VARCHAR(120),
 actualizado_en DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
 UNIQUE KEY uq_inventario(tenis_id,talla_id),
 FOREIGN KEY(tenis_id) REFERENCES tenis(id) ON DELETE RESTRICT,
 FOREIGN KEY(talla_id) REFERENCES tallas(id) ON DELETE RESTRICT,
 CHECK(cantidad>=0)
) ENGINE=InnoDB;

```

## Cardinalidades

- Una marca participa en cero o muchas colaboraciones como principal y, de forma independiente, como colaboradora. Cada colaboración requiere exactamente una de cada rol y ambas deben ser distintas.
- Una colaboración tiene cero o muchos tenis. Cada tenis tiene exactamente una colaboración.
- Cada tenis tiene cero o muchas filas de inventario. Cada talla tiene cero o muchas filas de inventario. Cada fila referencia exactamente un tenis y una talla.
- UNIQUE(tenis_id,talla_id) resuelve la relación muchos a muchos sin duplicar stock.
- Todas las eliminaciones referenciadas usan RESTRICT y devuelven HTTP 409.

## Normalización

1FN: cada atributo tiene un valor atómico; no se guardan listas de tallas ni marcas en una columna.

2FN: atributos como cantidad y ubicación dependen de la combinación tenis/talla; los atributos del modelo dependen de su identidad. Las claves sustitutas se acompañan de claves únicas naturales cuando corresponden.

3FN: el nombre de cada marca solo vive en marcas, la historia en colaboraciones y el valor/sistema en tallas. Tenis referencia una colaboración; inventario referencia tenis y tallas. No se duplican totales de stock ni nombres de marcas en tenis. Los JOIN producen la vista del catálogo sin crear una sexta entidad.

Reglas adicionales en la API: precios con máximo dos decimales; tallas con máximo un decimal; años entre 1900 y el próximo año; IDs enteros positivos; longitudes limitadas; esquemas cerrados que rechazan id y campos desconocidos. VERIFICADA requiere evidencia real y no se usa en el seed.
