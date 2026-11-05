import {pool} from './db.js';
export async function catalogo(id){
 const [rows]=await pool.execute(`SELECT t.*,c.nombre AS colaboracion,c.historia,c.anio_lanzamiento,c.marca_principal_id,c.marca_colaboradora_id,
 m.nombre AS marca_principal,mc.nombre AS marca_colaboradora,
 (SELECT COALESCE(SUM(i.cantidad),0) FROM inventario i WHERE i.tenis_id=t.id) AS stock
 FROM tenis t JOIN colaboraciones c ON c.id=t.colaboracion_id JOIN marcas m ON m.id=c.marca_principal_id JOIN marcas mc ON mc.id=c.marca_colaboradora_id ${id?'WHERE t.id=?':''} ORDER BY t.id`,id?[id]:[]);
 if(!rows.length)return rows;
 const [sizes]=await pool.execute(`SELECT i.*,ta.sistema,ta.valor FROM inventario i JOIN tallas ta ON ta.id=i.talla_id ${id?'WHERE i.tenis_id=?':''} ORDER BY ta.sistema,ta.valor`,id?[id]:[]);
 const byId=new Map();for(const size of sizes){if(!byId.has(size.tenis_id))byId.set(size.tenis_id,[]);byId.get(size.tenis_id).push(size);}
 return rows.map(row=>({...row,tallas:byId.get(row.id)||[]}));
}
