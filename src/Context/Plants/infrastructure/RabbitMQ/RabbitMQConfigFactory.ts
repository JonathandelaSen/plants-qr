import { ConnectionSettings } from "../../../Shared/infrastructure/EventBus/RabbitMQ/ConnectionSettings"
import { ExchangeSetting } from "../../../Shared/infrastructure/EventBus/RabbitMQ/ExchangeSetting"

export type RabbitMQConfig = {
    connectionSettings: ConnectionSettings
    exchangeSettings: ExchangeSetting
    maxRetries: number
    retryTtl: number
}

export class RabbitMQConfigFactory {
    static createConfig(): RabbitMQConfig {
        return {
            connectionSettings: {
                username: "guest",
                password: "guest",
                vhost: "/",
                connection: {
                    secure: false,
                    hostname: "localhost",
                    port: 5672
                }
            },
            exchangeSettings: {
                name: "domain_events"
            },
            maxRetries: 3,
            retryTtl: 1000
        }
    }
}
