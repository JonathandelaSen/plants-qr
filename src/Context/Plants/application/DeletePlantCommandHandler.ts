import { CommandHandler } from "../../Shared/domain/CommandHandler"
import { DeletePlantCommand } from "../domain/DeletePlantCommand"
import { Command } from "../../Shared/domain/Command"
import PlantDeleter from "./PlantDeleter"

export default class DeletePlantCommandHandler implements CommandHandler<DeletePlantCommand> {
    constructor(private deleter: PlantDeleter) {}
    async handle(command: DeletePlantCommand): Promise<void> {
        await this.deleter.run(command.id)
    }

    subscribedTo(): Command {
        return DeletePlantCommand
    }
}
