import 'dotenv/config';
import {Sequelize} from 'sequelize';

export const sequelize=new Sequelize({
 dialect:'mysql',host:process.env.DB_HOST||'127.0.0.1',port:Number(process.env.DB_PORT||3306),
 username:process.env.DB_USER||'root',password:process.env.DB_PASSWORD||'',database:process.env.DB_NAME||'vault99_sneakers',
 logging:false,pool:{max:8,min:0,acquire:30000,idle:10000},dialectOptions:{decimalNumbers:true,charset:'utf8mb4'}
});
