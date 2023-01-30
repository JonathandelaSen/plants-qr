import { AggregateRoot } from "../../Shared/domain/AggregateRoot"
import { PlantCreatedDomainEvent } from "./PlantCreatedDomainEvent"

export class Plant extends AggregateRoot {
    readonly id: string
    name: string

    constructor(id: string, name: string) {
        super()
        this.id = id
        this.name = name
    }

    static create(id: string, name: string): Plant {
        const plant = new Plant(id, name)
        plant.record(new PlantCreatedDomainEvent({ aggregateId: id, name: name }))
        return plant
    }

    static fromPrimitives(plainData: { id: string; name: string }): Plant {
        return new Plant(plainData.id, plainData.name)
    }
    toPrimitives(): any {
        return {
            _id: this.id,
            name: this.name
        }
    }
}
