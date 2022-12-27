import { Express } from "express"
import container from "../dependency-injection"
import { PlantsGetController } from "../controllers/PlantsGetController"
import { PlantsPostController } from "../controllers/PlantsPostController"

export const register = (app: Express) => {
    const plantsGetController: PlantsGetController = container.get("Apps.controllers.PlantsGetController")
    const plantsPostController: PlantsPostController = container.get("Apps.controllers.PlantsPostController")

    app.get("/plants", plantsGetController.run.bind(plantsGetController))
    app.post("/plants", plantsPostController.run.bind(plantsPostController))
}
