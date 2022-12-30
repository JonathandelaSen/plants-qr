import { AfterAll, BeforeAll } from "cucumber"
import { PlantsQRApp } from "../../../../../src/apps/Plants/PlantsQRApp"
import { EventBus } from "../../../../../src/Context/Shared/domain/EventBus"
import container from "../../../../../src/apps/Plants/dependency-injection"
import { ConfigureRabbitMQCommand } from "../../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import { MongoRepository } from "../../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import Utils from "../../../../../src/Context/Shared/domain/Utils"

let application: PlantsQRApp
let mongoRepository: MongoRepository
let eventBus: EventBus

BeforeAll(async () => {
    await ConfigureRabbitMQCommand.run()

    mongoRepository = container.get<MongoRepository>("Shared.domain.MongoRepository")
    eventBus = container.get<EventBus>("Shared.domain.EventBus")
    await Utils.wait(500) //for mongo to connect. Ugly
    await mongoRepository.cleanDatabase()

    application = new PlantsQRApp()
    await application.start()
})

AfterAll(async () => {
    await mongoRepository.close()

    await application.stop()
})

export { application, eventBus }
