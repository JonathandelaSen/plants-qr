import { Request, Response } from "express"
import { QueryBus } from "../../../Context/Shared/domain/QueryBus"

import { Controller } from "./Controller"
import { SearchPlantByIdQuery } from "../../../Context/Plants/application/SearchById/SearchPlantByIdQuery"
import { PlantResponse } from "../../../Context/Plants/domain/PlantResponse"
import httpStatus from "http-status"

export class PlantGetController implements Controller {
    constructor(private readonly queryBus: QueryBus) {}

    async run(req: Request, res: Response): Promise<void> {
        console.log("PlantGetController run")
        const plantId = req.params.id
        const query = new SearchPlantByIdQuery(plantId)

        const response = await this.queryBus.ask<PlantResponse>(query)
        res.status(httpStatus.OK).send(response)
    }
}
