import {Request, response, Router} from "express";
const verifyToken = require('../middlewares/auth.middleware');
const apiRouter = Router();
import { PlayerService } from "../services/player.service";
import { PlayerModel } from "../models/player.model";

let playerServ = new PlayerService();

apiRouter.get('/index', (request, response) => {
    response.render('index.ejs')
})
apiRouter.get('/connexion', (req, res) => {
    res.render('connexion.ejs')
})
apiRouter.get('/player', verifyToken, async (req,res) =>{

    const players = await playerServ.getAllplayer()

    res.render('player.ejs', {title: 'liste des joueurs', players: players})
})

export default apiRouter;