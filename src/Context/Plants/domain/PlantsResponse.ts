import { Plant } from "./Plant"

interface PlantResponse {
    id: string
    name: string
}

export class PlantsResponse {
    public readonly plants: Array<PlantResponse>

    constructor(plants: Array<Plant>) {
        this.plants = plants.map(plant => plant.toPrimitives())
    }
}
