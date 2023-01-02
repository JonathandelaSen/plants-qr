import container from "../../../../src/apps/Plants/dependency-injection"
import { MongoRepository } from "../../../../src/Context/Shared/infrastructure/Mongo/MongoRepository"
import Utils from "../../../../src/Context/Shared/domain/Utils"
import { ConfigureRabbitMQCommand } from "../../../../src/apps/Plants/command/ConfigureRabbitMQCommand"
import { LoadEnvVarsCommand } from "../../../../src/apps/Plants/command/LoadEnvVarsCommand"

describe("PlantsMongoRepository", () => {
    let repository: MongoRepository

    beforeAll(async function () {
        await LoadEnvVarsCommand.run()
        await ConfigureRabbitMQCommand.run()
        repository = container.get<MongoRepository>("Shared.domain.MongoRepository")
        await Utils.wait(500) //for mongo to connect. Ugly
        await repository.cleanDatabase()
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!PlantsMongoRepository beforeAll")
    })

    describe("save", () => {
        it("should save a course", async () => {
            console.log("--save")
        })
        it("should save2 a course", async () => {
            console.log("--save 2")
        })
    })

    describe("get", () => {
        it("should get a course", async () => {
            console.log("--get")
        })
        it("should get2 a course", async () => {
            console.log("--get 2")
        })
    })
})
