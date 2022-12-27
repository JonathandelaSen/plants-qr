import { CommandHandler } from "../../Shared/domain/CommandHandler"
import { CreatePlantCommand } from "../domain/CreatePlantCommand"
import { PlantCreator } from "./PlantCreator"
import { Command } from "../../Shared/domain/Command"

export class CreatePlantCommandHandler implements CommandHandler<CreatePlantCommand> {
    constructor(private creator: PlantCreator) {}

    subscribedTo(): Command {
        return CreatePlantCommand
    }

    async handle(command: CreatePlantCommand): Promise<void> {
        const id = command.id
        const name = command.name
        await this.creator.run({ id, name })
    }
}
