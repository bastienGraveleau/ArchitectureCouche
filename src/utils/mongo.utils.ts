const mongodb = require('mongodb');
import * as mongoDB from "mongodb";

const IPBDD = process.env.IPBDD
const user = process.env.USERPASSWORD;
const password = process.env.MDPPASSWORD;
const portMongo = process.env.PORTMONGO;
const dbName = process.env.DBNAME || 'annuaire';

let mongodbClient: mongoDB.MongoClient;
let db: mongoDB.Db;
let URI_MONGO: string;
const DB_MONGO: string = `${dbName}`

export class MongoUtils {
    constructor() {
        
        let url = "mongodb://"
        if (user && password) {
            url = url + user + ":" + password + "@";
        }
        URI_MONGO = url + process.env.IPBDD + ":" + portMongo + "/" + dbName;

    }
    public dbConnect() {
        return new Promise((resolve, reject) => {
            if (db) {
                resolve(db);
            } else {
                mongodb.MongoClient.connect(URI_MONGO, function (err: any, client: mongoDB.MongoClient) {
                    if (err) {
                        console.error('Error connecting to the MongoDB URL: ' + URI_MONGO);
                        reject(err);
                    }
                    //console.log('Connected to the MongoDB URL');
                    mongodbClient = client;
                    db = mongodbClient.db(DB_MONGO);
                    // Make sure connection closes when Node exits
                    resolve(db);
                });
            }

            process.on('exit', (code) => {
                this.dbClose();
            })
        });
        
    }

    public dbClose() {
        if (mongodbClient) {
            mongodbClient.close();
        }
    }

}