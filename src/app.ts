console.log('App.ts');
import * as dotenvFlow from 'dotenv-flow';
import express from 'express';
import { logger,RegisterLogger } from './utils/logger';
import SQL_DB from './connections/db.sql.init';
import cookieParser from 'cookie-parser';

dotenvFlow.config();
const env: string = process.env['NODE_ENV'] || 'development';
const initDIR: string = process.env['INIT_CWD'] || '../';
dotenvFlow.load([`${initDIR}/.env`, `${initDIR}/.env.${env}`]);
const app = express();
RegisterLogger.register(app);
app.set('port', process.env['PORT']);
//initalize the db
const sql_db = new SQL_DB(logger);
app.use(express.json());
app.use(cookieParser());
export const sequelize = sql_db.init_db() && sql_db.check_conn() ? sql_db.get_conn() : null;

export default app;
