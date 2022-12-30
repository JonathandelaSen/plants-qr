import { DomainEventSubscriber } from "../../../../../../src/Context/Shared/domain/DomainEventSubscriber"
import { DomainEventDummy } from "./DomainEventDummy"
import { DomainEvent, DomainEventClass } from "../../../../../../src/Context/Shared/domain/DomainEvent"

export class DomainEventSubscriberDummy implements DomainEventSubscriber<DomainEventDummy> {
    private events: Array<DomainEvent>
    private failsFirstTime = false
    private alwaysFails = false
    private alreadyFailed = false

    static failsFirstTime(): DomainEventSubscriberDummy {
        return new DomainEventSubscriberDummy({ failsFirstTime: true })
    }

    static alwaysFails(): DomainEventSubscriberDummy {
        return new DomainEventSubscriberDummy({ alwaysFails: true })
    }
    constructor(params?: { failsFirstTime?: boolean; alwaysFails?: boolean }) {
        if (params?.failsFirstTime) {
            this.failsFirstTime = true
        }
        if (params?.alwaysFails) {
            this.alwaysFails = true
        }

        this.events = []
    }
    async on(domainEvent: DomainEventDummy): Promise<void> {
        this.events.push(domainEvent)
    }

    subscribedTo(): DomainEventClass[] {
        return [DomainEventDummy]
    }
    async assertConsumedEvents(events: Array<DomainEvent>) {
        return new Promise((resolve: Function, reject: Function) => {
            setTimeout(() => {
                try {
                    expect(this.events.length).toEqual(events.length)
                    expect(this.events).toEqual(events)
                    resolve()
                } catch (error: any) {
                    reject(error)
                }
            }, 400)
        })
    }
}
