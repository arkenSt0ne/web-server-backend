import { Sequelize } from 'sequelize';
import { InitUser, User } from '../../models/user/user.model';
import { InitUserProfile, UserProfile } from '../../models/user/user.profile.model';
import { InitUserToken, UserToken } from '../../models/user/user.token.model';
import { logger } from '../../utils/logger';

export function initTables(sequelize: Sequelize): void {
    InitUserToken(sequelize);
    InitUserProfile(sequelize);
    InitUser(sequelize);
    // UserToken.sync();
    User.hasOne(UserProfile, {
        foreignKey: 'profileId'
    });
    User.hasMany(UserToken, {
        foreignKey: 'groupId',
        as: 'tokens',
    });
    sequelize.sync({force:true}).then(() => {
        logger.info('Successfully created all the tables');
    });
    return ;
}