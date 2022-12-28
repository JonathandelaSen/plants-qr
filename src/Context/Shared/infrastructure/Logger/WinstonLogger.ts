import winston from "winston"
import WinstonCloudWatch from "winston-cloudwatch"
import Utils from "../../domain/Utils"

const customLevels = {
    levels: {
        trace: 5,
        debug: 4,
        info: 3,
        warn: 2,
        error: 1,
        fatal: 0
    },
    colors: {
        trace: "white",
        debug: "green",
        info: "green",
        warn: "yellow",
        error: "red",
        fatal: "red"
    }
}

// The formatter controls how the logs are displayed
const formatter = winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.colorize(),
    winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
    winston.format.splat(),
    winston.format.printf(info => {
        const { timestamp, level, message, stack, ...meta } = info
        /*if (stack) {
            // print log trace
            return `${timestamp} ${level}: ${message} - ${stack}`;
        }*/
        return `${timestamp} [${level}]: ${message} ${Object.keys(meta).length ? JSON.stringify(meta, null, 2) : ""} ${stack ? "- " + stack : ""}`
    })
)

class Logger {
    logger: winston.Logger

    constructor() {
        // Log errors to a file while in prod environment

        const prodTransport = new winston.transports.File({
            filename: "logs/error.log",
            level: "error"
        })
        // Log to the console while in dev environment
        const transport = new winston.transports.Console({
            format: formatter
        })
        this.logger = winston.createLogger({
            level: Utils.isProdEnvironment() ? "error" : "trace",
            levels: customLevels.levels,
            transports: [Utils.isProdEnvironment() ? prodTransport : transport]
        })

        if (!Utils.isTestEnvironment() && process.env.AWS_ACCESS_KEY_ID && process.env.AWS_SECRET_ACCESS_KEY && process.env.AWS_REGION) {
            winston.add(
                new WinstonCloudWatch({
                    name: "PlantsQR-backend",
                    logGroupName: "PlantsQR-backend-Application-logs",
                    logStreamName: "PlantsQR-backend-application-logs",
                    awsAccessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    awsSecretKey: process.env.AWS_SECRET_ACCESS_KEY,
                    awsRegion: process.env.AWS_REGION
                })
            )

            winston.error(`Server Started at ${new Date()}`)
        }
        winston.addColors(customLevels.colors)
    }

    trace(msg: string, meta?: any) {
        this.logger.log("trace", msg, meta)
    }

    debug(msg: string, meta?: any) {
        this.logger.debug(msg, meta)
    }

    info(msg: string, meta?: any) {
        this.logger.info(msg, meta)
    }

    warn(msg: string, meta?: any) {
        this.logger.warn(msg, meta)
    }

    error(msg: string, meta?: any) {
        this.logger.error(msg, meta)
    }

    fatal(msg: string, meta?: any) {
        this.logger.log("fatal", msg, meta)
    }

    http(message: any) {
        this.logger.log("http", message)
    }
}

export default new Logger()
