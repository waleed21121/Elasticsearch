import EsClient from "./conn.js";

export async function documentExists(indexName: string, documentId: string): Promise<boolean> {
    const exist = await EsClient.exists({
        index: indexName,
        id: documentId
    });

    console.log(`Document exists: ${exist}`);
    return exist;
}

export async function indexExists(indexName: string): Promise<boolean> {
    const exist = await EsClient.indices.exists({
        index: indexName
    });
    console.log(`Index exists: ${exist}`);
    return exist;
}