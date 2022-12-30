import { Given } from "cucumber"
import { eventBus } from "./hooks.steps"
import { DomainEventSubscribers } from "../../../../../src/Context/Shared/infrastructure/EventBus/DomainEventSubscribers"
import container from "../../../../../src/apps/Plants/dependency-injection"
import { DomainEventDeserializer } from "../../../../../src/Context/Shared/infrastructure/EventBus/DomainEventDeserializer"
import Utils from "../../../../../src/Context/Shared/domain/Utils"

const deserializer = buildDeserializer()

Given("I send an event to the event bus:", async (event: any) => {
    const domainEvent = deserializer.deserialize(event)

    await eventBus.publish([domainEvent!])
    await Utils.wait(500)
})

Given("the following event is received:", async (event: any) => {
    const domainEvent = deserializer.deserialize(event)!

    await eventBus.publish([domainEvent])
    await Utils.wait(500)
})

function buildDeserializer() {
    const subscribers = DomainEventSubscribers.from(container)
    return DomainEventDeserializer.configure(subscribers)
}
