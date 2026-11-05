import 'dotenv/config';
import assert from 'node:assert/strict';
import {writeFile} from 'node:fs/promises';
import {once} from 'node:events';
import {QueryTypes} from 'sequelize';
import app from '../src/app.js';
import {sequelize} from '../src/models/db.js';
const server=app.listen(0,'127.0.0.1');await once(server,'listening');
const base=`http://127.0.0.1:${server.address().port}/api`;
const evidence=[],cleanup=[];
async function request(method,path,body,status){
 const response=await fetch(base+path,{method,headers:{'Content-Type':'application/json'},body:body===undefined?undefined:JSON.stringify(body)});
 const data=response.status===204?null:await response.json();
 evidence.push({method,path,body,status:response.status,response:data});
 assert.equal(response.status,status,JSON.stringify(data));return data?.data;
}
async function create(entity,body){const row=await request('POST','/'+entity,body,201);cleanup.push([entity,row.id]);return row;}
async function one(sql,replacements=[]){const rows=await sequelize.query(sql,{replacements,type:QueryTypes.SELECT});return rows[0];}
let passed=0;
async function check(name,fn){await fn();passed++;console.log(`PASS ${name}`);}
try{
 const suffix=Date.now();let a,b,c,t,s,i;
 await check('P01 POST marca persists in MySQL',async()=>{a=await create('marcas',{nombre:'QA-A-'+suffix});const row=await one('SELECT * FROM marcas WHERE id=?',[a.id]);assert.equal(row.nombre,a.nombre);});
 await check('P02 duplicate brand returns 409',()=>request('POST','/marcas',{nombre:a.nombre},409));
 b=await create('marcas',{nombre:'QA-B-'+suffix});
 const collaboration={nombre:'QA Collaboration',marca_principal_id:a.id,marca_colaboradora_id:b.id,anio_lanzamiento:2022};
 await check('P03 collaboration with two real FK',async()=>{c=await create('colaboraciones',collaboration);assert.equal(c.marca_principal_id,a.id);assert.equal(c.marca_colaboradora_id,b.id);});
 await check('P04 same collaborators rejected',()=>request('POST','/colaboraciones',{...collaboration,marca_colaboradora_id:a.id},400));
 await check('P05 missing collaborator rejected',()=>request('POST','/colaboraciones',{...collaboration,marca_colaboradora_id:4294967295},409));
 const sneaker={colaboracion_id:c.id,sku:'QA-'+suffix,modelo:'QA Grail',colorway:'Blue',precio_venta_crc:250000,rareza:'GRAIL',condicion:'NUEVO'};
 await check('P06 create sneaker and joined catalog',async()=>{t=await create('tenis',sneaker);const row=await request('GET','/catalogo/'+t.id,undefined,200);assert.equal(row.marca_principal,a.nombre);assert.equal(row.marca_colaboradora,b.nombre);});
 await check('P07 duplicate SKU rejected',()=>request('POST','/tenis',sneaker,409));
 await check('P08 negative and zero prices rejected',async()=>{for(const precio_venta_crc of [0,-1])await request('POST','/tenis',{...sneaker,precio_venta_crc},400);});
 s=await create('tallas',{sistema:'EU',valor:99.9});
 await check('P09 duplicate size rejected',()=>request('POST','/tallas',{sistema:'EU',valor:99.9},409));
 await check('P10 create stock',async()=>{i=await create('inventario',{tenis_id:t.id,talla_id:s.id,cantidad:2,ubicacion:'QA'});});
 await check('P11 duplicate sneaker-size rejected',()=>request('POST','/inventario',{tenis_id:t.id,talla_id:s.id,cantidad:2},409));
 await check('P12 negative and fractional quantity rejected',async()=>{for(const cantidad of [-1,1.5])await request('PUT','/inventario/'+i.id,{tenis_id:t.id,talla_id:s.id,cantidad},400);});
 await check('P13 update stock and verify SQL persistence',async()=>{await request('PUT','/inventario/'+i.id,{tenis_id:t.id,talla_id:s.id,cantidad:7},200);const row=await one('SELECT cantidad FROM inventario WHERE id=?',[i.id]);assert.equal(row.cantidad,7);});
 for(const [name,entity,row] of [['P14','marcas',a],['P15','colaboraciones',c],['P16','tenis',t],['P17','tallas',s]])await check(name+' FK deletion protection',()=>request('DELETE','/'+entity+'/'+row.id,undefined,409));
 await check('P18 missing IDs return 404 in all entities',async()=>{for(const entity of ['marcas','colaboraciones','tenis','tallas','inventario'])await request('GET','/'+entity+'/4294967295',undefined,404);});
 await check('P19 all entity list/get/update endpoints work',async()=>{
  for(const [entity,row,body] of [['marcas',a,{nombre:a.nombre+'-edited'}],['colaboraciones',c,{...collaboration,nombre:'QA edited'}],['tenis',t,{...sneaker,modelo:'QA edited'}],['tallas',s,{sistema:'EU',valor:99.8}],['inventario',i,{tenis_id:t.id,talla_id:s.id,cantidad:7,ubicacion:'QA edited'}]]){
   assert.ok((await request('GET','/'+entity,undefined,200)).some(r=>r.id===row.id));
   assert.equal((await request('GET','/'+entity+'/'+row.id,undefined,200)).id,row.id);
   const updated=await request('PUT','/'+entity+'/'+row.id,body,200);for(const [k,v] of Object.entries(body))assert.equal(updated[k],v);
  }
 });
 await check('P21 catalog aggregates without duplicate rows',async()=>{const rows=await request('GET','/catalogo',undefined,200);assert.equal(rows.filter(r=>r.id===t.id).length,1);assert.equal(rows.find(r=>r.id===t.id).stock,7);});
 await check('P22 size availability and filters match SQL',async()=>{const rows=await request('GET','/catalogo?talla_id='+s.id,undefined,200);assert.equal(rows.length,1);assert.equal(rows[0].tallas[0].cantidad,7);const filtered=await request('GET','/catalogo?marca_id='+b.id+'&rareza=GRAIL&colaboracion_id='+c.id+'&buscar=QA',undefined,200);assert.equal(filtered.length,1);});
 await check('P23 independent request retains saved stock',async()=>{const row=await request('GET','/inventario/'+i.id,undefined,200);assert.equal(row.cantidad,7);});
 await check('JSON errors, immutable IDs, bad IDs, unknown routes',async()=>{await request('POST','/marcas',{id:25,nombre:'QA'},400);await request('GET','/marcas/nope',undefined,400);await request('GET','/unknown',undefined,404);});
 await check('Summary totals match database',async()=>{const summary=await request('GET','/resumen',undefined,200);const row=await one('SELECT SUM(cantidad) AS total FROM inventario');assert.equal(summary.pares,Number(row.total));});
 await check('P20 deletes all five entities when dependencies removed',async()=>{while(cleanup.length){const [entity,id]=cleanup.pop();await request('DELETE','/'+entity+'/'+id,undefined,204);await request('GET','/'+entity+'/'+id,undefined,404);}});
 await writeFile(new URL('../../docs/api-evidence.json',import.meta.url),JSON.stringify({date:new Date().toISOString(),passed,requests:evidence},null,2));
 console.log(`${passed} integration groups passed; ${evidence.length} HTTP requests recorded.`);
}finally{for(const [entity,id] of cleanup.reverse())await sequelize.query('DELETE FROM `'+entity+'` WHERE id=?',{replacements:[id]}).catch(()=>{});await new Promise(resolve=>server.close(resolve));await sequelize.close();}
