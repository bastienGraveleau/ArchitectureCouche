import { ObjectID } from "bson";

export interface UserModel {
    _id : ObjectID;
    email : string;
    password : string;
    created_date: Date;
    updated_date: Date;
}
