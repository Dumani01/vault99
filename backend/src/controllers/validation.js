import { entities } from '../models/entities.js';
export class ApiError extends Error { constructor(status,message){super(message);this.status=status;} }
export function validId(value){if(!/^\d+$/.test(String(value))||Number(value)<1||Number(value)>4294967295)throw new ApiError(400,'ID inválido.');return Number(value);}
export function validate(entity,body){
 if(!body||Array.isArray(body)||typeof body!=='object')throw new ApiError(400,'Se requiere un objeto JSON.');
 const schema=entities[entity],result={};
 for(const key of Object.keys(body))if(!Object.hasOwn(schema,key))throw new ApiError(400,`Campo no permitido: ${key}`);
 for(const [key,rule] of Object.entries(schema)){
  let v=body[key];if(v===undefined&&rule.default!==undefined)v=rule.default;
  if(typeof v==='string')v=v.trim();
  if(v===undefined||v===null||v===''){if(rule.required)throw new ApiError(400,`El campo ${key} es obligatorio.`);result[key]=null;continue;}
  const fail=()=>{throw new ApiError(400,`Valor inválido en ${key}.`);};
  if(['text','url'].includes(rule.type)){if(typeof v!=='string'||v.length>rule.max)fail();if(rule.type==='url'&&!/^https?:\/\/[^\s]+$/i.test(v)&&!/^\/assets\/[\w.-]+$/.test(v))fail();}
  else if(rule.type==='enum'){if(!rule.values.includes(v))fail();}
  else if(rule.type==='bool'){if(![true,false,0,1].includes(v))fail();v=Boolean(v);}
  else {if(typeof v==='boolean'||!['number','string'].includes(typeof v)||!/^\d+(\.\d+)?$/.test(String(v)))fail();v=Number(v);if(!Number.isFinite(v))fail();
   if(rule.type==='id')v=validId(v);
   if(rule.type==='year'&&(!Number.isInteger(v)||v<1900||v>new Date().getFullYear()+1))fail();
   if(rule.type==='count'&&(!Number.isInteger(v)||v<0||v>4294967295))fail();
   if(rule.type==='size'&&(v<=0||v>999.9||Math.abs(v*10-Math.round(v*10))>1e-6))fail();
   if(rule.type==='money'&&(v<rule.min||v>9999999999.99||Math.abs(v*100-Math.round(v*100))>1e-4))fail();
  }
  result[key]=v;
 }
 if(entity==='colaboraciones'&&result.marca_principal_id===result.marca_colaboradora_id)throw new ApiError(400,'La colaboración requiere dos marcas diferentes.');
 return result;
}
