import { Plant } from "../domain/Plant"
import { EventBus } from "../../Shared/domain/EventBus"

export class PlantCreator {
    constructor(private eventBus: EventBus) {}

    async run(params: { id: string; name: string }): Promise<void> {
        const plant = Plant.create(params.id, params.id)
        //TODO this.repository.save(plant)
        await this.eventBus.publish(plant.pullDomainEvents())
    }
}
