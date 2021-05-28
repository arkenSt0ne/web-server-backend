import { DataTypes, Model, Sequelize } from 'sequelize';
import { UserProfileAttributes, UserProfileCreationAttributes } from '../../interfaces/table/profile.interface';

export class UserProfile extends Model<UserProfileAttributes, UserProfileCreationAttributes> implements UserProfileAttributes {
    public profileId!: string;
    public name!: string;
    public gender!: string;
    public location!: string;
    public website!: string;
    public picture!: string;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
}
function InitUserProfile(sequelize: Sequelize): void {
    UserProfile.init(
        {
            profileId: {
                type: DataTypes.UUID,
                defaultValue: DataTypes.UUIDV4,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(40),
                allowNull: false,
            },
            gender: {
                type: DataTypes.STRING(10),
                allowNull: false,
            },
            location: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            website: {
                type: DataTypes.STRING,
                allowNull: true,
            },
            picture: {
                type: DataTypes.STRING,
                allowNull: true,
            },

        },
        {
            tableName: 'profile',
            sequelize
        });
    return;
}
export { InitUserProfile };