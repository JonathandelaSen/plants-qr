import { RabbitMQConnection } from "../../../Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection"
import { RabbitMQQueueFormatter } from "../../../Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQQueueFormatter"
import { RabbitMQConfig } from "../../../Context/Plants/infrastructure/RabbitMQ/RabbitMQConfigFactory"
import { RabbitMQConfigurer } from "../../../Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConfigurer"
import { DomainEventSubscribers } from "../../../Context/Shared/infrastructure/EventBus/DomainEventSubscribers"
import Injector from "../dependency-injection"

export class ConfigureRabbitMQCommand {
    static async run() {
        //await ConfigureRabbitMQCommand.delay(2000) //we have to wait till the DI has load every dependency (very ugly to fiix in the future)
        const container = await Injector.run()
        const connection = container.get<RabbitMQConnection>("Shared.RabbitMQConnection")
        const nameFormatter = container.get<RabbitMQQueueFormatter>("Shared.RabbitMQQueueFormatter")
        const { exchangeSettings, retryTtl } = container.get<RabbitMQConfig>("Shared.RabbitMQConfig")

        await connection.connect()

        const configurer = new RabbitMQConfigurer(connection, nameFormatter, retryTtl)
        const subscribers = DomainEventSubscribers.from(container).items

        await configurer.configure({ exchange: exchangeSettings.name, subscribers })
        await connection.close()
    }
    static async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}
