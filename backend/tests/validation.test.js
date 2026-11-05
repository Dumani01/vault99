import test from 'node:test';
import assert from 'node:assert/strict';
import {validate,validId} from '../src/controllers/validation.js';
test('rejects unsafe IDs and protected/unknown fields',()=>{
 for(const id of [0,-1,'1 OR 1=1','2.5',4294967296])assert.throws(()=>validId(id));
 assert.throws(()=>validate('marcas',{nombre:'Nike',id:1}));
 assert.throws(()=>validate('marcas',{nombre:'   '}));
 assert.throws(()=>validate('marcas',{nombre:'x'.repeat(121)}));
});
test('stock is a nonnegative integer and numeric booleans are rejected',()=>{
 for(const cantidad of [-1,1.5,true,{},'NaN'])assert.throws(()=>validate('inventario',{tenis_id:1,talla_id:1,cantidad}));
 assert.equal(validate('inventario',{tenis_id:1,talla_id:1,cantidad:0}).cantidad,0);
});
test('enforces distinct collaborators, year bounds and size precision',()=>{
 assert.throws(()=>validate('colaboraciones',{nombre:'x',marca_principal_id:1,marca_colaboradora_id:1,anio_lanzamiento:2022}));
 assert.throws(()=>validate('tallas',{sistema:'EU',valor:42.25}));
 assert.throws(()=>validate('tallas',{sistema:'OTHER',valor:42}));
});
