import { MongoUtils } from "../utils/mongo.utils";
import * as mongoDB from "mongodb";
import { ObjectID } from "bson";
import { PlayerModel } from "../models/player.model";

export class PlayerDAO {
    db : mongoDB.Db;
    mongoUtils = new MongoUtils();
    collectionPlayer = 'player';

    constructor() {
        this.mongoUtils.dbConnect().then((database: mongoDB.Db) => {
            this.db = database;
        }).catch((err) =>{
            console.log('Erreur pendant la connexion à la BDD' + err.message);
        });
    };

    public async getAllPlayers(): Promise<PlayerModel[]> {
        const players = (await this.db.collection(this.collectionPlayer).find({}).toArray()) as PlayerModel[];
        return players;
    };
    
    public async getPlayerById(playerID: ObjectID): Promise<PlayerModel> {
        const player = (await this.db.collection(this.collectionPlayer).find({_id:playerID}).toArray()) as PlayerModel[];
        return player[0];
    };
    
    public async getByEmail(email: string): Promise<PlayerModel> {
        const player = (await this.db.collection(this.collectionPlayer).find({"email":email}).toArray()) as PlayerModel[];
        return player[0];
    };

    public async getPlayerByDept(dept:string): Promise<PlayerModel[]> {
        const player = (await this.db.collection(this.collectionPlayer).find({"dept":dept}).sort({updated_date:-1}).toArray()) as PlayerModel[];
        return player;
    };
    
    public createPlayer(player:PlayerModel) : PlayerModel {
        this.db.collection(this.collectionPlayer).insertOne(player);
        return player;
    };
    
    public updatePlayer(player: PlayerModel) : PlayerModel {
        this.db.collection(this.collectionPlayer).updateOne({_id:player._id},{$set:player});
        return player;
    };
    
    public deletePlayer(playerID: ObjectID): string {
        this.db.collection(this.collectionPlayer).deleteOne({_id:playerID});
        return "L'utilisateur a bien été supprimé !";
    };
};
