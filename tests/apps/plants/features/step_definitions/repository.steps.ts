import { Given } from "cucumber"
import container from "../../../../../src/apps/Plants/dependency-injection"
import { PlantRepository } from "../../../../../src/Context/Plants/domain/persistence/PlantRepository"
import { Plant } from "../../../../../src/Context/Plants/domain/Plant"

Given("there is the plant:", async (plant: any) => {
    const plantRepository: PlantRepository = container.get("Plants.PlantRepository")
    const { id, name } = JSON.parse(plant)
    await plantRepository.save(new Plant(id, name))
})
