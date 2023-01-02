import { Plant } from "../../../../src/Context/Plants/domain/Plant"
import { UuidMother } from "../../Shared/domain/UuidMother"
import { WordMother } from "../../Shared/domain/WordMother"

export class PlantMother {
    static create(id: string, name: string): Plant {
        return new Plant(id, name)
    }

    static random(): Plant {
        return this.create(UuidMother.random(), WordMother.random())
    }
}
