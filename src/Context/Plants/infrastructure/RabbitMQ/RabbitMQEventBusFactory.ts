import { RabbitMQConfig } from "./RabbitMQConfigFactory"
import { RabbitMQConnection } from "../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection"
import { RabbitMQQueueFormatter } from "../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQQueueFormatter"
import { RabbitMQEventBus } from "../../../Shared/infrastructure/EventBus/RabbitMQ/RabbitMQEventBus"

export class RabbitMQEventBusFactory {
    static create(
        //failoverPublisher: DomainEventFailoverPublisher,
        connection: RabbitMQConnection,
        queueNameFormatter: RabbitMQQueueFormatter,
        config: RabbitMQConfig
    ): RabbitMQEventBus {
        return new RabbitMQEventBus(
            //failoverPublisher,
            connection,
            config.exchangeSettings.name,
            queueNameFormatter,
            config.maxRetries
        )
    }
}
