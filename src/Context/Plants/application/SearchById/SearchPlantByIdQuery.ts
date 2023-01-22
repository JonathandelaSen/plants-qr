import { Query } from "../../../Shared/domain/Query"

export class SearchPlantByIdQuery extends Query {
    constructor(public readonly id: string) {
        super()
    }
}
