import { Optional } from 'sequelize';

export interface UserProfileAttributes {
    profileId:string;
    name: string;
    gender: string;
    location: string;
    website: string;
    picture: string;
}
export type UserProfileCreationAttributes = Optional<UserProfileAttributes, 'profileId'>;
