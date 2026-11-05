import 'dotenv/config';
import mysql from 'mysql2/promise';
import {readFile} from 'node:fs/promises';
const db=await mysql.createConnection({host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),user:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',multipleStatements:true});
try{for(const file of ['01_schema.sql','02_seed_demo.sql'])await db.query(await readFile(new URL('../../sql/'+file,import.meta.url),'utf8'));console.log('Five tables and demonstration data created.');}finally{await db.end();}
