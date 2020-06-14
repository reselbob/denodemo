import { DataManager } from './data/data_manager.ts';
import { IFortuneCookie,ICustomer,SendMethod } from './interface.ts';

export abstract class FortuneCookieBase implements IFortuneCookie{
    getFortuneSync(): string {
        return DataManager.getFortuneSync()
    }
    setSender(customer: ICustomer): void {

    }
    getSender(id: string): ICustomer{

    }
    abstract sendFortune(customer: ICustomer, method: SendMethod): void

}