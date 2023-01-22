import { PlantRepository } from "../../../../src/Context/Plants/domain/persistence/PlantRepository"
import { Plant } from "../../../../src/Context/Plants/domain/Plant"
import { Criteria } from "../../../../src/Context/Shared/domain/criteria/Criteria"

export class PlantMockRepository implements PlantRepository {
    private saveMock: jest.Mock
    private searchAllMock: jest.Mock
    private matchingMock: jest.Mock
    private plants: Plant[] = []

    constructor() {
        this.saveMock = jest.fn()
        this.searchAllMock = jest.fn()
        this.matchingMock = jest.fn()
    }
    matching(criteria: Criteria): Promise<Plant[]> {
        this.matchingMock(criteria)
        return Promise.resolve(this.plants)
    }

    async save(plant: Plant): Promise<void> {
        this.saveMock(plant)
    }

    async searchAll(): Promise<Plant[]> {
        this.searchAllMock()
        return this.plants
    }

    search(id: string): Promise<Plant> {
        throw new Error("TO BE IMPLEMENTED")
    }

    assertSaveHaveBeenCalledWith(expected: Plant): void {
        expect(this.saveMock).toHaveBeenCalledWith(expected)
    }

    assertMatchingHaveBeenCalledWith(expected: Criteria): void {
        expect(this.matchingMock).toHaveBeenCalledWith(expected)
    }
    returnPlants(plants: Plant[]) {
        this.plants = plants
    }
}
