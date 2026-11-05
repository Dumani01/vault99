USE vault99_sneakers;
-- Todo el catálogo, precios y existencias son demostraciones académicas ficticias.
-- Fotografías de referencia: fuentes en docs/imagenes-productos.json.
START TRANSACTION;
INSERT INTO marcas(nombre,descripcion,pais_origen) VALUES
('Nike','Referencia cultural; sin afiliación comercial.','Estados Unidos'),
('Louis Vuitton','Referencia de diseño de lujo; sin afiliación.','Francia'),
('Supreme','Referencia streetwear; sin afiliación.','Estados Unidos'),
('Off-White','Referencia de diseño; sin afiliación.','Italia');
INSERT INTO tallas(sistema,valor) VALUES ('US_HOMBRE',8),('US_HOMBRE',9),('US_HOMBRE',10),('EU',42),('US_MUJER',8);
INSERT INTO colaboraciones(nombre,marca_principal_id,marca_colaboradora_id,anio_lanzamiento,historia) VALUES
('Air Force 1 · Archivo de lujo',1,2,2022,'Referencia cultural de la colaboración Nike y Louis Vuitton. Catálogo académico, sin afiliación. Fotografías de referencia; inventario académico.'),
('The Ten · Archivo de diseño',1,4,2017,'Una exploración del lenguaje deconstruido. Referencia académica a Nike y Off-White; fotografías de referencia.'),
('Air Force 1 · Archivo streetwear',1,3,2020,'Referencia cultural al encuentro de Nike y Supreme. Datos, precios y existencias ficticios.');
INSERT INTO tenis(colaboracion_id,sku,modelo,colorway,descripcion,precio_venta_crc,costo_adquisicion_crc,rareza,condicion,imagen_url) VALUES
(1,'V99-DEMO-001','Air Force 1 · Louis Vuitton','Red / White','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',1850000,1200000,'GRAIL','COLECCION','/assets/lv-af1-red.jpg'),
(2,'V99-DEMO-002','Air Jordan 1 · Off-White','Chicago / Red / Black','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',1250000,850000,'MUY_RARO','COLECCION','/assets/offwhite-jordan-chicago.jpg'),
(3,'V99-DEMO-003','Air Force 1 · Supreme','White / White','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',425000,250000,'EXCLUSIVO','NUEVO','/assets/supreme-af1-white.png');
INSERT INTO inventario(tenis_id,talla_id,cantidad,ubicacion) VALUES (1,1,1,'Vitrina A-01'),(1,2,2,'Vitrina A-02'),(1,3,0,'Archivo A'),(2,2,1,'Vitrina B-01'),(2,4,2,'Archivo B'),(3,3,3,'Vitrina C-01'),(3,5,0,'Archivo C');
COMMIT;


-- Ampliación del archivo: referencias académicas, no artículos a la venta.
START TRANSACTION;
INSERT INTO marcas(id,nombre,descripcion,pais_origen) VALUES (5,'Dior','Referencia cultural; sin afiliación.','Francia');
INSERT INTO colaboraciones(id,nombre,marca_principal_id,marca_colaboradora_id,anio_lanzamiento,historia) VALUES
(4,'Air Dior · Archivo de alta costura',1,5,2020,'Referencia académica al encuentro entre Jordan y Dior. Nike agrupa la marca Jordan en este modelo simplificado. Fotografía de referencia, sin afiliación.'),
(5,'Air Presto White · Off-White',1,4,2018,'Referencia académica a la edición White de la colaboración Nike y Off-White, lanzada en 2018.'),
(6,'Air Foamposite One Red · Supreme',1,3,2014,'Referencia académica a la edición Red de la colaboración Nike y Supreme, lanzada en 2014.'),
(7,'Air VaporMax Black · Off-White',1,4,2018,'Referencia académica a la edición Black de la colaboración Nike y Off-White, lanzada en 2018.');
INSERT INTO tallas(id,sistema,valor) VALUES (6,'US_HOMBRE',8.5),(7,'US_HOMBRE',9.5),(8,'EU',43);
INSERT INTO tenis(id,colaboracion_id,sku,modelo,colorway,descripcion,precio_venta_crc,costo_adquisicion_crc,rareza,condicion,imagen_url) VALUES
(4,4,'V99-DEMO-004','Air Jordan 1 · Dior','Grey / White','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',2400000,1750000,'GRAIL','COLECCION','/assets/dior-jordan.jpg'),
(5,5,'V99-DEMO-005','Air Presto · Off-White','White / Black','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',675000,450000,'MUY_RARO','COLECCION','/assets/offwhite-presto.jpg'),
(6,6,'V99-DEMO-006','Air Foamposite One · Supreme','Red / Gold / Black','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',850000,600000,'MUY_RARO','COLECCION','/assets/supreme-foamposite.jpg'),
(7,1,'V99-DEMO-007','Air Force 1 Mid · Louis Vuitton','White / White','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',2150000,1600000,'GRAIL','COLECCION','/assets/lv-af1-mid.jpg'),
(8,7,'V99-DEMO-008','Air VaporMax · Off-White','Black / Clear','Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.',795000,520000,'EXCLUSIVO','NUEVO','/assets/offwhite-vapormax.jpg');
INSERT INTO inventario(tenis_id,talla_id,cantidad,ubicacion) VALUES
(4,2,1,'Vitrina D-01'),(4,7,0,'Archivo D'),(5,6,1,'Vitrina E-01'),(5,8,2,'Archivo E'),(6,3,1,'Vitrina F-01'),(7,7,1,'Vitrina G-01'),(8,2,0,'Archivo H'),(8,8,0,'Archivo H');
COMMIT;
