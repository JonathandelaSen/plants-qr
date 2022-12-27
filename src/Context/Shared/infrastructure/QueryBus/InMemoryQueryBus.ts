import { Query } from "../../domain/Query"
import { Response } from "../../domain/Response"
import { QueryHandlers } from "./QueryHandlers"
import { QueryBus } from "../../domain/QueryBus"

export class InMemoryQueryBus implements QueryBus {
    constructor(private queryHandlersInformation: QueryHandlers) {}

    async ask<R extends Response>(query: Query): Promise<R> {
        const handler = this.queryHandlersInformation.get(query)

        return (await handler.handle(query)) as Promise<R>
    }
}
