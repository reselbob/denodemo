import {PubberSubberBase} from "./pubbersubber.ts";
import {IPublisher} from "../interfaces/publisher.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export abstract class PublisherBase extends PubberSubberBase implements IPublisher {
    async abstract publish(): Promise<PubberSubberStatus>;
}