import { DomainEvent } from "../../Shared/domain/DomainEvent"

type PlantCreatedDomainEventAttributes = {
    readonly name: string
}

export class PlantCreatedDomainEvent extends DomainEvent {
    static readonly EVENT_NAME = "plant.created"

    readonly name: string

    constructor({ aggregateId, name, eventId, occurredOn }: { aggregateId: string; eventId?: string; name: string; occurredOn?: Date }) {
        super({ eventName: PlantCreatedDomainEvent.EVENT_NAME, aggregateId, eventId, occurredOn })
        this.name = name
    }

    toPrimitives(): PlantCreatedDomainEventAttributes {
        return {
            name: this.name
        }
    }

    static fromPrimitives(params: {
        aggregateId: string
        attributes: PlantCreatedDomainEventAttributes
        eventId: string
        occurredOn: Date
    }): DomainEvent {
        const { aggregateId, attributes, occurredOn, eventId } = params
        return new PlantCreatedDomainEvent({
            aggregateId,
            name: attributes.name,
            eventId,
            occurredOn
        })
    }
}
