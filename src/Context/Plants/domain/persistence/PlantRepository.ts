import { Plant } from "../Plant"
import { Criteria } from "../../../Shared/domain/criteria/Criteria"

export interface PlantRepository {
    save(plant: Plant): Promise<void>
    searchAll(): Promise<Plant[]>
    search(id: string): Promise<Plant>
    matching(criteria: Criteria): Promise<Plant[]>
}
