import express from 'express';
import bcrypt from 'bcrypt';
import { validationResult } from 'express-validator';

async function hashPassword(req: express.Request, _res: express.Response, next: express.NextFunction): Promise<void> {
    const validationErrors = validationResult(req);
    if (validationErrors.isEmpty() && req.body['password']) {
        const hashedPassword = await bcrypt.hash(req.body.password as string, 10);
        req.body['password'] = hashedPassword;
        next();
    } else {
        next();
    }
    return;
}
export { hashPassword };