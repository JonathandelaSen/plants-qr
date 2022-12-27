import { QueryHandler } from "../../../Shared/domain/QueryHandler"
import { Query } from "../../../Shared/domain/Query"
import { SearchPlantsByCriteriaQuery } from "./SearchPlantsByCriteriaQuery"
import { PlantsResponse } from "../../domain/PlantsResponse"
import { PlantsByCriteriaSearcher } from "./PlantsByCriteriaSearcher"
import { Filters } from "../../../Shared/domain/criteria/Filters"
import { Order } from "../../../Shared/domain/criteria/Order"

export class SearchPlantsByCriteriaQueryHandler implements QueryHandler<SearchPlantsByCriteriaQuery, PlantsResponse> {
    constructor(private searcher: PlantsByCriteriaSearcher) {}

    subscribedTo(): Query {
        return SearchPlantsByCriteriaQuery
    }

    handle(query: SearchPlantsByCriteriaQuery): Promise<PlantsResponse> {
        const filters = Filters.fromValues(query.filters)
        const order = Order.fromValues(query.orderBy, query.orderType)

        return this.searcher.run(filters, order, query.offset, query.limit)
    }
}
