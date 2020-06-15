import { DataManager } from './data/data_manager.ts';

import {IFortuneCookie, SendStatus, ICustomer} from './interface.ts';
import {FortuneCookieBase} from './base.ts';
import { Nullable } from './nullable.ts';
export class FortuneCookiePhoneImpl extends FortuneCookieBase implements IFortuneCookie{
    async sendFortune(customer: ICustomer): Promise<SendStatus> {
        // see if the customer exists
        let c: Nullable<ICustomer>;
        if(customer.id && customer.id.length >0){
            c = await this.getSender(customer.id);
        }else{
            //search for the customer
            c = await this.searchSenders({email:customer.email, phone: customer.phone});
        }

        //if not, add the customer
        if(!c){
            const id = await DataManager.setCustomer(customer);
            customer.id = id;
        }

        //get a fortune
        const fortune = this.getFortuneSync();
        //send it
        const obj = {method: 'SMS', fortune, customer, sendDate: new Date()};
        console.log({message: "sending", send: obj})

        return SendStatus.OK;
    }
}