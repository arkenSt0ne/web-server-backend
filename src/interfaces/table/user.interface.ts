import {Optional} from 'sequelize';
export interface UserAttributes {
    id?: string;
    email: string;
    password?: string;
    isAdmin?:boolean;
    passwordResetToken?: string;
    passwordResetExpires?: Date;
    facebook?: string;
    tokenId?: string; // fk
}
export type UserCreationAttributes = Optional<UserAttributes, 'email'>;