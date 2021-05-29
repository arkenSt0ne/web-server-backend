import pino from 'pino';
import { logger } from '../utils/logger';

type Dialect = 'mysql' | 'postgres' | 'sqlite' | 'mariadb' | 'mssql';

export interface SQL_DB_CONFIG {
    host: string,
    port?: number,
    username: string,
    password: string,
    dialect: Dialect,
    database: string,
    logging?:(sql: string, timing?: number) => void,
    toString():string
}
export const getDBConfig = (): SQL_DB_CONFIG | undefined => {
    if (process.env['DB_DIALECT']) {
        const portNumber = process.env['DB_PORT'] as string;
        const ret:SQL_DB_CONFIG={
            host:process.env['DB_HOST']||'',
            port: +portNumber||undefined,
            username:process.env['DB_USERNAME']||'',
            password:process.env['DB_PASSWORD']||'',
            database:process.env['DB_NAME']||'',
            dialect: (process.env['DB_DIALECT']||'') as Dialect,
            logging: (msg:string) => logger.info('[Sequelize] %s',msg ),
        };
        ret.toString = ():string => {
            return JSON.stringify(ret);
        };
        return ret;
    } else {
        return;
    }
};
