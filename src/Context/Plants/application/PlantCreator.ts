import { Plant } from "../domain/Plant"
import { EventBus } from "../../Shared/domain/EventBus"
import { PlantRepository } from "../domain/persistence/PlantRepository"

export class PlantCreator {
    constructor(private eventBus: EventBus, private repository: PlantRepository) {}

    async run(params: { id: string; name: string }): Promise<void> {
        const plant = Plant.create(params.id, params.name)
        await this.repository.save(plant)
        await this.eventBus.publish(plant.pullDomainEvents())
    }
}
