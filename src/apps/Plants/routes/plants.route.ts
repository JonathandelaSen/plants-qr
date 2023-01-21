import { Express } from "express"
import { PlantsGetController } from "../controllers/PlantsGetController"
import { PlantsPutController } from "../controllers/PlantsPutController"
import Injector from "../dependency-injection"

export const register = async (app: Express) => {
    const container = await Injector.run()
    const plantsGetController: PlantsGetController = container.get("Apps.controllers.PlantsGetController")
    const plantsPutController: PlantsPutController = container.get("Apps.controllers.PlantsPutController")

    app.get("/plants", plantsGetController.run.bind(plantsGetController))
    app.put("/plants", plantsPutController.run.bind(plantsPutController))
}
