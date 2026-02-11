import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function serachAll(indexName: string): Promise<estypes.SearchResponse<unknown, Record<string, estypes.AggregationsAggregate>>> {
    const result = await EsClient.search({
        index: indexName,
        query: {
            match_all: {}
        }
    });

    console.log("Search Results: ");
    console.log(result.hits.hits);

    return result;
}

export async function searchByWord(indexName: string, fieldName: string, word: string): Promise<estypes.SearchResponse<unknown, Record<string, estypes.AggregationsAggregate>>> {
    const result = await EsClient.search({
        index: indexName,
        query: {
            match: {
                [fieldName]: word
            }
        }
    });

    console.log('Search resuls: ');
    console.log(result.hits.hits);
    
    return result;
}

export async function filterOlderSW (indexName: string, age: number): Promise<estypes.SearchResponse<unknown, Record<string, estypes.AggregationsAggregate>>> {
    const result = await EsClient.search({
        index: indexName,
        query: {
            range: {
                age: {
                    lte: age
                }
            }
        }
    });

    console.log('Search resuls: ');
    console.log(result.hits.hits);
    
    return result;
}

export async function multipleFilters (indexName: string, age: number, word: string): Promise<estypes.SearchResponse<unknown, Record<string, estypes.AggregationsAggregate>>> {
    const result = await EsClient.search({
        index: indexName,
        query: {
            bool: {
                must: {
                    match: {
                        description: word
                    }
                }, 
                should: {
                    range: {
                        age: {
                            lte: age
                        }
                    }
                }
            }
        }
    });

    console.log('Search resuls: ');
    console.log(result.hits.hits);
    
    return result;
}

export async function paginate (indexName: string, fieldName: string, word: string, from: number, size: number): Promise<estypes.SearchResponse<unknown, Record<string, estypes.AggregationsAggregate>>> {
    const result = await EsClient.search({
        index: indexName,
        from: from,
        size: size,
        query: {
            match: {
                [fieldName]: word
            }
        }
    })

    console.log('Search resuls: ');
    console.log(result.hits.hits);
    
    return result;
}