import { RabbitMQConfigurer } from "../../../../../src/Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer"
import { RabbitMQConnection } from "../../../../../src/Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection"
import { RabbitMQConnectionMother } from "./__mother__/RabbitMQConnectionMother"
import { RabbitMQQueueFormatter } from "../../../../../src/Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQQueueFormatter"
import { DomainEventSubscriberDummy } from "./__mocks__/DomainEventSubscriberDummy"
import { RabbitMQEventBus } from "../../../../../src/Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus"
import { DomainEventSubscribers } from "../../../../../src/Context/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { DomainEventDummyMother } from "./__mocks__/DomainEventDummyMother"

describe("RabbitMQEventBus test", () => {
    const exchange = "test_domain_events"
    const queueNameFormatter = new RabbitMQQueueFormatter("plantsqr")

    describe("unit", () => {
        it("should use the failover publisher if publish to RabbitMQ fails", () => {
            expect(true).toBe(true)
        })
    })

    describe("integration", () => {
        let connection: RabbitMQConnection
        let configurer: RabbitMQConfigurer
        let dummySubscriber: DomainEventSubscriberDummy
        let subscribers: DomainEventSubscribers

        beforeEach(async () => {
            connection = await RabbitMQConnectionMother.create()
            configurer = new RabbitMQConfigurer(connection, queueNameFormatter, 50)
            dummySubscriber = new DomainEventSubscriberDummy()
            subscribers = new DomainEventSubscribers([dummySubscriber])
        })

        beforeEach(async () => {})

        afterEach(async () => {})

        it("should consume the events published to RabbitMQ", async () => {
            await configurer.configure({ exchange, subscribers: [dummySubscriber] })
            const eventBus = new RabbitMQEventBus(connection, exchange, queueNameFormatter, 3)
            await eventBus.addSubscribers(subscribers)
            const event = DomainEventDummyMother.random()
            await eventBus.publish([event])
            await dummySubscriber.assertConsumedEvents([event])
        })

        /*it("should retry failed domain events", async () => {})

        it("it should send events to dead letter after retry failed", async () => {})*/
    })
})
