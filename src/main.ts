import { apostropheTokenFilter, decimaldigitTokenFilter, htmlAnalyzer, keywordAnalyzer, lowercaseAnalyzer, mappings, reverseTokenFilter, standardAnalyzer, standardTokenizer, stopAnalyzer, whitespaceAnalyzer } from "./analyzers.js";
import { createIndex } from "./create-index.js";
import { deleteDocument } from "./delete-document.js";
import { deleteIndex } from "./delete-index.js";
import { createEmbeddingsIndex, getEmbeddings, searchIndexByEmbedding } from "./embeddings.js";
import { documentExists, indexExists } from "./exist-api.js";
import { getDocument } from "./get-document.js";
import { addWithPipeline, createLowercasePipeline, customPipelineExample, deletePipeline, getPipeline, pipelineProcessorExample, SimulatePipeline } from "./ingest-pipelines.js";
import { insertData } from "./insert-data.js";
import { paginateWithSearchAfter, paginateWithSizeAndFrom } from "./pagination.js";
import { filterOlderSW, multipleFilters, paginate, searchByWord, serachAll } from "./search-api.js";
import { updateDocument } from "./update-document.js";

async function main() {
    await createIndex("test-index");
    await indexExists('test-index');

    const data = await insertData('test-index', {
        name: "John Doe",
        age: 30,
        occupation: "Software Developer",
        description: "A passionate developer specializing in web applications. web",
        created_at: new Date(),
    });

    await insertData('test-index', {
        name: "Jane Smith",
        age: 25,
        occupation: "Data Analyst",
        description: "Expert in data visualization and statistical analysis. web",
        created_at: new Date(),
    });

    await insertData('test-index', {
        name: "Alice Johnson",
        age: 28,
        occupation: "Project Manager",
        description: "Skilled in agile methodologies and team leadership. web",
        created_at: new Date(),
    });

    await insertData('test-index', {
        name: "Bob Brown",
        age: 35,
        occupation: "UX Designer",
        description: "Focused on creating user-friendly interfaces and experiences. web",
        created_at: new Date(),
    });

    await insertData('test-index', {
        name: "Charlie Davis",
        age: 32,
        occupation: "DevOps Engineer",
        description: "Ensures smooth deployment and integration processes. web",
        created_at: new Date(),
    });

    await insertData('test-index', {
        name: "Eve Wilson",
        age: 29,
        occupation: "Cybersecurity Specialist",
        description: "Specializes in protecting systems and networks from cyber threats. web",
        created_at: new Date(),
    });

    // await deleteDocument('test-index', data._id);

    try {
        // await getDocument('test-index', data._id);
    } catch (error) {
        console.error(error);
    }

    /*
    await updateDocument('test-index', data._id, {
        age: 31,
        occupation: "Senior Software Developer"
    });
    */

    /*
    try {
        await getDocument('test-index', data._id);
    } catch (error) {
        console.error(error);
    }
    */

    // await documentExists('test-index', 'data._id');

    await getDocument('test-index', data._id);
    setTimeout(async () => {
        // await serachAll('test-index');
        // await searchByWord('test-index', 'name', 'jo');
        // await filterOlderSW('test-index', 30);
        // await multipleFilters('test-index', 30, 'web');
        // await paginate('test-index', 'description', 'web', 0, 2);
        // await paginateWithSizeAndFrom('test-index', 'description', 'web', 2, 2);
        // await paginateWithSearchAfter('test-index', 'description', 'web', 30, 2);
        await deleteIndex("test-index");
    }, 2000);
}

async function testEmbeddings() {
    const text = "This is a test sentence for generating embeddings.";
    const embeddings = await getEmbeddings(text);
    console.log('Embeddings:');
    console.log(embeddings.length);

    const indexName = "embeddings-index";
    await createEmbeddingsIndex(indexName);

    await insertData(indexName, {
        embedding: Array.from(embeddings),
        text: text
    });

    setTimeout(async () => {
        const queryEmbeddings = await getEmbeddings("This is a test sentence for generating embeddings.");
        await searchIndexByEmbedding(indexName, Array.from(queryEmbeddings), 5);
        await deleteIndex(indexName);
    }, 2000);
}

async function testPipelines() {
    await createLowercasePipeline();
    await getPipeline('lowercase-pipeline');
    await createIndex('test-index');

    const data = {
        name: "John Doe",
        age: 30,
    };

    await SimulatePipeline('lowercase-pipeline', data);

    const response = await addWithPipeline('test-index', 'lowercase-pipeline', data);

    const doc = await getDocument('test-index', response._id);
    console.log('Document after pipeline processing: ');
    console.log(doc._source);

    await customPipelineExample();
    await SimulatePipeline('custom-pipeline', {
        age: 30
    });

    await pipelineProcessorExample();

    const pipelineProcessorsData = {
        price: "100.50",
        old_field: "old_value",
        content: "<p>This is a description with HTML.</p>",
        brand: "apple",
        category: "BookS",
        title: "   Example Title with Whitespace   ",
        tags: "tag1,tag2,tag3",
        unwanted_field: "This field should be removed"
    }

    const response2 =await addWithPipeline('test-index', 'processor-pipeline', pipelineProcessorsData);
    const doc2 = await getDocument('test-index', response2._id);
    console.log('Document after processor pipeline: ');
    console.log(doc2._source);

    await deleteIndex('test-index');
    await deletePipeline('lowercase-pipeline');
}

async function testAnalyzers() {
    await htmlAnalyzer();
    await mappings();
    await standardTokenizer();
    await lowercaseAnalyzer();
    await whitespaceAnalyzer();
    await apostropheTokenFilter();
    await decimaldigitTokenFilter();
    await reverseTokenFilter();
    await standardAnalyzer();
    await stopAnalyzer();
    await keywordAnalyzer();
}


testAnalyzers();
// testPipelines();
// testEmbeddings();
// main();