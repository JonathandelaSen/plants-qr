import { PlantCreatedDomainEvent } from "../../../../src/Context/Plants/domain/PlantCreatedDomainEvent"
import { Plant } from "../../../../src/Context/Plants/domain/Plant"

export class PlantCreatedDomainEventMother {
    static create({
        aggregateId,
        eventId,
        duration,
        name,
        occurredOn
    }: {
        aggregateId: string
        eventId?: string
        duration: string
        name: string
        occurredOn?: Date
    }): PlantCreatedDomainEvent {
        return new PlantCreatedDomainEvent({
            aggregateId,
            eventId,
            name,
            occurredOn
        })
    }

    static fromPlant(plant: Plant): PlantCreatedDomainEvent {
        return new PlantCreatedDomainEvent({
            aggregateId: plant.id,
            name: plant.name
        })
    }
}
