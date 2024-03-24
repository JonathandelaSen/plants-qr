import { Request, Response } from "express"
import httpStatus from "http-status"
import { Controller } from "./Controller"
import { QueryBus } from "../../../Context/Shared/domain/QueryBus"
import { SearchPlantsByCriteriaQuery } from "../../../Context/Plants/application/SearchByCriteria/SearchPlantsByCriteriaQuery"
import { PlantsResponse } from "../../../Context/Plants/domain/PlantsResponse"

type FilterType = { value: string; operator: string; field: string }

export class PlantsGetController implements Controller {
    constructor(private readonly queryBus: QueryBus) {}

    async run(_req: Request, res: Response) {
        console.log("PlantsGetController run new log")
        const { query: queryParams } = _req
        const { filters, orderBy, order, limit, offset } = queryParams

        const query = new SearchPlantsByCriteriaQuery(
            this.parseFilters(filters as Array<FilterType>),
            orderBy as string,
            order as string,
            limit ? Number(limit) : undefined,
            offset ? Number(offset) : undefined
        )

        const response = await this.queryBus.ask<PlantsResponse>(query)
        res.status(httpStatus.OK).send(response.plants)
    }

    private parseFilters(params: Array<FilterType>): Array<Map<string, string>> {
        if (!params) {
            return new Array<Map<string, string>>()
        }

        return params.map(filter => {
            const field = filter.field
            const value = filter.value
            const operator = filter.operator

            return new Map([
                ["field", field],
                ["operator", operator],
                ["value", value]
            ])
        })
    }
}
