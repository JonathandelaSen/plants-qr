import { CreatePlantCommand } from "../../../../src/Context/Plants/domain/CreatePlantCommand"
import { PlantMother } from "../domain/PlantMother"
import { CreatePlantCommandHandler } from "../../../../src/Context/Plants/application/CreatePlantCommandHandler"
import { PlantCreator } from "../../../../src/Context/Plants/application/PlantCreator"
import { InMemoryAsyncEventBus } from "../../../../src/Context/Shared/infrastructure/EventBus/InMemory/InMemoryAsyncEventBus"
import { LoadEnvVarsCommand } from "../../../../src/apps/Plants/command/LoadEnvVarsCommand"
import { ConfigureRabbitMQCommand } from "../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import container from "../../../../src/apps/Plants/dependency-injection"
import { MongoRepository } from "../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import Utils from "../../../../src/Context/Shared/domain/Utils"
import { PlantsMongoRepository } from "../../../../src/Context/Plants/infrastructure/PlantsMongoRepository"

describe("CreatePlantCommandHandler", () => {
    let repository: CourseRepositoryMock
    let eventBus: EventBusMock

    beforeAll(async function () {
        await LoadEnvVarsCommand.run()
        await ConfigureRabbitMQCommand.run()
        repository = new CourseRepositoryMock()
        eventBus = new EventBusMock()
    })

    it("should create a plant", async () => {
        const plant = PlantMother.random()
        const command = new CreatePlantCommand({ id: plant.id, name: plant.name })
        const eventBus = new InMemoryAsyncEventBus()
        const creator = new PlantCreator(eventBus, repository)
        const handler = new CreatePlantCommandHandler(creator)
        await handler.handle(command)
    })
})
