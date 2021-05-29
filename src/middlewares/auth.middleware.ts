
import express from 'express';
import * as JWT from 'jsonwebtoken';
import CustomException from '../exceptions/custom.exception';
import { DataStoredInToken } from '../interfaces/tokenData.interface';
import { logger } from '../utils/logger';

async function authMiddleWare(req: express.Request, res: express.Response, next: express.NextFunction): Promise<void> {
    res.type('json');
    const cookie = req.cookies;
    if (cookie && cookie.Authorization) {
        const secret = process.env['JWT_SECRET'] || '';
        try {
            const verificationRes = JWT.verify(cookie.Authorization, secret) as DataStoredInToken;
            const username = verificationRes._id;
            const user = 'ankit@somedomain.com';
            if (user != username) {
                const exception = new CustomException('WrongAuthenticationTokenException', 'Incorrect Auth. Token');
                res.status(400).send(exception.toJSON());
                // next(exception);
            } else {
                logger.info('[Token Verification] [PASSED] for: %s', username);
                next();
            }
        } catch (error) {
            const exception = new CustomException('WrongAuthenticationTokenException', error.message);
            res.status(400).send(exception.toJSON());
            // next(exception);
        }
    } else {
        const exception = new CustomException('MissingAuthorizationTokenException', 'Could not find the token in cookie');
        res.status(400).send(exception.toJSON());
        // next(exception);
    }
    return;
}
export default authMiddleWare;