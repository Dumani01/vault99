import express from 'express';
import cors from 'cors';
import {sequelize} from './models/db.js';
import {Colaboracion,Inventario,Marca,Tenis} from './models/index.js';
import {catalogo} from './models/catalogo.model.js';
import {validId,ApiError} from './controllers/validation.js';
import marcasRoutes from './routes/marcas.routes.js';
import colaboracionesRoutes from './routes/colaboraciones.routes.js';
import tenisRoutes from './routes/tenis.routes.js';
import tallasRoutes from './routes/tallas.routes.js';
import inventarioRoutes from './routes/inventario.routes.js';
const app=express();
app.disable('x-powered-by');
app.use(cors({origin:process.env.FRONTEND_ORIGIN||'http://127.0.0.1:5173'}));
app.use(express.json({limit:'100kb'}));
app.get('/api/health',async(req,res)=>{await sequelize.authenticate();res.json({success:true,data:{database:'MySQL',status:'ok'}});});
app.get('/api/catalogo',async(req,res)=>{let rows=await catalogo();const q=req.query;
 if(q.buscar)rows=rows.filter(r=>[r.modelo,r.sku,r.marca_principal,r.marca_colaboradora,r.colaboracion].join(' ').toLowerCase().includes(String(q.buscar).toLowerCase()));
 if(q.marca_id){const id=validId(q.marca_id);rows=rows.filter(r=>r.marca_principal_id===id||r.marca_colaboradora_id===id);}
 if(q.colaboracion_id){const id=validId(q.colaboracion_id);rows=rows.filter(r=>r.colaboracion_id===id);}
 if(q.rareza)rows=rows.filter(r=>r.rareza===q.rareza);
 if(q.talla_id){const id=validId(q.talla_id);rows=rows.filter(r=>r.tallas.some(s=>s.talla_id===id&&s.cantidad>0));}
 res.json({success:true,data:rows});
});
app.get('/api/catalogo/:id',async(req,res)=>{const rows=await catalogo(validId(req.params.id));if(!rows.length)throw new ApiError(404,'Modelo no encontrado.');res.json({success:true,data:rows[0]});});
app.get('/api/resumen',async(req,res)=>{const [modelos,marcas,colaboraciones,pares,modelosConInventario]=await Promise.all([Tenis.count(),Marca.count(),Colaboracion.count(),Inventario.sum('cantidad'),Tenis.findAll({attributes:['id'],include:[{model:Inventario,as:'inventarios',attributes:['cantidad'],required:false}]})]);const agotados=modelosConInventario.filter(t=>t.inventarios.every(i=>Number(i.cantidad)<=0)).length;res.json({success:true,data:{modelos,marcas,colaboraciones,pares:Number(pares||0),agotados}});});
app.use('/api/marcas',marcasRoutes);
app.use('/api/colaboraciones',colaboracionesRoutes);
app.use('/api/tenis',tenisRoutes);
app.use('/api/tallas',tallasRoutes);
app.use('/api/inventario',inventarioRoutes);
app.use((req,res)=>res.status(404).json({success:false,message:'Ruta no encontrada.'}));
app.use((error,req,res,next)=>{
 let status=error.status||500,message=error.status?error.message:'No se pudo conectar con la base de datos. Intenta nuevamente.';
 if(error.name==='SequelizeUniqueConstraintError'||error.code==='ER_DUP_ENTRY'){status=409;message='Ya existe un registro con esa combinación o valor único.';}
 if(error.name==='SequelizeForeignKeyConstraintError'||['ER_ROW_IS_REFERENCED_2','ER_ROW_IS_REFERENCED'].includes(error.code)){status=409;message='No se puede eliminar: hay registros relacionados.';}
 if(['ER_NO_REFERENCED_ROW_2','ER_NO_REFERENCED_ROW'].includes(error.code)){status=409;message='El registro relacionado no existe. Actualiza las opciones.';}
 if(error.name==='SequelizeValidationError'||['ER_CHECK_CONSTRAINT_VIOLATED','ER_DATA_TOO_LONG','ER_WARN_DATA_OUT_OF_RANGE','WARN_DATA_TRUNCATED'].includes(error.code)){status=400;message='Los datos no cumplen las restricciones.';}
 if(error.type==='entity.parse.failed'){status=400;message='JSON inválido.';}
 if(status>=500)console.error('API error:',error.code||error.name,process.env.NODE_ENV==='development'?error.stack:'');
 res.status(status).json({success:false,message});
});
export default app;

