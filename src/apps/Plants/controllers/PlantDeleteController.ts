import { Request, Response } from "express"
import { Controller } from "./Controller"
import { CommandBus } from "../../../Context/Shared/domain/CommandBus"
import { DeletePlantCommand } from "../../../Context/Plants/domain/DeletePlantCommand"
import httpStatus from "http-status";

export default class PlantDeleteController implements Controller {
    constructor(private commandBus: CommandBus) {}
    async run(req: Request, res: Response): Promise<void> {
        const id = req.params.id
        const command = new DeletePlantCommand(id)
        await this.commandBus.dispatch(command)
        res.status(httpStatus.NO_CONTENT).send({})
    }
}
