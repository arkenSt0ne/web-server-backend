import {Optional} from 'sequelize';
export  interface UserTokenAttributes{
    tokenId:string;
    groupId:string;
    token:string;
    kind:string;
}
export type UserTokenCreationAttributes = Optional<UserTokenAttributes, 'tokenId'>;