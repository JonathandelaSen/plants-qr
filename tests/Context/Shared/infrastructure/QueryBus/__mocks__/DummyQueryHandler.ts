import { QueryHandler } from "../../../../../../src/Context/Shared/domain/QueryHandler"
import { DummyQuery } from "./DummyQuery"

export class DummyQueryHandler implements QueryHandler<DummyQuery, {}> {
    handle(query: DummyQuery): Promise<{}> {
        return Promise.resolve(undefined)
    }

    subscribedTo(): DummyQuery {
        return DummyQuery
    }
}
