import { PlantsResponse } from "../../domain/PlantsResponse"
import { Filters } from "../../../Shared/domain/criteria/Filters"
import { Order } from "../../../Shared/domain/criteria/Order"
import { Criteria } from "../../../Shared/domain/criteria/Criteria"
import { Plant } from "../../domain/Plant"

export class PlantsByCriteriaSearcher {
    //constructor(private repository: BackofficeCourseRepository) {}

    async run(filters: Filters, order: Order, limit?: number, offset?: number): Promise<PlantsResponse> {
        const criteria = new Criteria(filters, order, limit, offset)

        //const courses = await this.repository.matching(criteria)

        return new PlantsResponse([new Plant("500a722f-4e31-43cc-8e90-a99106638617", "Plant 1")])
    }
}
