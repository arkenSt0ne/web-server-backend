import { Application } from 'express';
import { body } from 'express-validator';
import { UserController } from '../../controllers/user.controller';
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
class RegisterRouter implements RegisterableRouters {
    /**
     * register
     */
    public register(app: Application):void {
        // const passwordStrength = 'Password must contain at least one uppercase , one lowercase , one number and one special character ';
        // const pattern = '^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$';

        app.route('/signup')
        .post(
            body('email','Invalid email').isEmail().normalizeEmail(),
            body('password', 'Password length should be in between 8 and 12').isLength({ min: 8, max:12 }),
            // body('password',passwordStrength).matches(pattern),
            body('name','Name should not be blank').isLength({min:1, max: 40}),
            body('gender','Gender should not be blank').isLength({min:1, max: 10}),
            UserController.create
            );
        app.route('/login')
        .post(
            body('email','Invalid email').isEmail().normalizeEmail(),
            body('password', 'Password length should be in between 8 and 12').isLength({ min: 8, max:12 }),
            UserController.login
            );
        return;
    }
}
export  {SomeRouter,RegisterRouter};