import {v4} from "https://deno.land/std/uuid/mod.ts";

export class TestUtils{
    constructor(){
    }

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
    
}