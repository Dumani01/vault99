import {DataTypes,Model} from 'sequelize';
import {sequelize} from './db.js';
class Talla extends Model{}
Talla.init({id:{type:DataTypes.INTEGER.UNSIGNED,primaryKey:true,autoIncrement:true},sistema:{type:DataTypes.ENUM('US_HOMBRE','US_MUJER','EU'),allowNull:false},valor:{type:DataTypes.DECIMAL(4,1),allowNull:false,validate:{min:0.1}}},{sequelize,modelName:'Talla',tableName:'tallas',timestamps:false,indexes:[{unique:true,fields:['sistema','valor']}]});
export default Talla;
