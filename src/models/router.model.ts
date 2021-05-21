import { Application } from 'express';

export interface RegisterableRouters{
    register(app:Application) : void;
}