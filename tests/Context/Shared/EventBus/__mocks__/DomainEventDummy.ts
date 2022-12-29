import { DomainEvent } from "../../../../../src/Context/Shared/domain/DomainEvent"

export class DomainEventDummy extends DomainEvent {
    static readonly EVENT_NAME = "dummy"

    constructor(data: { aggregateId: string; eventId?: string; occurredOn?: Date }) {
        const { aggregateId, eventId, occurredOn } = data
        super({ eventName: DomainEventDummy.EVENT_NAME, aggregateId, eventId, occurredOn })
    }
    toPrimitives(): {} {
        return {}
    }

    static fromPrimitives(params: { aggregateId: string; attributes: {}; eventId: string; occurredOn: Date }): DomainEventDummy {
        const { aggregateId, eventId, occurredOn } = params
        return new DomainEventDummy({
            aggregateId,
            eventId,
            occurredOn
        })
    }
}
