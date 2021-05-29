import { Application } from 'express';
import {RegisterableRouters} from '../../models/router.model';
class SomeRouter2 implements RegisterableRouters{
    public  register(app:Application): void {
        app.route('/checkAccess')
        .get((req,res)=>{
            res.send('');
        });
    }
}
export default new SomeRouter2;