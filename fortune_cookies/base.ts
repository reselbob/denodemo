import { Nullable } from './nullable.ts';
import { DataManager } from './data/data_manager.ts';
import { IFortuneCookie,ICustomer,SendStatus, ISenderSearchOptions } from './interface.ts';

export abstract class FortuneCookieBase implements IFortuneCookie{
    getFortuneSync(): string {
        return DataManager.getFortuneSync()
    }
    async setSender(customer: ICustomer): Promise<string> {
        return await DataManager.setCustomer(customer);
    }
    async getSender(id: string): Promise<ICustomer>{
        return await DataManager.getCustomer(id)
    }

    async searchSenders(options: ISenderSearchOptions): Promise<Nullable<ICustomer>>{
        return await DataManager.searchCustomer(options)
    }
    abstract sendFortune(customer: ICustomer): Promise<SendStatus>

}