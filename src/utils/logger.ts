import pino from 'pino';
import expressPinoLogger from 'express-pino-logger';
import { Application } from 'express';

export const logger = pino(
    {
        level: process.env['LOG_LEVEL'] || 'info',
        timestamp: () => {
            return ',"time":"'+(new Date()).toString()+'"';
        }
    },
    pino.destination('logs/log.log'),
);

export class RegisterLogger{
    public static register(app:Application) : void{
        app.use(expressPinoLogger({logger:logger}));
    }
}