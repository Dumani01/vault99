const base=import.meta.env.VITE_API_URL||'/api';
export async function api(path,options={}){
 let response;try{response=await fetch(base+path,{...options,headers:{'Content-Type':'application/json',...options.headers}});}catch{throw new Error('No se pudo conectar con el servidor. Comprueba que el backend esté iniciado.');}
 if(response.status===204)return null;
 let payload;try{payload=await response.json();}catch{throw new Error('El servidor no está disponible. Inicia el backend y vuelve a intentar.');}
 if(!response.ok)throw new Error(payload.message||'No se pudo completar la operación.');return payload.data;
}
export const save=(entity,data,id)=>api('/'+entity+(id?'/'+id:''),{method:id?'PUT':'POST',body:JSON.stringify(data)});
export const remove=(entity,id)=>api('/'+entity+'/'+id,{method:'DELETE'});
