import {validate,validId,ApiError} from './validation.js';
export function controllerFor(entity,model){return {
 list:async(req,res)=>res.json({success:true,data:await model.list()}),
 get:async(req,res)=>{const row=await model.get(validId(req.params.id));if(!row)throw new ApiError(404,'Registro no encontrado.');res.json({success:true,data:row});},
 create:async(req,res)=>res.status(201).json({success:true,data:await model.create(validate(entity,req.body))}),
 update:async(req,res)=>{const id=validId(req.params.id),data=validate(entity,req.body);const row=await model.update(id,data);if(!row)throw new ApiError(404,'Registro no encontrado.');res.json({success:true,data:row});},
 remove:async(req,res)=>{if(!await model.remove(validId(req.params.id)))throw new ApiError(404,'Registro no encontrado.');res.status(204).end();}
};}
