import EsClient from "./conn.js";

export async function deleteIndex(name: string) {
    const index = await EsClient.indices.delete({
        index: name
    });

    console.log("Index deleted: ");
    console.log(index);
}