import { Plant } from "./Plant"
import { PlantResponse } from "./PlantResponse"

export class PlantsResponse {
    public readonly plants: Array<PlantResponse>

    constructor(plants: Array<Plant>) {
        this.plants = plants.map(plant => plant.toPrimitives())
    }
}
