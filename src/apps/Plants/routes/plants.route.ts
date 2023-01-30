import { Express } from "express"
import { PlantsGetController } from "../controllers/PlantsGetController"
import { PlantsPutController } from "../controllers/PlantsPutController"
import Injector from "../dependency-injection"
import { PlantGetController } from "../controllers/PlantGetController"
import PlantDeleteController from "../controllers/PlantDeleteController"

export const register = async (app: Express) => {
    const container = await Injector.run()
    const plantsGetController: PlantsGetController = container.get("Apps.controllers.PlantsGetController")
    const plantGetController: PlantGetController = container.get("Apps.controllers.PlantGetController")
    const plantDeleteController: PlantDeleteController = container.get("Apps.controllers.PlantDeleteController")
    const plantsPutController: PlantsPutController = container.get("Apps.controllers.PlantsPutController")

    app.get("/plants", plantsGetController.run.bind(plantsGetController))
    app.get("/plant/:id", plantGetController.run.bind(plantGetController))
    app.delete("/plant/:id", plantDeleteController.run.bind(plantDeleteController))
    app.put("/plants", plantsPutController.run.bind(plantsPutController))
}
