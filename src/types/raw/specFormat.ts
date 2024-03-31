import type { PlatformVariable } from './platformVariable';

export interface SpecFormat {
    registered?: {
        proper_key: string;
        value: boolean;
        type: 'bool';
    };
    id?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    name?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    firstName?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    lastName?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    pictureUrl?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    profileUrl?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    bannerUrl?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    username?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    gender?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    language?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    location?: {
        proper_key: string;
        value: string;
        type: 'str';
    };
    lastSeen?: {
        proper_key: string;
        value: string;
        type: 'datetime';
    };
    creationDate?: {
        proper_key: string;
        value: string;
        type: 'datetime';
    };
    followers?: {
        proper_key: string;
        value: number;
        type: 'int';
    };
    following?: {
        proper_key: string;
        value: number;
        type: 'int';
    };
    premium?: {
        proper_key: string;
        value: boolean;
        type: 'bool';
    };
    platformVariables?: PlatformVariable[];
}