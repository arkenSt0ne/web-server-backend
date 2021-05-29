import {  DataTypes, Model, Sequelize } from 'sequelize';
import { UserTokenAttributes, UserTokenCreationAttributes } from '../../interfaces/table/token.interface';
export class UserToken extends Model<UserTokenAttributes, UserTokenCreationAttributes> implements UserTokenAttributes {
    public tokenId !: string;
    public groupId !: string;
    public token !: string;
    public kind !: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
function InitUserToken(sequelize: Sequelize): void {
    UserToken.init(
        {
            tokenId:{
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            groupId:{
                type: DataTypes.UUID,
                allowNull: false,
            },
            token:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            kind:{
                type: DataTypes.STRING,
                allowNull: false,
            }
        },
        {
            tableName:'token',
            sequelize,
        }
        );
    return;
}
export {InitUserToken};