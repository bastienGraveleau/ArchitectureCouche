import { PlayerModel } from "../models/player.model";
import { PlayerService } from "../services/player.service"
import { Request, Router } from "express";

const playerRouter = Router();
const playerServ = new PlayerService();

playerRouter.get('/', (request:Request, response) =>{
    try {
        playerServ.getAllplayer().then((players: PlayerModel[]) => {
            response.status(200).send(players);
        }).catch((error) => {
            response.status(500).send(error.message);
        });
    }
    catch (error) {
        response.status(400).send(error.message);
    };
});

playerRouter.post('/', (request:Request,response) => {
    try {
        playerServ.createPlayer(request.body, request.file).then((players: PlayerModel) =>{
            response.status(200).send(players);
        }).catch((error) => {
            response.status(500).send(error.message);
        });
    } 
    catch (error) {
        response.status(400).send(error.message);
    }
});

playerRouter.delete('/:id', (request: Request, response) =>{
    try {
        console.log(request.params.id)
        playerServ.deletePlayer(request.params.id).then(() =>{
            response.status(200).send();
        }).catch((error) => {
            response.status(500).send(error.message);
        });
    } 
    catch (error) {
        response.status(400).send(error.message);
    }
})

playerRouter.patch('/:id', (request:Request, response) => {
    try {
        playerServ.updatedPlayer(request.params.id, request.body, request.file).then( (players : PlayerModel) => {
            response.status(200).send(players);
        })

    }
    catch (error) {
        response.status(400).send(error.message);
    }
})


export default playerRouter;
