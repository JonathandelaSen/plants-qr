import { Given } from "cucumber"
import { eventBus } from "./hooks.steps"
import { DomainEventSubscribers } from "../../../../../src/Context/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { DomainEventDeserializer } from "../../../../../src/Context/Shared/infrastructure/EventBus/DomainEventDeserializer"
import Utils from "../../../../../src/Context/Shared/domain/Utils"
import Injector from "../../../../../src/apps/Plants/dependency-injection"

Given("I send an event to the event bus:", async (event: any) => {
    const deserializer = await buildDeserializer()
    const domainEvent = deserializer.deserialize(event)

    await eventBus.publish([domainEvent!])
    await Utils.wait(500)
})

Given("the following event is received:", async (event: any) => {
    const deserializer = await buildDeserializer()
    const domainEvent = deserializer.deserialize(event)!

    await eventBus.publish([domainEvent])
    await Utils.wait(500)
})

async function buildDeserializer() {
    const container = await Injector.run()
    const subscribers = DomainEventSubscribers.from(container)
    return DomainEventDeserializer.configure(subscribers)
}
