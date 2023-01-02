import { PlantRepository } from "../../../../src/Context/Plants/domain/persistence/PlantRepository"
import { Plant } from "../../../../src/Context/Plants/domain/Plant"
import { Criteria } from "../../../../src/Context/Shared/domain/criteria/Criteria"

export class PlantMockRepository implements PlantRepository {
    private plants: Array<Plant> = []

    matching(criteria: Criteria): Promise<Plant[]> {
        return Promise.resolve([])
    }

    save(plant: Plant): Promise<void> {
        return Promise.resolve(undefined)
    }

    searchAll(): Promise<Plant[]> {
        return Promise.resolve([])
    }
}
