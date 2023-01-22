import { Plant } from "../../domain/Plant"
import { PlantRepository } from "../../domain/persistence/PlantRepository"
import { PlantResponse } from "../../domain/PlantResponse"
import PlantNotFoundError from "../../domain/PlantNotFoundError"

export class PlantByIdSearcher {
    constructor(private repository: PlantRepository) {}

    async run(id: string): Promise<PlantResponse> {
        const plant = await this.repository.search(id)
        if (!plant) throw new PlantNotFoundError()
        return new PlantResponse(plant)
    }
}
