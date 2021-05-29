import express from 'express';
import { ValidationError, validationResult } from 'express-validator';
import { User } from '../models/user/user.model';
import { UserProfile } from '../models/user/user.profile.model';
import { getAuthToken } from '../router/routers/token.auth.router';
import { logger } from '../utils/logger';
import bcrypt from 'bcrypt';

export class UserController {
    private static storeAuthToken(response: express.Response, username: string){
        const tokenData = getAuthToken(username);
        const auth =`Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn}`;
        response.setHeader('Set-Cookie',[auth]);
        return;
    }
    public static async create(request: express.Request, response: express.Response): Promise<void> {
        response.type('json');
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            errorArray.map((err: ValidationError): ValidationError => {
                if (err.param == 'password') {
                    err.value = undefined;
                }
                return err;
            });
            logger.error('[Login] %s ', JSON.stringify(errors.array()));
            response.status(400).send(JSON.stringify(errors.array()));
            return;
        }
        const bodyProperty = (param: string): string => {
            return request.body[param] as string;
        };
        const email = bodyProperty('email');
        const name = bodyProperty('name');
        const gender = bodyProperty('gender');
        const emailFree = !(await UserController.isEmailExists(email));
        if (!emailFree) {
            logger.error('[Signup] Email %s already exists', email);
            response.status(400).send({ error: '' });
        } else {
            try {
                const usr_payload = { email: email, password: bodyProperty('password'), isAdmin:email=='ankit@ankit.org'};
                logger.info('User payload: %s', JSON.stringify(usr_payload));
                const user = await User.create(usr_payload);
                const profile_payload = { profileId: user.id, name: name, gender: gender };
                logger.info('User Profile: %s', JSON.stringify(user));
                logger.info('Profile payload: %s', JSON.stringify(profile_payload));
                UserController.storeAuthToken(response, email);
                await UserProfile.create(profile_payload);
                user.password = undefined;

                response.status(200).send(JSON.stringify(user));
            }
            catch (error) {
                logger.error('[%s] msg: %s', error.name, error.message);
                response.status(500).send(JSON.stringify(error));
            }
        }
        return;
    }
    public static async login(request: express.Request, response: express.Response): Promise<void> {
        response.type('json');
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            const errorArray = errors.array();
            errorArray.map((err: ValidationError): ValidationError => {
                if (err.param == 'password') {
                    err.value = undefined;
                }
                return err;
            });
            logger.error('[Login] %s ', JSON.stringify(errors.array()));
            response.status(400).send(JSON.stringify(errors.array()));
        } else {
            //do-something
            const email = request.body.email;
            const user = await UserController.getUser(email, request.body.password);
            if (user) {
                logger.info('[Login Success]: User: %s', JSON.stringify(user));
                //set auth token
                UserController.storeAuthToken(response,email);
                response.status(200).send(JSON.stringify(user));
            } else {
                logger.error('[Login Failed] for email id: [%s] ', email);
                response.status(400).send({ error: 'Invalid Credentials' });
            }
        }
        return;
    }
    public static async logout(request: express.Request, response: express.Response): Promise<void> {

        return;
    }
    private static async isEmailExists(email: string): Promise<boolean> {
        const users = await User.findAll({
            where: {
                email: email
            }
        });
        if (users && users.length != 0) {

            return true;
        } else {
            return false;
        }
    }
    private static async getUser(email: string, password: string): Promise<User | undefined> {
        const user = await User.findOne({
            where: {
                email: email
            }
        });
        logger.info('Found user for [%s] : %s',email, JSON.stringify(user));
        if (user) {
            const userPassword = user.password as string;
            const isPasswordMatching =  await bcrypt.compare(password, userPassword);
            logger.info('[COMPARE PSWD] %s',isPasswordMatching);
            if (isPasswordMatching) {
                user.password = undefined;
                return user;
            }
        }
        return;
    }
}