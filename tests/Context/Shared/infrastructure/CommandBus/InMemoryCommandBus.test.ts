import { UnhandledCommand } from "./__mocks__/UnhandledCommand"
import { InMemoryCommandBus } from "../../../../../src/Context/Shared/infrastructure/CommandBus/InMemoryCommandBus"
import { CommandHandlers } from "../../../../../src/Context/Shared/infrastructure/CommandBus/CommandHandlers"
import { CommandNotRegisteredError } from "../../../../../src/Context/Shared/domain/CommandNotRegisteredError"
import { DummyCommand } from "./__mocks__/DummyCommand"
import { CommandHandlerDummy } from "./__mocks__/CommandHandlerDummy"

describe("InMemoryCommandBus", () => {
    it("should throw an error if dispatches a command without handler", async () => {
        const unhandledCommand = new UnhandledCommand()
        const commandHandlers = new CommandHandlers([])
        const bus = new InMemoryCommandBus(commandHandlers)
        await expect(bus.dispatch(unhandledCommand)).rejects.toBeInstanceOf(CommandNotRegisteredError)
    })

    it("accept a command with a handler", async () => {
        const command = new DummyCommand()
        const handler = new CommandHandlerDummy()
        const handlers = new CommandHandlers([handler])
        const bus = new InMemoryCommandBus(handlers)
        await bus.dispatch(command)
    })
})
