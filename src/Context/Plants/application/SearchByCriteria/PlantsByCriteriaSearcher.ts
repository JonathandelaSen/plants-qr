import { PlantsResponse } from "../../domain/PlantsResponse"
import { Filters } from "../../../Shared/domain/criteria/Filters"
import { Order } from "../../../Shared/domain/criteria/Order"
import { Criteria } from "../../../Shared/domain/criteria/Criteria"
import { Plant } from "../../domain/Plant"
import { PlantRepository } from "../../domain/persistence/PlantRepository"

export class PlantsByCriteriaSearcher {
    constructor(private repository: PlantRepository) {}

    async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<PlantsResponse> {
        const criteria = new Criteria(filters, order, limit, offset)
        const plants = await this.repository.matching(criteria)
        return new PlantsResponse(plants)
    }
}
