import { pipeline } from '@huggingface/transformers';
import EsClient from './conn.js';
import { type estypes } from '@elastic/elasticsearch'

export async function getEmbeddings(text: string) {
    const embedder = await pipeline(
        "feature-extraction",
        "sentence-transformers/all-MiniLM-L6-v2", {
            dtype: 'fp32'
        }
    );

    const embeddings = await embedder(text, {pooling: "mean", normalize: true});

    return embeddings.data;
}

export async function createEmbeddingsIndex(name: string) {
    await EsClient.indices.create({
        index: name,
        mappings: {
            properties: {
                embedding: {
                    type: 'dense_vector',
                    dims: 384,
                    index: true,
                    similarity: 'cosine'
                }
            }
        }
    })
}

export async function searchIndexByEmbedding(indexName: string, queryEmbedding: number[], topK: number) {
    const result = await EsClient.search({
        index: indexName,
        knn: {
            field: 'embedding',
            query_vector: queryEmbedding,
            num_candidates: 100,
            k: topK
        }
    });

    console.log("Embedding search results: ");
    console.log(result.hits.hits);
    
    return result;
}