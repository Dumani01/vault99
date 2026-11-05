import {DataTypes,Model} from 'sequelize';
import {sequelize} from './db.js';
class Colaboracion extends Model{}
Colaboracion.init({id:{type:DataTypes.INTEGER.UNSIGNED,primaryKey:true,autoIncrement:true},nombre:{type:DataTypes.STRING(180),allowNull:false},marca_principal_id:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false},marca_colaboradora_id:{type:DataTypes.INTEGER.UNSIGNED,allowNull:false},anio_lanzamiento:{type:DataTypes.SMALLINT.UNSIGNED,allowNull:false,validate:{min:1900}},historia:{type:DataTypes.TEXT,allowNull:true},edicion_limitada:{type:DataTypes.BOOLEAN,allowNull:false,defaultValue:true}},{sequelize,modelName:'Colaboracion',tableName:'colaboraciones',timestamps:false,validate:{marcasDiferentes(){if(this.marca_principal_id===this.marca_colaboradora_id)throw new Error('La colaboración requiere dos marcas diferentes.');}}});
export default Colaboracion;
