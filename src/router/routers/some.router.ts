import { Application } from 'express';
import authMiddleWare from '../../middlewares/auth.middleware';
import {RegisterableRouters} from '../../models/router.model';
class SomeRouter implements RegisterableRouters{
    public  register(app:Application): void {
        app.route('/someRoute')
        .get(authMiddleWare,(req,res)=>{
            res.type('json');
            res.send({'res':'visiting someRoute'});
        });
    }
}
export default new SomeRouter;