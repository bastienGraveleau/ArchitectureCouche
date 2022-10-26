import { UserDAO } from "../dao/user.dao";
import { UserModel } from "../models/user.model";
import fs = require('fs');
import { ObjectID } from "bson";
import * as bcrypt from 'bcrypt';
import { PlayerModel } from "../models/player.model";
const jwt = require("jsonwebtoken");

export class UserService {
    private userDAO: UserDAO = new UserDAO();

    public async getAllUser(): Promise<UserModel[]> {
        return await this.userDAO.getAllUsers()
    }

    public async createUser(user: UserModel, file: Express.Multer.File): Promise<UserModel> {

        const userToCreate: UserModel = {
            ...user,
            created_date: new Date(),
            updated_date: new Date(),
            _id: new ObjectID(),
        }
        if (!this.checkUserIfExist(userToCreate)) {
            throw new Error("invalid player");
        }

        const pwd = await bcrypt.hash(user.password, 10);
        userToCreate.password = pwd;

        return await this.userDAO.createUser(userToCreate);

    }

    public async loginUser(email: string, password: string): Promise<PlayerModel|any> {
        const oneUserByEmail = await this.userDAO.getByEmail(email);
        console.log(oneUserByEmail)
        if (oneUserByEmail) {

            const valid = await bcrypt.compare(password, oneUserByEmail.password);
            if (!valid) {
                throw 'Paire login/mot de passe incorrecte';
            }
            const jwtToken = jwt.sign(
                { userId: oneUserByEmail._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            );
            return {
                userId: oneUserByEmail._id,
                token: jwtToken
            };
        }
        else {
            throw new Error('user not found');
        }
    }
    private checkUserIfExist(user: UserModel) {
        return user && user.email && user.password;
    }
}
