import { Application } from 'express';
import * as JWT from 'jsonwebtoken';
import { TokenData } from '../../interfaces/tokenData.interface';
import { RegisterableRouters } from '../../models/router.model';
class TokenAuth implements RegisterableRouters {
    public getAuthToken(userName: string): TokenData {
        const expiresIn = 60 * 60; // seconds 
        const secret = process.env['JWT_SECRET'] || '';
        return {
            expiresIn,
            token: JWT.sign({ _id: userName }, secret, { expiresIn })
        };
    }
    public register(app: Application): void {
        app.route('/getToken')
            .post((req, res) => {
                try {
                    const token = this.getAuthToken(req.body.username);
                    res.status(200).send(JSON.stringify(token));
                }
                catch (e) {
                    res.status(400).send(JSON.stringify({ name: e.name, msg: e.msg }));
                }
            });
    }
}
export default new TokenAuth;