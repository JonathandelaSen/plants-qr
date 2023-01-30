import { CreatePlantCommand } from "../../../../src/Context/Plants/domain/CreatePlantCommand"
import { PlantMother } from "../domain/PlantMother"
import { CreatePlantCommandHandler } from "../../../../src/Context/Plants/application/CreatePlantCommandHandler"
import { PlantCreator } from "../../../../src/Context/Plants/application/PlantCreator"
import "../../../../src/Context/Shared/LoadEnvVars"
import { ConfigureRabbitMQCommand } from "../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import EventBusMock from "../shared/domain/EventBusMock"
import { PlantMockRepository } from "../__mocks__/PlantMockRepository"
import { PlantCreatedDomainEventMother } from "../domain/PlantCreatedDomainEventMother"
import PlantDeleter from "../../../../src/Context/Plants/application/PlantDeleter";
import {DeletePlantCommand} from "../../../../src/Context/Plants/domain/DeletePlantCommand";
import DeletePlantCommandHandler from "../../../../src/Context/Plants/application/DeletePlantCommandHandler";

describe("DeletePlantCommandHandler", () => {
    let repository: PlantMockRepository
    let eventBus: EventBusMock

    beforeAll(async function () {
        await ConfigureRabbitMQCommand.run()
        repository = new PlantMockRepository()
        eventBus = new EventBusMock()
    })

    it("should delete a plant", async () => {
        const plant = PlantMother.random()
        const command = new DeletePlantCommand(plant.id)
        const deleter = new PlantDeleter(repository)

        const handler = new DeletePlantCommandHandler(deleter)
        await handler.handle(command)

        repository.assertRemoveHaveBeenCalledWith()
    })
})
