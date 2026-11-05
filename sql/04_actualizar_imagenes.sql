USE vault99_sneakers;
-- Optional update for existing demo databases. Preserves custom images.
START TRANSACTION;
UPDATE tenis SET imagen_url='/assets/lv-af1-red.jpg', colorway='Red / White', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-001' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/offwhite-jordan-chicago.jpg', colorway='Chicago / Red / Black', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-002' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/supreme-af1-white.png', colorway='White / White', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-003' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/dior-jordan.jpg', colorway='Grey / White', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-004' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/offwhite-presto.jpg', colorway='White / Black', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-005' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/supreme-foamposite.jpg', colorway='Red / Gold / Black', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-006' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/lv-af1-mid.jpg', colorway='White / White', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-007' AND imagen_url='/assets/sneaker-blue.png';
UPDATE tenis SET imagen_url='/assets/offwhite-vapormax.jpg', colorway='Black / Clear', descripcion='Fotografía de referencia del modelo. Precios y existencias ficticios para uso académico.' WHERE sku='V99-DEMO-008' AND imagen_url='/assets/sneaker-blue.png';
COMMIT;
