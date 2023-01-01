import { Express } from "express"
import container from "../dependency-injection"
import { PlantsGetController } from "../controllers/PlantsGetController"
import { PlantsPutController } from "../controllers/PlantsPutController"

export const register = (app: Express) => {
    const plantsGetController: PlantsGetController = container.get("Apps.controllers.PlantsGetController")
    const plantsPutController: PlantsPutController = container.get("Apps.controllers.PlantsPutController")

    app.get("/plants", plantsGetController.run.bind(plantsGetController))
    app.put("/plants", plantsPutController.run.bind(plantsPutController))
}
