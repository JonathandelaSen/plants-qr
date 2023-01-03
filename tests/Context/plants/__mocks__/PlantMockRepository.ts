import { PlantRepository } from "../../../../src/Context/Plants/domain/persistence/PlantRepository"
import { Plant } from "../../../../src/Context/Plants/domain/Plant"
import { Criteria } from "../../../../src/Context/Shared/domain/criteria/Criteria"

export class PlantMockRepository implements PlantRepository {
    private saveMock: jest.Mock
    private searchAllMock: jest.Mock
    private plants: Array<Plant> = []

    constructor() {
        this.saveMock = jest.fn()
        this.searchAllMock = jest.fn()
    }
    matching(criteria: Criteria): Promise<Plant[]> {
        return Promise.resolve([])
    }

    async save(plant: Plant): Promise<void> {
        this.saveMock(plant)
    }

    async searchAll(): Promise<Plant[]> {
        this.searchAllMock()
        return this.plants
    }

    assertSaveHaveBeenCalledWith(expected: Plant): void {
        expect(this.saveMock).toHaveBeenCalledWith(expected)
    }
}
