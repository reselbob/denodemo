import {ISubscriber} from "../interfaces/subscriber.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";
import {PubberSubberBase} from "./pubbersubber.ts";

export abstract class SubscriberBase extends PubberSubberBase implements ISubscriber {
    async abstract subscribe(handler: Function): Promise<PubberSubberStatus>;
}