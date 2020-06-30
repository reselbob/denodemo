import {PubberSubberBase} from "./pubbersubber.ts";
import {IPublisher} from "../interfaces/publisher.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export abstract class PublisherBase extends PubberSubberBase implements IPublisher {
    abstract async publish(): Promise<PubberSubberStatus>;
}