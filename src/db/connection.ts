import { Sequelize } from 'sequelize-typescript';
import config from './config/config';

let sequelize = new Sequelize(config.development);

if (process.env.NODE_ENV === 'production') {
  sequelize = new Sequelize(config.production);
} else if (process.env.NODE_ENV === 'test') {
  sequelize = new Sequelize(config.test);
}


export default sequelize;
