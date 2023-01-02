import { CommandHandler } from "../../../../../../src/Context/Shared/domain/CommandHandler"
import { DummyCommand } from "./DummyCommand"
import { Command } from "../../../../../../src/Context/Shared/domain/Command"

export class CommandHandlerDummy implements CommandHandler<DummyCommand> {
    handle(command: DummyCommand): Promise<void> {
        return Promise.resolve()
    }

    subscribedTo(): DummyCommand {
        return DummyCommand
    }
}
