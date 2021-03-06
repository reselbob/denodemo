import {IPubberSubber} from "./pubbersubber.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export interface ISubscriber extends IPubberSubber {
    subscribe(handler: Function): Promise<PubberSubberStatus>;
}