import { DomainEventDeserializer } from "../DomainEventDeserializer"
import { DomainEventJsonSerializer } from "../DomainEventJsonSerializer"
import { DomainEventSubscribers } from "../DomainEventSubscribers"
import { RabbitMQConnection } from "./RabbitMqConnection"
import { RabbitMQConsumerFactory } from "./RabbitMQConsumerFactory"
import { RabbitMQQueueFormatter } from "./RabbitMQQueueFormatter"
import { EventBus } from "../../../domain/EventBus"
import { DomainEvent } from "../../../domain/DomainEvent"

export class RabbitMQEventBus implements EventBus {
    //private failoverPublisher: DomainEventFailoverPublisher
    private connection: RabbitMQConnection
    private exchange: string
    private queueNameFormatter: RabbitMQQueueFormatter
    private maxRetries: Number

    constructor(
        //failoverPublisher: DomainEventFailoverPublisher;
        connection: RabbitMQConnection,
        exchange: string,
        queueNameFormatter: RabbitMQQueueFormatter,
        maxRetries: Number
    ) {
        //const { failoverPublisher, connection, exchange } = params;
        this.connection = connection
        this.exchange = exchange
        this.queueNameFormatter = queueNameFormatter
        this.maxRetries = maxRetries
    }

    async addSubscribers(subscribers: DomainEventSubscribers): Promise<void> {
        const deserializer = DomainEventDeserializer.configure(subscribers)
        const consumerFactory = new RabbitMQConsumerFactory(deserializer, this.connection, this.maxRetries)

        for (const subscriber of subscribers.items) {
            const queueName = this.queueNameFormatter.format(subscriber)
            const rabbitMQConsumer = consumerFactory.build(subscriber, this.exchange, queueName)

            await this.connection.consume(queueName, rabbitMQConsumer.onMessage.bind(rabbitMQConsumer))
        }
    }

    async publish(events: Array<DomainEvent>): Promise<void> {
        console.log("RabbitMQEventBus publish")
        for (const event of events) {
            console.log("RabbitMQEventBus publish", event.eventName, event.eventId)
            try {
                const routingKey = event.eventName
                const content = this.toBuffer(event)
                const options = this.options(event)
                await this.connection.publish({ exchange: this.exchange, routingKey, content, options })
            } catch (error: any) {
                console.log("RabbitMQEventBus publish error", error)
                //await this.failoverPublisher.publish(event)
            }
        }
    }

    private options(event: DomainEvent) {
        return {
            messageId: event.eventId,
            contentType: "application/json",
            contentEncoding: "utf-8"
        }
    }

    private toBuffer(event: DomainEvent): Buffer {
        const eventPrimitives = DomainEventJsonSerializer.serialize(event)

        return Buffer.from(eventPrimitives)
    }
}
