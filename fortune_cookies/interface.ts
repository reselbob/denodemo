import { Nullable } from './nullable.ts';
export interface ICustomer{
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export enum SendStatus{
    OK
}

export enum SendMethod{
    EMAIL,
    PHONE
}

export interface ISenderSearchOptions{
    email?: string;
    phone?: string;
}
export interface IFortuneCookie{
    getFortuneSync(): string;
    setSender(customer: ICustomer): Promise<string>; //returns the system assigned id
    getSender(id: string): Promise<ICustomer>;
    searchSenders(options: ISenderSearchOptions): Promise<Nullable<ICustomer>>;
    sendFortune(customer: ICustomer): Promise<SendStatus>;
}