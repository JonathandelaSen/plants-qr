import { DummyQuery } from "./__mocks__/DummyQuery"
import { InMemoryQueryBus } from "../../../../../src/Context/Shared/infrastructure/QueryBus/InMemoryQueryBus"
import { QueryHandlers } from "../../../../../src/Context/Shared/infrastructure/QueryBus/QueryHandlers"
import { QueryNotRegisteredError } from "../../../../../src/Context/Shared/domain/QueryNotRegisteredError"
import { DummyQueryHandler } from "./__mocks__/DummyQueryHandler"

describe("InMemoryQueryBus", () => {
    it("should return an error if dispatches a query without a handler", async () => {
        const query = new DummyQuery()
        const handlers = new QueryHandlers([])
        const bus = new InMemoryQueryBus(handlers)
        await expect(bus.ask(query)).rejects.toBeInstanceOf(QueryNotRegisteredError)
    })

    it("accepts a query with handler", async () => {
        const query = new DummyQuery()
        const handler = new DummyQueryHandler()
        const handlers = new QueryHandlers([handler])
        const bus = new InMemoryQueryBus(handlers)
        await bus.ask(query)
    })
})
