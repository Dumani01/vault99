import 'dotenv/config';
import app from './src/app.js';
const host=process.env.HOST||'127.0.0.1',port=Number(process.env.PORT||3011);
app.listen(port,host,()=>console.log(`VAULT 99 API: http://${host}:${port}`)).on('error',error=>{console.error('No se pudo iniciar la API:',error.code);process.exitCode=1;});


