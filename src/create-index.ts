import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

const userMapping: estypes.MappingTypeMapping = {
    properties: {
        name: { type: 'text' },
        age: { type: 'integer' },
        occupation: { type: 'text' },
        description: { type: 'text' },
        created_at: { type: 'date' }
    }
}

const dataTypesMappings: estypes.MappingTypeMapping = {
    properties: {
        image: { type: 'binary' },
        isActive: { type: 'boolean' },
        score: { type: 'float' },
        age: { type: 'integer' },
        salary: { type: 'double' },
        ageInSeconds: { type: 'long' },
        created_at: { type: 'date' },
        category: { type: 'keyword' },
        contact: {
            properties: {
                email: { type: 'text' },
                phone: { type: 'text' }
            }
        },
        preferences: { type: 'flattened' },
        orders: { type: 'nested' },
        content: { type: 'text' },
        suggest: { type: 'completion' },
        title: { type: 'search_as_you_type' },
    }
}
export async function createIndex(name: string) {
    const index = await EsClient.indices.create({
        index: name,
        mappings: userMapping
    });

    console.log("Index created: ");
    console.log(index);
    // return index;
}