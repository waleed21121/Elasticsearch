import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function updateDocument (indexName: string, documentId: string, updates: any): Promise<estypes.UpdateResponse> {
    const updatedData = await EsClient.update({
        index: indexName,
        id: documentId,
        doc: {
            ...updates
        }
    });

    console.log('Document updated: ');
    console.log(updatedData);

    return updatedData;
}