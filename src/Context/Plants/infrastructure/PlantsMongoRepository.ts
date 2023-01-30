import { PlantRepository } from "../domain/persistence/PlantRepository"
import { MongoRepository } from "../../Shared/infrastructure/Mongo/MongoRepository"
import { Plant } from "../domain/Plant"
import { Criteria } from "../../Shared/domain/criteria/Criteria"
import { Filters } from "../../Shared/domain/criteria/Filters"
import { Order } from "../../Shared/domain/criteria/Order"
import { from as fromUuidV4Mongo } from "uuid-mongodb"

export class PlantsMongoRepository implements PlantRepository {
    private static COLLECTION = "plants"

    constructor(private mongoRepository: MongoRepository) {}

    /*async get(id: string): Promise<Plant | undefined> {
        const response = await this.mongoRepository.findById(PlantsMongoRepository.COLLECTION, id)
        if (!response) return undefined
        return this.toDomainModel(response)
    }*/

    async save(plant: Plant): Promise<boolean> {
        return await this.mongoRepository.save(PlantsMongoRepository.COLLECTION, plant.toPrimitives())
    }

    public async search(id: string): Promise<Plant | undefined> {
        const document = await this.mongoRepository.findOneBy(PlantsMongoRepository.COLLECTION, { _id: fromUuidV4Mongo(id) })
        return document ? Plant.fromPrimitives({ id: document._id.toString(), name: document.name }) : undefined
    }

    async searchAll(): Promise<Plant[]> {
        const docs = await this.mongoRepository.searchByCriteria(PlantsMongoRepository.COLLECTION, new Criteria(Filters.none(), Order.none()))
        return docs.map(document => Plant.fromPrimitives({ name: document.name, id: document._id.toString() }))
    }

    async matching(criteria: Criteria): Promise<Plant[]> {
        const documents = await this.mongoRepository.searchByCriteria(PlantsMongoRepository.COLLECTION, criteria)
        return documents.map(document => Plant.fromPrimitives({ name: document.name, id: document._id.toString() }))
    }

    async remove(id: string): Promise<boolean> {
        return await this.mongoRepository.deleteOne(PlantsMongoRepository.COLLECTION, id)
    }
}
