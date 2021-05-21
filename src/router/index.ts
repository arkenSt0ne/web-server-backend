import { Application } from 'express';
import { RegisterableRouters } from '../models/router.model';
import SomeRouter from './routers/some.router';
import SomeRouter2 from './routers/some2.router';

const routes:RegisterableRouters[] = [SomeRouter,SomeRouter2];
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
