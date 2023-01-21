import { Given } from "cucumber"
import { PlantRepository } from "../../../../../src/Context/Plants/domain/persistence/PlantRepository"
import { Plant } from "../../../../../src/Context/Plants/domain/Plant"
import Injector from "../../../../../src/apps/Plants/dependency-injection"

Given("there is the plant:", async (plant: any) => {
    const container = await Injector.run()
    const plantRepository: PlantRepository = container.get("Plants.PlantRepository")
    const { _id, name } = JSON.parse(plant)
    await plantRepository.save(new Plant(_id, name))
})
