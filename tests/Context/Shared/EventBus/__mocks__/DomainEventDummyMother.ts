import { DomainEventDummy } from "./DomainEventDummy"
import { UuidMother } from "../../../domain/UuidMother"

export class DomainEventDummyMother {
    static random() {
        return new DomainEventDummy({
            aggregateId: UuidMother.random(),
            eventId: UuidMother.random(),
            occurredOn: new Date()
        })
    }
}
