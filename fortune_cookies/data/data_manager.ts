import { Nullable} from '../nullable.ts';
import { ICustomer, ISenderSearchOptions } from './../interface.ts';
import {readFileStrSync} from "https://deno.land/std/fs/read_file_str.ts";
import {readJson} from "https://deno.land/std/fs/read_json.ts";
import {writeJson} from "https://deno.land/std/fs/write_json.ts";
import {EOL} from "https://deno.land/std/fs/eol.ts";
import {ensureFile} from "https://deno.land/std/fs/ensure_file.ts";
import {v4} from "https://deno.land/std/uuid/mod.ts";

const customerFileName = "customer.json";
const fortunesFileName = "fortunes.txt";
const dataDir = Deno.env.get("DATA_DIR")
const customerFileSpec =  dataDir + customerFileName;

//customer data file
async function getCustomerData(): Promise<Array<ICustomer>>{
    await ensureFile(customerFileSpec);
    let arr = new Array<ICustomer>();
    try{
        arr  = await readJson(customerFileSpec) as Array<ICustomer>;
    }
    catch(err){
        console.error(err);
    }
    return arr;
}
const customerData: Array<ICustomer> = await getCustomerData();

export class DataManager{
    private getAllFortunesSync(searchTerm?: string): Array<string>{
        const data = readFileStrSync(dataDir + fortunesFileName, { encoding: "utf8" }) as string
        const result =  data.split(EOL.LF) as Array<string>
        if(searchTerm){
            //TODO some processing
            throw new Error('Search is Not Implemented');
        }
        return result;
    }

    public static getFortuneSync(): string{
        const fortunes = new DataManager().getAllFortunesSync();
        const max = fortunes.length;
        const min = 0;
        const idx =  Math.floor(Math.random()*(max-min+1)+min);
        return fortunes[idx];
    }

    public static getFortunesSync(searchTerm?: string): Array<string> {
            return new DataManager().getAllFortunesSync(searchTerm)
    }

    public static async getCustomer(id:string) : Promise<ICustomer> {
        return customerData.find(c => c.id === id) as ICustomer
    }

    public static async searchCustomer(options:ISenderSearchOptions) : Promise<Nullable<ICustomer>> {
        let c: ICustomer;
        if(!options.email && !options.phone){
            throw new Error('No phone or email defined');
        }
        if(options.email){
            c =  customerData.find(c => c.email === options.email) as ICustomer
        }else{
            c =  customerData.find(c => c.phone === options.phone) as ICustomer
        }
        return c;
    }
    public static async setCustomer(customer:ICustomer) : Promise<string>{
        customer.id = v4.generate();
        customerData.push(customer);
        await writeJson(customerFileSpec, customerData, { spaces: 2 });
        return customer.id;
    }
}