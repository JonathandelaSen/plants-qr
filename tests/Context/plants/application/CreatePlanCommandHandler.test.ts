import { CreatePlantCommand } from "../../../../src/Context/Plants/domain/CreatePlantCommand"
import { PlantMother } from "../domain/PlantMother"
import { CreatePlantCommandHandler } from "../../../../src/Context/Plants/application/CreatePlantCommandHandler"
import { PlantCreator } from "../../../../src/Context/Plants/application/PlantCreator"
import { LoadEnvVarsCommand } from "../../../../src/apps/Plants/command/LoadEnvVarsCommand"
import { ConfigureRabbitMQCommand } from "../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import EventBusMock from "../shared/domain/EventBusMock"
import { PlantMockRepository } from "../__mocks__/PlantMockRepository"
import { PlantCreatedDomainEventMother } from "../domain/PlantCreatedDomainEventMother"

describe("CreatePlantCommandHandler", () => {
    let repository: PlantMockRepository
    let eventBus: EventBusMock

    beforeAll(async function () {
        await LoadEnvVarsCommand.run()
        await ConfigureRabbitMQCommand.run()
        repository = new PlantMockRepository()
        eventBus = new EventBusMock()
    })

    it("should create a plant", async () => {
        const plant = PlantMother.random()
        const command = new CreatePlantCommand({ id: plant.id, name: plant.name })
        const creator = new PlantCreator(eventBus, repository)
        const domainEvent = PlantCreatedDomainEventMother.fromPlant(plant)

        const handler = new CreatePlantCommandHandler(creator)
        await handler.handle(command)

        repository.assertSaveHaveBeenCalledWith(plant)
        eventBus.assertLastPublishedEventIs(domainEvent)
    })
})
