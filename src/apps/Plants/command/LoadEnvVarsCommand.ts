import dotenv from "dotenv"
export class LoadEnvVarsCommand {
    static async run() {
        dotenv.config()
    }
}
