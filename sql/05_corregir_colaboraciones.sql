USE vault99_sneakers;
-- Solo actualiza los tres registros demo que aún usan su colaboración original.
-- Se identifican las marcas por nombre y las colaboraciones por sus atributos.
START TRANSACTION;

INSERT INTO colaboraciones(nombre,marca_principal_id,marca_colaboradora_id,anio_lanzamiento,historia)
SELECT 'Air Presto White · Off-White', n.id, o.id, 2018, 'Referencia académica a la edición White de la colaboración Nike y Off-White, lanzada en 2018.'
FROM marcas n JOIN marcas o ON o.nombre='Off-White'
WHERE n.nombre='Nike' AND NOT EXISTS (SELECT 1 FROM colaboraciones c WHERE c.nombre='Air Presto White · Off-White' AND c.marca_principal_id=n.id AND c.marca_colaboradora_id=o.id AND c.anio_lanzamiento=2018);

INSERT INTO colaboraciones(nombre,marca_principal_id,marca_colaboradora_id,anio_lanzamiento,historia)
SELECT 'Air Foamposite One Red · Supreme', n.id, s.id, 2014, 'Referencia académica a la edición Red de la colaboración Nike y Supreme, lanzada en 2014.'
FROM marcas n JOIN marcas s ON s.nombre='Supreme'
WHERE n.nombre='Nike' AND NOT EXISTS (SELECT 1 FROM colaboraciones c WHERE c.nombre='Air Foamposite One Red · Supreme' AND c.marca_principal_id=n.id AND c.marca_colaboradora_id=s.id AND c.anio_lanzamiento=2014);

INSERT INTO colaboraciones(nombre,marca_principal_id,marca_colaboradora_id,anio_lanzamiento,historia)
SELECT 'Air VaporMax Black · Off-White', n.id, o.id, 2018, 'Referencia académica a la edición Black de la colaboración Nike y Off-White, lanzada en 2018.'
FROM marcas n JOIN marcas o ON o.nombre='Off-White'
WHERE n.nombre='Nike' AND NOT EXISTS (SELECT 1 FROM colaboraciones c WHERE c.nombre='Air VaporMax Black · Off-White' AND c.marca_principal_id=n.id AND c.marca_colaboradora_id=o.id AND c.anio_lanzamiento=2018);

UPDATE tenis t JOIN colaboraciones anterior ON anterior.id=t.colaboracion_id
JOIN marcas n ON n.nombre='Nike' JOIN marcas o ON o.nombre='Off-White'
JOIN colaboraciones nueva ON nueva.nombre='Air Presto White · Off-White' AND nueva.marca_principal_id=n.id AND nueva.marca_colaboradora_id=o.id AND nueva.anio_lanzamiento=2018
SET t.colaboracion_id=nueva.id
WHERE t.sku='V99-DEMO-005' AND anterior.nombre='The Ten · Archivo de diseño' AND anterior.marca_principal_id=n.id AND anterior.marca_colaboradora_id=o.id AND anterior.anio_lanzamiento=2017;

UPDATE tenis t JOIN colaboraciones anterior ON anterior.id=t.colaboracion_id
JOIN marcas n ON n.nombre='Nike' JOIN marcas s ON s.nombre='Supreme'
JOIN colaboraciones nueva ON nueva.nombre='Air Foamposite One Red · Supreme' AND nueva.marca_principal_id=n.id AND nueva.marca_colaboradora_id=s.id AND nueva.anio_lanzamiento=2014
SET t.colaboracion_id=nueva.id
WHERE t.sku='V99-DEMO-006' AND anterior.nombre='Air Force 1 · Archivo streetwear' AND anterior.marca_principal_id=n.id AND anterior.marca_colaboradora_id=s.id AND anterior.anio_lanzamiento=2020;

UPDATE tenis t JOIN colaboraciones anterior ON anterior.id=t.colaboracion_id
JOIN marcas n ON n.nombre='Nike' JOIN marcas o ON o.nombre='Off-White'
JOIN colaboraciones nueva ON nueva.nombre='Air VaporMax Black · Off-White' AND nueva.marca_principal_id=n.id AND nueva.marca_colaboradora_id=o.id AND nueva.anio_lanzamiento=2018
SET t.colaboracion_id=nueva.id
WHERE t.sku='V99-DEMO-008' AND anterior.nombre='The Ten · Archivo de diseño' AND anterior.marca_principal_id=n.id AND anterior.marca_colaboradora_id=o.id AND anterior.anio_lanzamiento=2017;
COMMIT;
