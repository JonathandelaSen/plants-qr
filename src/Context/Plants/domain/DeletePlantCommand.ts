import { Command } from "../../Shared/domain/Command"

export class DeletePlantCommand implements Command {
    constructor(public readonly id: string) {}
}
