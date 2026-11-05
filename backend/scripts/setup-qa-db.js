import 'dotenv/config';
import mysql from 'mysql2/promise';
import {readFile} from 'node:fs/promises';

const database=process.env.QA_DB_NAME||'vault99_sneakers_qa';
if(!/^[A-Za-z0-9_]+$/.test(database))throw new Error('QA_DB_NAME solo puede contener letras, números y guiones bajos.');

const db=await mysql.createConnection({
 host:process.env.DB_HOST||'127.0.0.1',
 port:Number(process.env.DB_PORT||3306),
 user:process.env.DB_USER||'root',
 password:process.env.DB_PASSWORD||'',
 multipleStatements:true
});

try{
 const [[existing]]=await db.query('SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME=?',[database]);
 if(existing)throw new Error(`La base de QA ${database} ya existe. No se modificó ningún dato.`);
 for(const file of ['01_schema.sql','02_seed_demo.sql']){
  const source=await readFile(new URL('../../sql/'+file,import.meta.url),'utf8');
  await db.query(source.replaceAll('vault99_sneakers',database));
 }
 console.log(`Base de QA ${database} creada con esquema y datos de demostración.`);
}finally{await db.end();}
