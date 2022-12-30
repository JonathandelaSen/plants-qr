import { RabbitMQConnection } from "../../../../../../src/Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection"
import { RabbitMQConnectionConfigurationMother } from "./RabbitMQConnectionConfigurationMother"

export class RabbitMQConnectionMother {
    static async create(): Promise<RabbitMQConnection> {
        const config = RabbitMQConnectionConfigurationMother.create()
        const connection = new RabbitMQConnection(config)
        await connection.connect()
        return connection
    }
}
