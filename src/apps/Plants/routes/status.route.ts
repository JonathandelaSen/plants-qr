import { Express } from "express"
import StatusGetController from "../controllers/StatusGetController"
import Injector from "../dependency-injection"

export const register = async (app: Express) => {
    const container = await Injector.run()
    const statusGetController: StatusGetController = container.get("Apps.controllers.StatusGetController")

    app.get("/status", statusGetController.run.bind(statusGetController))
}
