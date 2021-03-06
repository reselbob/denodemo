export class Utils {
    static validateCommonPropertiesSync(source: any): void {
        if (!source.source) throw new Error('No source defined');
        source.port = source.port || 5672;
        source.host = source.host || 'localhost';
        source.password = source.password || 'guest';
        source.userName = source.userName || 'guest';
    }
}