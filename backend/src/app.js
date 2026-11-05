import express from 'express';
import cors from 'cors';
import {pool} from './models/db.js';
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
app.get('/api/health',async(req,res)=>{await pool.execute('SELECT 1');res.json({success:true,data:{database:'MySQL',status:'ok'}});});
app.get('/api/catalogo',async(req,res)=>{let rows=await catalogo();const q=req.query;
 if(q.buscar)rows=rows.filter(r=>[r.modelo,r.sku,r.marca_principal,r.marca_colaboradora,r.colaboracion].join(' ').toLowerCase().includes(String(q.buscar).toLowerCase()));
 if(q.marca_id){const id=validId(q.marca_id);rows=rows.filter(r=>r.marca_principal_id===id||r.marca_colaboradora_id===id);}
 if(q.colaboracion_id){const id=validId(q.colaboracion_id);rows=rows.filter(r=>r.colaboracion_id===id);}
 if(q.rareza)rows=rows.filter(r=>r.rareza===q.rareza);
 if(q.talla_id){const id=validId(q.talla_id);rows=rows.filter(r=>r.tallas.some(s=>s.talla_id===id&&s.cantidad>0));}
 res.json({success:true,data:rows});
});
app.get('/api/catalogo/:id',async(req,res)=>{const rows=await catalogo(validId(req.params.id));if(!rows.length)throw new ApiError(404,'Modelo no encontrado.');res.json({success:true,data:rows[0]});});
app.get('/api/resumen',async(req,res)=>{const [rows]=await pool.execute(`SELECT (SELECT COUNT(*) FROM tenis) AS modelos,(SELECT COUNT(*) FROM marcas) AS marcas,(SELECT COUNT(*) FROM colaboraciones) AS colaboraciones,(SELECT COALESCE(SUM(cantidad),0) FROM inventario) AS pares,(SELECT COUNT(*) FROM tenis t WHERE NOT EXISTS(SELECT 1 FROM inventario i WHERE i.tenis_id=t.id AND i.cantidad>0)) AS agotados`);res.json({success:true,data:rows[0]});});
app.use('/api/marcas',marcasRoutes);
app.use('/api/colaboraciones',colaboracionesRoutes);
app.use('/api/tenis',tenisRoutes);
app.use('/api/tallas',tallasRoutes);
app.use('/api/inventario',inventarioRoutes);
app.use((req,res)=>res.status(404).json({success:false,message:'Ruta no encontrada.'}));
app.use((error,req,res,next)=>{
 let status=error.status||500,message=error.status?error.message:'No se pudo conectar con la base de datos. Intenta nuevamente.';
 if(error.code==='ER_DUP_ENTRY'){status=409;message='Ya existe un registro con esa combinación o valor único.';}
 if(['ER_ROW_IS_REFERENCED_2','ER_ROW_IS_REFERENCED'].includes(error.code)){status=409;message='No se puede eliminar: hay registros relacionados.';}
 if(['ER_NO_REFERENCED_ROW_2','ER_NO_REFERENCED_ROW'].includes(error.code)){status=409;message='El registro relacionado no existe. Actualiza las opciones.';}
 if(['ER_CHECK_CONSTRAINT_VIOLATED','ER_DATA_TOO_LONG','ER_WARN_DATA_OUT_OF_RANGE','WARN_DATA_TRUNCATED'].includes(error.code)){status=400;message='Los datos no cumplen las restricciones.';}
 if(error.type==='entity.parse.failed'){status=400;message='JSON inválido.';}
 if(status>=500)console.error('API error:',error.code||error.name);
 res.status(status).json({success:false,message});
});
export default app;

