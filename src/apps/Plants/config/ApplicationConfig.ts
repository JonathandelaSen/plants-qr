export default {
    db: {
        prefix: process.env.MONGO_PREFIX,
        host: process.env.MONGO_HOST,
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASS,
        db: process.env.MONGO_DATABASE,
        port: process.env.MONGO_PORT
    }
}
