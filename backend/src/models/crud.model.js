import {entities} from './entities.js';
import {Marca,Colaboracion,Tenis,Talla,Inventario} from './index.js';
const models={marcas:Marca,colaboraciones:Colaboracion,tenis:Tenis,tallas:Talla,inventario:Inventario};
const plain=row=>row?.get({plain:true});
export function modelFor(entity){
 if(!Object.hasOwn(entities,entity))throw new Error('Unknown entity');
 const model=models[entity];
 return {
 async list(){return (await model.findAll({order:[['id','DESC']]})).map(plain);},
 async get(id){return plain(await model.findByPk(id));},
 async create(data){return plain(await model.create(data));},
 async update(id,data){const row=await model.findByPk(id);if(!row)return undefined;return plain(await row.update(data));},
 async remove(id){const row=await model.findByPk(id);if(!row)return 0;await row.destroy();return 1;}
 };
}
