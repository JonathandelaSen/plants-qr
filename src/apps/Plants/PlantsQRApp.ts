import container from "./dependency-injection"
import { Server } from "./server"
import { EventBus } from "../../Context/Shared/domain/EventBus"
import { DomainEventSubscribers } from "../../Context/Shared/infrastructure/EventBus/DomainEventSubscribers"
import { RabbitMQConnection } from "../../Context/Shared/infrastructure/EventBus/RabbitMQ/RabbitMQConnection"

export class PlantsQRApp {
    server?: Server

    async start() {
        await this.delay(2000) //we have to wait till the DI has load every dependency (very ugly to fiix in the future)
        const port = process.env.PORT || "3000"
        this.server = new Server(port)
        await this.configureRabbitMQEventBus()
        return this.server.listen()
    }

    get httpServer() {
        return this.server?.getHTTPServer()
    }

    async stop() {
        return this.server?.stop()
    }

    private async configureEventBus() {
        const eventBus = container.get<EventBus>("Shared.domain.EventBus")
        eventBus.addSubscribers(DomainEventSubscribers.from(container))
    }
    private async configureRabbitMQEventBus() {
        const eventBus = container.get<EventBus>("Shared.domain.EventBus")
        const rabbitMQConnection = container.get<RabbitMQConnection>("Shared.RabbitMQConnection")
        await rabbitMQConnection.connect()

        eventBus.addSubscribers(DomainEventSubscribers.from(container))
    }

    async delay(time) {
        return new Promise(resolve => setTimeout(resolve, time))
    }
}
