import { MongoClient, ObjectId, WithId, Document } from "mongodb"
import { MongoConnector } from "./MongoConnector"
import { from as fromUuidV4Mongo } from "uuid-mongodb"
import { Criteria } from "../../domain/criteria/Criteria"
import { MongoCriteriaConverter } from "./MongoCriteriaConverter"

export class MongoRepository {
    private criteriaConverter: MongoCriteriaConverter

    constructor(public client: MongoConnector) {
        this.criteriaConverter = new MongoCriteriaConverter()
    }

    async findById(collectionName: string, id: string, extraProjections?: { [key: string]: any }): Promise<WithId<Document> | null> {
        return (await this.client.getClient())
            .db()
            .collection(collectionName)
            .findOne({ _id: fromUuidV4Mongo(id) })
    }

    async save(collectionName: string, item: { [key: string]: any }) {
        console.log("----save")
        console.log(item)
        if (item._id) {
            item._id = fromUuidV4Mongo(item._id)
        }
        console.log("3 item._id", item._id)
        console.log("item.asd", item.asd)
        console.log(typeof item._id)
        return (await (await this.client.getClient()).db().collection(collectionName).insertOne(item)).insertedId
    }

    async searchByCriteria(collectionName: string, criteria: Criteria): Promise<WithId<Document>[]> {
        const query = this.criteriaConverter.convert(criteria)
        return (await this.client.getClient())
            .db()
            .collection(collectionName)
            .find(query.filter)
            .sort(query.sort)
            .skip(query.skip)
            .limit(query.limit)
            .toArray()
    }
    async findOneBy(
        collectionName: string,
        query: { [key: string]: any },
        extraProjections?: { [key: string]: any }
    ): Promise<WithId<Document> | null> {
        return (await this.client.getClient()).db().collection(collectionName).findOne(query)
    }
    /*

    async find(limit: number, skip: number, extraProjections?: { [key: string]: any }): Promise<WithId<Document>[]> {
        let results = (await this.client.getClient()).db().collection(this.collectionName).find()
        if (limit) results = results.limit(limit)
        if (skip) results = results.skip(skip)
        return await results.toArray()
    }

    async save(item: { [key: string]: any }) {
        return (await (await this.client.getClient()).db().collection(this.collectionName).insertOne(item)).insertedId
    }

    async updateOne(filter: { [key: string]: any }, update: { [key: string]: any }): Promise<number> {
        return (await (await this.client.getClient()).db().collection(this.collectionName).updateOne(filter, update)).modifiedCount
    }

    async remove(filter: { [key: string]: any }): Promise<boolean> {
        return (await (await this.client.getClient()).db().collection(this.collectionName).deleteOne(filter)).deletedCount >= 1
    }*/

    public async cleanDatabase(): Promise<void> {
        const collections = await this.collections()
        const client = await this.client.getClient()

        for (const collection of collections) {
            await client.db().collection(collection).deleteMany({})
        }
    }
    public async close(): Promise<void> {
        return await this.client.close()
    }

    private async collections(): Promise<string[]> {
        const collections = await (await this.client.getClient()).db().listCollections(undefined, { nameOnly: true }).toArray()
        return collections.map(collection => collection.name)
    }
}
