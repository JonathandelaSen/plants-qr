import { QueryHandler } from "../../../Shared/domain/QueryHandler"
import { PlantResponse } from "../../domain/PlantResponse"
import { SearchPlantByIdQuery } from "./SearchPlantByIdQuery"
import { Query } from "../../../Shared/domain/Query"
import { PlantByIdSearcher } from "./PlantByIdSearcher"

export class SearchPlantByIdQueryHandler implements QueryHandler<SearchPlantByIdQuery, PlantResponse> {
    constructor(private searcher: PlantByIdSearcher) {}
    subscribedTo(): Query {
        return SearchPlantByIdQuery
    }
    handle(query: SearchPlantByIdQuery): Promise<PlantResponse> {
        return this.searcher.run(query.id)
    }
}
