import { ObjectID } from 'bson';
import fs = require('fs');
import { PlayerDAO } from "../dao/player.dao";
import { PlayerModel } from "../models/player.model";

export class PlayerService {
    private playerDAO: PlayerDAO = new PlayerDAO();

    public async getAllplayer(): Promise<PlayerModel[]> {
        return await this.playerDAO.getAllPlayers()
    };

    public async createPlayer(player: PlayerModel, file: Express.Multer.File): Promise<PlayerModel> {
        
        const playerToCreate : PlayerModel = {
            ...player,
            created_date: new Date(),
            updated_date: new Date(),
            _id: new ObjectID(),
        }
        if (!this.checkPlayerIfExist(playerToCreate)) {
            throw new Error("invalid player");
        }
        return await this.playerDAO.createPlayer(playerToCreate)
    };

    public async updatedPlayer(playerId: string, player: PlayerModel, file: Express.Multer.File): Promise<PlayerModel> {
        const existingPlayer = await this.playerDAO.getPlayerById(new ObjectID(playerId));
        if(!existingPlayer) {
            throw new Error("no existing player")
            
        }
        const playerToUpdated : PlayerModel= {
            ...existingPlayer,
            ...player,
            updated_date: new Date(),
        }
        return await this.playerDAO.updatePlayer(playerToUpdated)
    };

    public async deletePlayer(playerId: string): Promise<any> {
        const existingPlayer = await this.playerDAO.getPlayerById(new ObjectID(playerId));
        if(!existingPlayer) {
            throw new Error("no existing player")
        }
        return await this.playerDAO.deletePlayer(new ObjectID(playerId));
    };

    private checkPlayerIfExist (player: PlayerModel) {
        return true;
    };

}
