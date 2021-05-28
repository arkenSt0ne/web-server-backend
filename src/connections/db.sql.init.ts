import { Sequelize } from 'sequelize';
import { DB_INIT } from '../interfaces/db.init.interface';
import { SQL_DB_CONFIG, getDBConfig } from '../configs/db.sql';
import pino from 'pino';
export default class SQL_DB implements DB_INIT {
    private sequelize!: Sequelize;
    private created_db!: boolean;
    private logger!: pino.Logger;
    private config!:unknown
    constructor(thatLogger: pino.Logger){
        this.logger = thatLogger;
    }
    create_db(): boolean {
        return true;
    }
    init_db(): boolean {
        const db_config = getDBConfig() as SQL_DB_CONFIG;
        this.config = db_config;
        if (db_config) {
            try {
                this.sequelize = new Sequelize(db_config);
                this.created_db = true;
                // this.sequelize.sync();
                return true;
            }
            catch (e) {
                this.logger.error('[%s]: %s',e.name, e.message);
                return false;
            }
        }
        this.created_db = false;
        return false;
    }
    async check_conn(): Promise<boolean> {
        if (this.created_db) {
            console.log('checking connection');
            try {
                await this.sequelize.authenticate();
                
                this.logger.info('Connection has been established successfully.');
                if(process.env['DB_CONFIG_DETAIL']=='true')
                    this.logger.info('Config details : %s',this.config);
                return true;
            } catch (error) {
                this.logger.error('[%s]: %s',error.name, error.message);
                return false;
            }
        }
        this.logger.error('call ._init_db() first');
        return false;
    }
    get_conn(): Sequelize | null {
        if (this.created_db) {
            return this.sequelize;
        }
        this.logger.error('call ._init_db() first');
        return null;
    }
}