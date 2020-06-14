import {v4} from "https://deno.land/std/uuid/mod.ts";

export class TestUtils{
    static getRandomString(length: number): string {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        for (var i = 0; i < length; i++) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
        }
        return result;
    }
    static getUUID():string{
        return v4.generate();
    }
    static getRandomPhone(): string {
        const ri = () =>{
            const max = 9;
            const min = 0;
            return  Math.floor(Math.random()*(max-min+1)+min);
        };
        return `${ri()}${ri()}${ri()}-${ri()}${ri()}${ri()}-${ri()}${ri()}${ri()}${ri()}`;
    }
    
}