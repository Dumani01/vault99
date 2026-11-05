USE vault99_sneakers;
SELECT t.id,t.modelo,c.nombre AS colaboracion,m.nombre AS marca_principal,mc.nombre AS marca_colaboradora,
 (SELECT COALESCE(SUM(i.cantidad),0) FROM inventario i WHERE i.tenis_id=t.id) AS pares
FROM tenis t JOIN colaboraciones c ON c.id=t.colaboracion_id
JOIN marcas m ON m.id=c.marca_principal_id JOIN marcas mc ON mc.id=c.marca_colaboradora_id;
SELECT t.modelo,ta.sistema,ta.valor,i.cantidad,i.ubicacion FROM inventario i
JOIN tenis t ON t.id=i.tenis_id JOIN tallas ta ON ta.id=i.talla_id ORDER BY t.id,ta.valor;
SHOW TABLES;

SELECT c.nombre,m.nombre AS principal,mc.nombre AS colaboradora FROM colaboraciones c JOIN marcas m ON m.id=c.marca_principal_id JOIN marcas mc ON mc.id=c.marca_colaboradora_id;
SELECT t.modelo FROM tenis t WHERE NOT EXISTS(SELECT 1 FROM inventario i WHERE i.tenis_id=t.id AND i.cantidad>0);
SELECT * FROM tenis WHERE rareza='GRAIL';
SELECT modelo,precio_venta_crc FROM tenis ORDER BY precio_venta_crc DESC;
SELECT 'marcas' AS entidad,COUNT(*) AS total FROM marcas UNION ALL SELECT 'colaboraciones',COUNT(*) FROM colaboraciones UNION ALL SELECT 'tenis',COUNT(*) FROM tenis UNION ALL SELECT 'tallas',COUNT(*) FROM tallas UNION ALL SELECT 'inventario',COUNT(*) FROM inventario;
SELECT TABLE_NAME,COLUMN_NAME,REFERENCED_TABLE_NAME FROM information_schema.KEY_COLUMN_USAGE WHERE TABLE_SCHEMA='vault99_sneakers' AND REFERENCED_TABLE_NAME IS NOT NULL;
SELECT * FROM inventario WHERE cantidad<0;
