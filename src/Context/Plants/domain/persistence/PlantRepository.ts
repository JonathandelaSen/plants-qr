import { Plant } from "../Plant"
import { Criteria } from "../../../Shared/domain/criteria/Criteria"

export interface PlantRepository {
    save(plant: Plant): Promise<boolean>
    searchAll(): Promise<Plant[]>
    search(id: string): Promise<Plant>
    remove(id: string): Promise<boolean>
    matching(criteria: Criteria): Promise<Plant[]>
}
