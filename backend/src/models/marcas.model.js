import {DataTypes,Model} from 'sequelize';
import {sequelize} from './db.js';
class Marca extends Model{}
Marca.init({id:{type:DataTypes.INTEGER.UNSIGNED,primaryKey:true,autoIncrement:true},nombre:{type:DataTypes.STRING(120),allowNull:false,unique:true},descripcion:{type:DataTypes.STRING(255),allowNull:true},pais_origen:{type:DataTypes.STRING(100),allowNull:true}},{sequelize,modelName:'Marca',tableName:'marcas',timestamps:false});
export default Marca;
