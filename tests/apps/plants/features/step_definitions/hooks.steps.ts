import { AfterAll, Before, BeforeAll } from "cucumber"
import { PlantsQRApp } from "../../../../../src/apps/Plants/PlantsQRApp"
import { EventBus } from "../../../../../src/Context/Shared/domain/EventBus"
import { ConfigureRabbitMQCommand } from "../../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import { MongoRepository } from "../../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import Utils from "../../../../../src/Context/Shared/domain/Utils"
import Injector from "../../../../../src/apps/Plants/dependency-injection"

let application: PlantsQRApp
let mongoRepository: MongoRepository
let eventBus: EventBus

BeforeAll(async () => {
    const container = await Injector.run()
    //await ConfigureRabbitMQCommand.run()

    mongoRepository = container.get<MongoRepository>("Shared.domain.MongoRepository")
    eventBus = container.get<EventBus>("Shared.domain.EventBus")
    await mongoRepository.cleanDatabase()

    application = new PlantsQRApp()
    await application.start()
})
Before(async () => {
    const container = await Injector.run()
    mongoRepository = container.get<MongoRepository>("Shared.domain.MongoRepository")
    await mongoRepository.cleanDatabase()
})

AfterAll(async () => {
    await mongoRepository.close()

    await application.stop()
})

export { application, eventBus }
