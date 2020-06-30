import {IPubberSubber} from "./pubbersubber.ts";
import {PubberSubberStatus} from "../enums/pubbersubbser_status.ts";

export interface IPublisher extends IPubberSubber {
    publish(message: string): Promise<PubberSubberStatus>;
}