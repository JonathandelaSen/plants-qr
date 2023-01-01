import { Request, Response } from "express"
import httpStatus from "http-status"
import { Controller } from "./Controller"
import { CommandBus } from "../../../Context/Shared/domain/CommandBus"
import { CreatePlantCommand } from "../../../Context/Plants/domain/CreatePlantCommand"

type CreatePlantRequest = {
    id: string
    name: string
}
export class PlantsPutController implements Controller {
    constructor(private readonly commandBus: CommandBus) {}

    async run(_req: Request<CreatePlantRequest>, res: Response) {
        console.log("PlantsPutController run")

        await this.createPlant(_req)
        res.status(httpStatus.CREATED).send({})
    }

    private async createPlant(req: Request<CreatePlantRequest>) {
        const createCommand = new CreatePlantCommand({
            id: req.body.id,
            name: req.body.name
        })

        await this.commandBus.dispatch(createCommand)
    }
}
