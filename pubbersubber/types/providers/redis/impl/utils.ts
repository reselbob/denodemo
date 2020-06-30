import {  RedisConnectOptions, } from "https://denopkg.com/keroxp/deno-redis/mod.ts";


export class Utils {
    static validateCommonPropertiesSync(source: any): void {
        if (!source.source) throw new Error('No source defined');
        source.port = source.port || 6379;
        source.host = source.host || '127.0.0.1';
        source.password = source.password || '';
        source.userName = source.userName || '';
    }

    static getRediConfig(source: any): RedisConnectOptions {
        let obj = null;
        const str = source.host as string;
        if (source.password.length > 0) {
            obj = {

                hostname: str,
                port: source.port,
                password: source.password as string
            };
        } else {
            obj = {
                hostname: str, //source.host as string,
                port: source.port,
            };
        }
        return obj as RedisConnectOptions;

    }
}