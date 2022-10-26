import { ObjectID } from "bson";

export interface PlayerModel {
    _id : ObjectID;
    general : number;
    name : string;
    age : number;
    club: string;
    price : number;
    created_date: Date;
    updated_date: Date;
}