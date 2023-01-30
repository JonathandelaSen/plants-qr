import { MongoRepository } from "../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import { PlantMother } from "../domain/PlantMother"
import { PlantsMongoRepository } from "../../../../src/Context/Plants/infrastructure/PlantsMongoRepository"
import Injector from "../../../../src/apps/Plants/dependency-injection"
import "../../../../src/Context/Shared/LoadEnvVars"

describe("PlantsMongoRepository", () => {
    let repository: MongoRepository
    let plantRepository: PlantsMongoRepository

    beforeAll(async function () {
        const container = await Injector.run()
        repository = container.get<MongoRepository>("Shared.domain.MongoRepository")
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

    describe("remove", () => {
        it("should get a plant", async () => {
            const plant = PlantMother.random()
            await plantRepository.save(plant)
            const response = await plantRepository.remove(plant.id)
            const plantFromRepository = await plantRepository.search(plant.id)

            expect(response).toEqual(true)
            expect(plantFromRepository).toEqual(undefined)
        })
    })
})
