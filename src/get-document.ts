import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function getDocument(indexName: string, documentId: string): Promise<estypes.GetResponse> {
    const response = await EsClient.get({
        index: indexName,
        id: documentId
    })
    console.log("Document retrieved: ");
    console.log(response);

    return response;
}