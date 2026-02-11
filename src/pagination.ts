import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function paginateWithSizeAndFrom (indexName: string, field: string, value: string, from: number, size: number) {
    const result = await EsClient.search({
        index: indexName,
        query: {
            match: {
                [field]: value
            }
        },
        from: from,
        size: size
    });

    console.log('Search resuls: ');
    console.log(result.hits.hits);
    
    return result;
}

export async function paginateWithSearchAfter (indexName: string, field: string, value: string, searchAfter: number, size: number) {
    const result = await EsClient.search({
        index: indexName,
        query: {
            match: {
                [field]: value
            }
        },
        sort: [
            { age: 'asc' }
        ],
        search_after: [searchAfter],
        size: size
    });

    console.log('Search results with search_after: ');
    console.log(result.hits.hits);
    
    return result;
}