import { Application } from 'express';
import {RegisterableRouters} from '../../models/router.model';
class SomeRouter2 implements RegisterableRouters{
    public  register(app:Application): void {
        app.route('/someRoute2')
        .get((req,res)=>{
            res.send('visiting SomeRoute');
        });
    }
}
export default new SomeRouter2;