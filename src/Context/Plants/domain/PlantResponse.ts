import { Plant } from "./Plant"

export class PlantResponse {
    public readonly id: string
    public readonly name: string

    constructor(plant: Plant) {
        this.id = plant.id
        this.name = plant.name
    }
}
