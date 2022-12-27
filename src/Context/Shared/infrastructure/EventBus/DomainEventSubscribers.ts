import { ContainerBuilder, Definition } from "node-dependency-injection"
import { DomainEvent } from "../../domain/DomainEvent"
import { DomainEventSubscriber } from "../../domain/DomainEventSubscriber"
import { SendEmailOnPlantCreated } from "../../../Plants/application/SendEmailOnPlantCreated"

export class DomainEventSubscribers {
    constructor(public items: Array<DomainEventSubscriber<DomainEvent>>) {}

    static from(container: ContainerBuilder): DomainEventSubscribers {
        const subscriberDefinitions = container.findTaggedServiceIds("domainEventSubscriber")
        const subscribers: Array<DomainEventSubscriber<DomainEvent>> = []

        for (const subscriberDefinition of subscriberDefinitions) {
            const domainEventSubscriber = container.get<DomainEventSubscriber<DomainEvent>>(subscriberDefinition.id)
            subscribers.push(domainEventSubscriber)
        }

        return new DomainEventSubscribers(subscribers)
    }
}
