console.log('App.ts');
import dotenv from 'dotenv';
import express from 'express';
import {RegisterLogger} from './utils/logger';

dotenv.config();
const app = express();
RegisterLogger.register(app);
app.set('port', process.env['PORT']);
export default app;
