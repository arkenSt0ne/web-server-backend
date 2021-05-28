import { Optional } from 'sequelize';

export interface UserProfileAttributes {
    id?: string;
    profileId:string;
    name: string;
    gender: string;
    location?: string;
    website?: string;
    picture?: string;
}
export type UserProfileCreationAttributes = Optional<UserProfileAttributes, 'profileId'>;
