import { Application } from 'express';
import { RegisterableRouters } from '../models/router.model';
import SomeRouter from './routers/some.router';
import SomeRouter2 from './routers/some2.router';
import tokenAuthRouter from './routers/token.auth.router';

const routes:RegisterableRouters[] = [SomeRouter,SomeRouter2,tokenAuthRouter];
export class Router {
    public static registerRoutes(app:Application): void {
        app.route('/')
        .get((req,res)=>{
            res.send('Hello There');
        });
        routes.map((x)=>{
            x.register(app);
        });
        return;
    }
}
