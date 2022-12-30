import Utils from "../../../Context/Shared/domain/Utils"

export default {
    db: {
        prefix: process.env.MONGO_PREFIX,
        host: process.env.MONGO_HOST,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        db: Utils.isTestEnvironment() ? process.env.MONGO_DATABASE_TEST : process.env.MONGO_DATABASE_TEST,
        port: process.env.MONGO_PORT
    }
}
