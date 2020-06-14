export interface ICustomer{
    id?: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
}

export enum SendMethod{
    EMAIL,
    PHONE
}
export interface IFortuneCookie{
    getFortuneSync(): string;
    setSender(customer: ICustomer): string //returns the system assigned id
    getSender(id: string): ICustomer
    sendFortune(customer: ICustomer, method: SendMethod): void
}