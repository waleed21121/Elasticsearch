import EsClient from "./conn.js";

export async function bulkOperation(indexName: string) {
    const result = await EsClient.bulk({
        operations: [
            {
                create: {
                    _index: indexName,
                    _id: '1'
                }
            }, {
                name: "John Doe",
                age: 30,
                occupation: "Software Developer",
                created_at: new Date(),
            },
            {
                update: {
                    _index: indexName,
                    _id: '1'
                }
            }, {
                doc: {
                    age: 31,
                    occupation: "Senior Software Developer"
                }
            }
        ]
    });

    console.log('Bulk operation result: ');
    console.log(result.errors);
}