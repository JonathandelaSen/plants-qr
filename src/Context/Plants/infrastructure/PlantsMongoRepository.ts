import { PlantRepository } from "../domain/persistence/PlantRepository"
import { MongoRepository } from "../../Shared/infrastructure/Mongo/MongoRepository"
import { Plant } from "../domain/Plant"
import { Criteria } from "../../Shared/domain/criteria/Criteria"

export class PlantsMongoRepository implements PlantRepository {
    private static COLLECTION = "plants"

    constructor(private mongoRepository: MongoRepository) {}

    /*async get(id: string): Promise<Plant | undefined> {
        const response = await this.mongoRepository.findById(PlantsMongoRepository.COLLECTION, id)
        if (!response) return undefined
        return this.toDomainModel(response)
    }*/

    async save(plant: Plant): Promise<void> {
        await this.mongoRepository.save(PlantsMongoRepository.COLLECTION, plant.toPrimitives())
    }

    public async search(id: string): Promise<Plant | undefined> {
        /*const collection = await this.collection()
        const document = await collection.findOne<CourseDocument>({ _id: id.value })

        return document ? Course.fromPrimitives({ name: document.name, duration: document.duration, id: id.value }) : undefined*/
        return undefined
    }

    searchAll(): Promise<Array<Plant>> {
        return Promise.resolve(undefined)
    }

    async matching(criteria: Criteria): Promise<Plant[]> {
        const documents = await this.mongoRepository.searchByCriteria(PlantsMongoRepository.COLLECTION, criteria)
        return documents.map(document => Plant.fromPrimitives({ name: document.name, id: document._id.toString() }))
    }
}
