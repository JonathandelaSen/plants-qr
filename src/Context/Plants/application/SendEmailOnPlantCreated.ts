import { DomainEventSubscriber } from "../../Shared/domain/DomainEventSubscriber"
import { PlantCreatedDomainEvent } from "../domain/PlantCreatedDomainEvent"
import { DomainEventClass } from "../../Shared/domain/DomainEvent"
import { PlantCreatedEmailSender } from "./PlantCreatedEmailSender"

export class SendEmailOnPlantCreated implements DomainEventSubscriber<PlantCreatedDomainEvent> {
    constructor(private sender: PlantCreatedEmailSender) {}

    subscribedTo(): DomainEventClass[] {
        return [PlantCreatedDomainEvent]
    }

    async on(domainEvent: PlantCreatedDomainEvent) {
        console.log("Event fired: PlantCreatedDomainEvent")
        await this.sender.run(domainEvent.aggregateId)
    }
}
