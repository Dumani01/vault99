import {DataTypes,Model} from 'sequelize';
import {sequelize} from './db.js';
class Inventario extends Model{}
Inventario.init({id:{type:DataTypes.INTEGER.UNSIGNED,primaryKey:true,autoIncrement:true},tenis_id:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false},talla_id:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false},cantidad:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false,defaultValue:0,validate:{min:0,isInt:true}},ubicacion:{type:DataTypes.STRING(120),allowNull:true},actualizado_en:{type:DataTypes.DATE,allowNull:false,defaultValue:DataTypes.NOW}},{sequelize,modelName:'Inventario',tableName:'inventario',timestamps:false,indexes:[{unique:true,fields:['tenis_id','talla_id']}]});
export default Inventario;
