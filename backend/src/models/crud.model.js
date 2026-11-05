import {pool} from './db.js';
import {entities} from './entities.js';
export function modelFor(entity){
 if(!Object.hasOwn(entities,entity))throw new Error('Unknown entity');
 const table='`'+entity+'`';
 return {
 async list(){const [rows]=await pool.execute(`SELECT * FROM ${table} ORDER BY id DESC`);return rows;},
 async get(id){const [rows]=await pool.execute(`SELECT * FROM ${table} WHERE id=?`,[id]);return rows[0];},
 async create(data){const keys=Object.keys(data);const [r]=await pool.execute(`INSERT INTO ${table} (${keys.map(k=>'`'+k+'`').join(',')}) VALUES (${keys.map(()=>'?').join(',')})`,Object.values(data));return this.get(r.insertId);},
 async update(id,data){const keys=Object.keys(data);const [r]=await pool.execute(`UPDATE ${table} SET ${keys.map(k=>'`'+k+'`=?').join(',')} WHERE id=?`,[...Object.values(data),id]);return r.affectedRows?this.get(id):undefined;},
 async remove(id){const [r]=await pool.execute(`DELETE FROM ${table} WHERE id=?`,[id]);return r.affectedRows;}
 };
}
