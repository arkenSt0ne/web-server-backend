
import express from 'express';
import * as JWT from 'jsonwebtoken';
import CustomException from '../exceptions/custom.exception';
import { DataStoredInToken } from '../interfaces/tokenData.interface';
import { logger } from '../utils/logger';

async function authMiddleWare(req: express.Request, res: express.Response, next: express.NextFunction):Promise<void> {
    const header = req.headers;
    if(header && header.authorization){
        const secret = process.env['JWT_SECRET']||'';
        try {
            const verificationRes = JWT.verify(header.authorization, secret) as DataStoredInToken;
            const username = verificationRes._id;
            const user = 'ankit';
            if(user != username){
                next(new CustomException('WrongAuthenticationTokenException', 'Incorrect Auth. Token'));
            }else{
                logger.info('[Token Verification] [PASSED] for: %s',username);
                next();
            }
        } catch (error) {
            next(new CustomException('WrongAuthenticationTokenException', error.message));
        }
    }else{
        next(new CustomException('MissingAuthorizationTokenException','Could not find the token in header'));
    }
    return; 
}
export default authMiddleWare;