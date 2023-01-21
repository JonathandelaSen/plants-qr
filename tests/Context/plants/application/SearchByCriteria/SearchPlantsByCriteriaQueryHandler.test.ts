import { SearchPlantsByCriteriaQuery } from "../../../../../src/Context/Plants/application/SearchByCriteria/SearchPlantsByCriteriaQuery"
import { SearchPlantsByCriteriaQueryHandler } from "../../../../../src/Context/Plants/application/SearchByCriteria/SearchPlantsByCriteriaQueryHandler"
import { PlantsByCriteriaSearcher } from "../../../../../src/Context/Plants/application/SearchByCriteria/PlantsByCriteriaSearcher"
import { PlantMockRepository } from "../../__mocks__/PlantMockRepository"
import "../../../../../src/Context/Shared/LoadEnvVars"
import { Criteria } from "../../../../../src/Context/Shared/domain/criteria/Criteria"
import { Filters } from "../../../../../src/Context/Shared/domain/criteria/Filters"
import { Order } from "../../../../../src/Context/Shared/domain/criteria/Order"
import { PlantMother } from "../../domain/PlantMother"
import { PlantsResponse } from "../../../../../src/Context/Plants/domain/PlantsResponse"

describe("SearchPlantsByCriteriaQueryHandler", () => {
    let repository: PlantMockRepository

    beforeAll(async function () {
        repository = new PlantMockRepository()
    })

    it("should search plants by criteria", async () => {
        const searcher = new PlantsByCriteriaSearcher(repository)
        const query = new SearchPlantsByCriteriaQuery([])
        const handler = new SearchPlantsByCriteriaQueryHandler(searcher)
        const criteria = new Criteria(Filters.none(), Order.none())
        const plants = [PlantMother.random(), PlantMother.random(), PlantMother.random()]
        repository.returnPlants(plants)

        const response = await handler.handle(query)

        repository.assertMatchingHaveBeenCalledWith(criteria)
        expect(new PlantsResponse(plants)).toEqual(response)
    })
})
