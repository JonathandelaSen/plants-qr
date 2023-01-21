import { MongoClient } from "mongodb"
import ApplicationConfig from "../../../../apps/Plants/config/ApplicationConfig"
//import ApplicationConfig from "../../../../config/ApplicationConfig"
//import WinstonLogger from "../logger/WinstonLogger"
//import { LoggerTagConstants } from "../../domain/LoggerTagConstants"

export class MongoConnector {
    private client: MongoClient
    private connected = false

    constructor() {}

    public async getClient(): Promise<MongoClient> {
        if (this.connected) {
            return this.client
        }
        await this.connect()
        return this.client
    }

    async connect() {
        console.log("Connecting DB mongo", MongoConnector.getMongoURL())
        this.client = await MongoClient.connect(MongoConnector.getMongoURL())
            .then(function (db) {
                /*WinstonLogger.info("DB connected", {
                    tag: LoggerTagConstants.DB
                })*/
                console.log("DB connected")
                return db
            })
            .catch(function (err) {
                /*WinstonLogger.error("Error connecting DB", {
                    tag: LoggerTagConstants.DB
                })
                WinstonLogger.error(err, {
                    tag: LoggerTagConstants.DB
                })*/
                console.log("Error connecting DB", err)
                return err
            })
        this.connected = true
    }

    async close(): Promise<void> {
        return await this.client.close()
    }

    private static getMongoURL(): string {
        const authPart = ApplicationConfig.db.pass && ApplicationConfig.db.user ? `${ApplicationConfig.db.user}:${ApplicationConfig.db.pass}@` : null
        const port = ApplicationConfig.db.port ? ":" + ApplicationConfig.db.port : ""

        if (authPart) {
            return (
                (ApplicationConfig.db.prefix ?? "") +
                authPart +
                ApplicationConfig.db.host +
                port +
                "/" +
                ApplicationConfig.db.db +
                "?retryWrites=true&w=majority"
            )
        }
        return (
            (ApplicationConfig.db.prefix ?? "") +
            ApplicationConfig.db.host +
            port +
            "/" +
            ApplicationConfig.db.db +
            "?retryWrites=true&w=majority&authSource=admin"
        )
    }
}
