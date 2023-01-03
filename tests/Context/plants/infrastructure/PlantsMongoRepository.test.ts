import container from "../../../../src/apps/Plants/dependency-injection"
import { MongoRepository } from "../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import Utils from "../../../../src/Context/Shared/domain/Utils"
import { LoadEnvVarsCommand } from "../../../../src/apps/Plants/command/LoadEnvVarsCommand"
import { PlantMother } from "../domain/PlantMother"
import { PlantsMongoRepository } from "../../../../src/Context/Plants/infrastructure/PlantsMongoRepository"

describe("PlantsMongoRepository", () => {
    let repository: MongoRepository
    let plantRepository: PlantsMongoRepository

    beforeAll(async function () {
        await LoadEnvVarsCommand.run()
        await Utils.wait(200) //for injecting dependencies
        repository = container.get<MongoRepository>("Shared.domain.MongoRepository")
        await Utils.wait(500) //for mongo to connect. Ugly
        await repository.cleanDatabase()
        plantRepository = container.get<PlantsMongoRepository>("Plants.PlantRepository")
    })

    describe("save", () => {
        it("should save a plant", async () => {
            await plantRepository.save(PlantMother.random())
            const plants = await plantRepository.searchAll()
            expect(plants.length).toBe(1)
        })
    })

    describe("get", () => {
        it("should get a plant", async () => {
            const plant = PlantMother.random()
            await plantRepository.save(plant)
            const plantFromRepository = await plantRepository.search(plant.id)
            expect(plant).toEqual(plantFromRepository)
        })
    })
})
