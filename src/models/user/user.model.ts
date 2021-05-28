import { Association, DataTypes, Model, Sequelize } from 'sequelize';
import { UserProfileAttributes } from '../../interfaces/table/profile.interface';
import {UserTokenAttributes} from '../../interfaces/table/token.interface';
import { UserAttributes, UserCreationAttributes } from '../../interfaces/table/user.interface';
import { UserToken } from './user.token.model';
export class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: string;
    public email!: string;
    public password!: string;
    public passwordResetToken!: string;
    public passwordResetExpires!: Date;
    public facebook!: string;
    public tokenId!: string; // fk
    public profileId!: string; // fk
    // timestamps!
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    // tokens
    public readonly tokens?: UserTokenAttributes[];// Note this is optional since it's only populated when explicitly requested in code
    public readonly profile!:UserProfileAttributes;
    public static associations: {
        tokens: Association<User, UserToken>;
      };
}
function InitUser(sequelize: Sequelize) : void {
    User.init({
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true,
        },
        email:{
            type: DataTypes.STRING,
            allowNull:false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull:false,
        },
        passwordResetToken:{
            type: DataTypes.STRING,
            allowNull:true,
        },
        passwordResetExpires:{
            type:DataTypes.DATE,
            allowNull:true,
        },
        tokenId: {
            type: DataTypes.UUID,
            allowNull: true,
        },
        facebook : {
            type:DataTypes.STRING,
            allowNull:true,
        },
        profileId: {
            type: DataTypes.UUID,
            allowNull: false,
        },

    },
    {
        tableName:'user',
        sequelize
    });
}
export {InitUser};