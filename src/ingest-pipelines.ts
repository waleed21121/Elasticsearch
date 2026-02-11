import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function createLowercasePipeline() {
    const pipeline = await EsClient.ingest.putPipeline({
        id: 'lowercase-pipeline',
        description: 'Pipeline to convert name field to lowercase',
        processors: [
            {
                lowercase: {
                    field: 'name'
                }
            }
        ]
    });

    console.log("Pipeline Created: ");
    console.log(pipeline);
    return pipeline;
}

export async function getPipeline(pipelineId: string) {
    const pipeline = await EsClient.ingest.getPipeline({
        id: pipelineId
    });

    console.log("Pipeline Retrieved: ");
    console.log(pipeline);
    return pipeline;
}

export async function deletePipeline(pipelineId: string) {
    const response = await EsClient.ingest.deletePipeline({
        id: pipelineId
    });

    console.log("Pipeline Deleted: ");
    console.log(response);
    return response;
}

export async function SimulatePipeline(pipelineId: string, document: Record<string, unknown>) {
    const result = await EsClient.ingest.simulate({
        id: pipelineId,
        docs: [
            {
                _index: 'test-index',
                _id: '1',
                _source: document
            }
        ]
    });

    console.log("Pipeline Simulation Result: ");
    console.log(result.docs[0]?.doc?._source);
    return result;
}

export async function addWithPipeline(indexName: string, pipelineId: string, document: Record<string, unknown>) {
    const response = await EsClient.index({
        index: indexName,
        pipeline: pipelineId,
        document: document
    });

    console.log("Document Indexed with Pipeline: ");
    console.log(response);
    return response;
}

export async function customPipelineExample() {
    const pipline = await EsClient.ingest.putPipeline({
        id: 'custom-pipeline',
        description: 'Custom pipeline example',
        processors: [
            {
                lowercase: {
                    field: 'name',
                    on_failure: [
                        {
                            set: {
                                field: 'name',
                                value: 'default name'
                            }
                        }
                    ]
                }
            }, {
                set: {
                    field: 'description',
                    value: 'This is a description field added by the pipeline'
                }
            }
        ]
    });

    console.log("Custom Pipeline Created: ");
    console.log(pipline);
}

export async function pipelineProcessorExample() {
    const pipeline = await EsClient.ingest.putPipeline({
        id: 'processor-pipeline',
        description: 'Pipeline with multiple processors',
        processors: [
            {
                convert: {
                    field: 'price',
                    type: 'float',
                    ignore_missing: true,
                    on_failure: [
                        {
                            set: {
                                field: 'price',
                                value: 0.0
                            }
                        }
                    ]
                }
            }, {
                rename: {
                    field: 'old_field',
                    target_field: 'new_field',
                    ignore_missing: true,
                }
            }, {
                set: {
                    field: 'status',
                    value: 'processed'
                }
            }, {
                html_strip: {
                    field: 'content',
                    ignore_missing: true
                }
            }, {
                lowercase: {
                    field: 'category',
                    ignore_missing: true
                }
            }, {
                uppercase: {
                    field: 'brand',
                    ignore_missing: true
                }
            }, {
                trim: {
                    field: 'title',
                    ignore_missing: true
                }
            }, {
                split: {
                    field: 'tags',
                    separator: ',',
                    ignore_missing: true
                }
            }, {
                remove: {
                    field: 'unwanted_field',
                    ignore_missing: true
                }
            }, {
                append: {
                    field: 'tags',
                    value: 'new_tag',
                }
            }
        ]
    });

    console.log("Pipeline with Multiple Processors Created: ");
    console.log(pipeline);
}