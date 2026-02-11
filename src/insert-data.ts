import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function insertData (indexName: string, data: any): Promise<estypes.WriteResponseBase>{
    const result = await EsClient.index({
        index: indexName,
        document: data
    });

    console.log('Document inserted: ');
    console.log(result);
    
    return result;
}