import EsClient from "./conn.js";

export async function deleteDocument(indexName: string, documentId: string) {
    const response = await EsClient.delete({
        index: indexName,
        id: documentId
    });

    console.log("Document deleted: ");
    console.log(response);

    //return response;
}