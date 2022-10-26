import { UserModel } from "../models/user.model";
import { UserService } from "../services/user.service"
import { Request, Router } from "express";
import { PlayerModel } from "../models/player.model";

const userRouter = Router();
const userServ = new UserService();

userRouter.get('/', (request:Request, response) =>{
    try {
        userServ.getAllUser().then((users: UserModel[]) => {
            response.status(200).send(users);
        }).catch((error) => {
            response.status(500).send(error.message);
        });
    }
    catch (error) {
        response.status(400).send(error.message);
    };
});

userRouter.post('/', (request:Request,response) => {
    try {
        console.log(request.body)
        userServ.createUser(request.body, request.file).then((users: UserModel) =>{
            response.status(200).send(users);
        }).catch((error) => {
            response.status(500).send(error.message);
        });
    } 
    catch (error) {
        response.status(400).send(error.message);
    }
});

userRouter.post('/login', (request:Request, response) => {
    try {
        console.log("bodsy",request.body)
        userServ.loginUser(request.body.email, request.body.password).then((users: PlayerModel)=>{
            response.status(200).send(users)
        })
        .catch((error) => {
            response.status(500).send(error.message);
        })
    }
    catch (error) {
        response.status(400).send(error);
    }
})

export default userRouter;
