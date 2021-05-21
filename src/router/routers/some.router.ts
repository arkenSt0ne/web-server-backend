import { Application } from 'express';
import {RegisterableRouters} from '../../models/router.model';
class SomeRouter implements RegisterableRouters{
    public  register(app:Application): void {
        app.route('/someRoute')
        .get((req,res)=>{
            res.send('visiting SomeRoute');
        });
    }
}
export default new SomeRouter;