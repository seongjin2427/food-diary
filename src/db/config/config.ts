/* eslint-disable  @typescript-eslint/no-non-null-assertion */
import fs from 'fs';
import mysql2 from 'mysql2'

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql' | 'db2' | 'snowflake';

export default {
  development: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOSTNAME!,
    port: +process.env.DB_PORT!,
    dialect: 'mysql' as Dialect,
    dialectModule: mysql2,
    dialectOptions: {
      bigNumberStrings: true,
    },
    models: [__dirname + '/**/*.model.ts'],
  },
  test: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOSTNAME!,
    port: +process.env.DB_PORT!,
    dialect: 'mysql' as Dialect,
    dialectModule: mysql2,
    dialectOptions: {
      bigNumberStrings: true,
    },
    models: [__dirname + '/**/*.model.ts'],
  },
  production: {
    username: process.env.DB_USERNAME!,
    password: process.env.DB_PASSWORD!,
    database: process.env.DB_NAME!,
    host: process.env.DB_HOSTNAME!,
    port: +process.env.DB_PORT!,
    dialect: 'mysql' as Dialect,
    dialectModule: mysql2,
    dialectOptions: {
      bigNumberStrings: true,
      // ssl: {
      //   ca: fs.readFileSync(__dirname + '/mysql-ca-main.crt'),
      // },
    },
    models: [__dirname + '/**/*.model.ts'],
  },
};
