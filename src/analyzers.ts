import EsClient from "./conn.js";
import { type estypes } from '@elastic/elasticsearch';

export async function htmlAnalyzer() {
    const response = await EsClient.indices.analyze({
        tokenizer: 'keyword',
        char_filter: ['html_strip'],
        text: '<p>I&apos;m so <b>happy</b>!</p>'
    })
    console.log('HTML Analyzer Result: ');
    console.log(response.tokens);
    return response;
}

export async function mappings() {
    const response = await EsClient.indices.analyze({
        tokenizer: 'keyword',
        char_filter: [{
            type: 'mapping',
            mappings: [
                "٠ => 0",
                "١ => 1",
                "٢ => 2",
                "٣ => 3",
                "٤ => 4",
                "٥ => 5",
                "٦ => 6",
                "٧ => 7",
                "٨ => 8",
                "٩ => 9"
            ]
        }],
        text: "My license plate is ٢٥٠١٥"
    });

    console.log('Mappings analyzer results: ');
    console.log(response.tokens);
    return response;
}

export async function standardTokenizer () {
    const response = await EsClient.indices.analyze({
        tokenizer: 'standard',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
    });
    console.log('Standard Tokenizer Result: ');
    console.log(response.tokens);
    return response;
}

export async function lowercaseAnalyzer() {
    const response = await EsClient.indices.analyze({
        tokenizer: 'lowercase',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone.",
    });
    console.log('Lowercase Analyzer Result: ');
    console.log(response.tokens);
    return response;
}

export async function whitespaceAnalyzer() {
    const response = await EsClient.indices.analyze({
        tokenizer: 'whitespace',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone.",
    });
    console.log('Whitespace Analyzer Result: ');
    console.log(response.tokens);
    return response;
}

export async function apostropheTokenFilter () {
    const response = await EsClient.indices.analyze({
        tokenizer: 'standard',
        filter: ['apostrophe'],
        text: `The 2 QUICK Brown-Foxes jumped over the lazy dog's bone.`
    });
    console.log('Apostrophe Token Filter Result: ');
    console.log(response.tokens);
    return response;
}

export async function decimaldigitTokenFilter () {
    const response = await EsClient.indices.analyze({
        tokenizer: 'standard',
        filter: ['decimal_digit'],
        text: `The price is ٢٠٢٤ dollars.`
    });
    console.log('Decimal Digit Token Filter Result: ');
    console.log(response.tokens);
    return response;
}

export async function reverseTokenFilter () {
    const response = await EsClient.indices.analyze({
        tokenizer: 'standard',
        filter: ['reverse'],
        text: `The 2 QUICK Brown-Foxes jumped over the lazy dog's bone.`
    });
    console.log('Reverse Token Filter Result: ');
    console.log(response.tokens);
    return response;
}

export async function standardAnalyzer() {
    const response = await EsClient.indices.analyze({
        analyzer: 'standard',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
    });
    console.log('Standard Analyzer Result: ');
    console.log(response.tokens);
    return response;
}

export async function stopAnalyzer() {
    const response = await EsClient.indices.analyze({
        analyzer: 'stop',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
    });
    console.log('Stop Analyzer Result: ');
    console.log(response.tokens);
    return response;
}

export async function keywordAnalyzer() {
    const response = await EsClient.indices.analyze({
        analyzer: 'keyword',
        text: "The 2 QUICK Brown-Foxes jumped over the lazy dog's bone."
    });
    console.log('Keyword Analyzer Result: ');
    console.log(response.tokens);
    return response;
}