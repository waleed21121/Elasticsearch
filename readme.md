# Elasticsearch Node.js Project

A comprehensive Node.js application that demonstrates Elasticsearch capabilities for search, data management, and analytics.


## Overview

This project explores Elasticsearch as a powerful search and analytics engine integrated with Node.js. It covers everything from basic CRUD operations to advanced features like semantic search with embeddings, intelligent data preprocessing through pipelines, and sophisticated query patterns.

---

## Features

### Core Data Operations
- **Index Management**: Create and manage Elasticsearch indexes with custom mappings
- **Document Operations**: Insert, retrieve, update, and delete documents with ease
- **Bulk Operations**: Efficiently handle batch operations for high-volume data ingestion
- **Existence Checks**: Quickly verify if documents or indexes exist

### Advanced Search Capabilities
- **Full-Text Search**: Find documents by matching keywords and phrases
- **Filtered Search**: Narrow results using range queries and precise filters
- **Boolean Queries**: Combine multiple conditions with AND, OR, and NOT logic
- **Pagination**: Support for both offset-based and cursor-based pagination

### Semantic Search
- **Vector Embeddings**: Convert text to numerical representations using pre-trained models
- **KNN Search**: Find semantically similar documents using K-Nearest Neighbors
- **Dense Vectors**: Efficiently index and search embedding vectors

### Data Pipeline & Preprocessing
- **Ingest Pipelines**: Automate data transformation before indexing
- **Multiple Processors**: Apply conversions, formatting, and enrichment
- **Error Handling**: Graceful failure modes with fallback actions
- **Simulation**: Test pipelines without modifying data

### Text Analysis
- **Custom Analyzers**: Configure how text is processed and indexed
- **Character Filters**: Clean and normalize raw text input
- **Tokenization**: Break text into meaningful tokens
- **Token Filtering**: Refine tokens with specialized filters

---

### Prerequisites
- Node.js (v16 or higher)
- Elasticsearch cluster (local or remote)
- npm or yarn package manager

---

## Core Functions

### Index Management

**createIndex(name: string)** - Creates a new index with predefined field mappings. Establishes the schema for storing documents with proper field types (text, integer, date, etc.).

### Document Operations

**insertData(indexName: string, data: any)** - Adds a new document to an index. Elasticsearch automatically generates a document ID if not provided.

**getDocument(indexName: string, documentId: string)** - Retrieves a complete document by its ID in real-time without searching.

**updateDocument(indexName: string, documentId: string, updates: any)** - Modifies specific fields of a document while preserving other fields. More efficient than full replacement.

**deleteDocument(indexName: string, documentId: string)** - Removes a document from the index permanently.

**bulkOperation(indexName: string)** - Executes multiple operations (create, update, delete) in a single request. Dramatically improves performance for batch operations.

### Existence Verification

**documentExists(indexName: string, documentId: string)** - Quickly checks if a specific document exists without loading its data.

**indexExists(indexName: string)** - Verifies if an index exists in the cluster.

### Search Operations

**searchAll(indexName: string)** - Retrieves all documents in an index without any filtering or search criteria.

**searchByWord(indexName: string, fieldName: string, word: string)** - Performs full-text search on a specific field. The search engine tokenizes the input and finds matching documents based on text analysis.

**filterByRange(indexName: string, age: number)** - Finds documents where a numeric field falls within specified bounds. Supports various comparison operators (less than, greater than, equals, etc.).

**multipleFilters(indexName: string, age: number, word: string)** - Combines multiple search conditions using boolean logic. Uses MUST clauses for required conditions and SHOULD clauses for optional boosting.

### Pagination

**paginateWithSizeAndFrom(indexName: string, field: string, value: string, from: number, size: number)** - Traditional offset-based pagination. Useful for UI pagination with specific page numbers. Less efficient for deep pagination.

**paginateWithSearchAfter(indexName: string, field: string, value: string, searchAfter: number, size: number)** - Cursor-based pagination using the last document's sort value. More efficient for large datasets and ideal for infinite scrolling.

### Vector Search & Embeddings

**getEmbeddings(text: string)** - Converts text into a numerical vector representation using a pre-trained transformer model. The embedding captures semantic meaning, enabling similarity-based search.

**createEmbeddingsIndex(name: string)** - Creates an index optimized for dense vector storage. Configures similarity metrics (cosine distance) for efficient KNN operations.

**searchIndexByEmbedding(indexName: string, queryEmbedding: number[], topK: number)** - Performs semantic search using K-Nearest Neighbors. Finds the K documents whose embeddings are most similar to the query embedding.

### Ingest Pipelines

**createLowercasePipeline()** - Demonstrates a simple pipeline that normalizes text by converting it to lowercase before indexing.

**getPipeline(pipelineId: string)** - Retrieves the definition of an existing pipeline.

**deletePipeline(pipelineId: string)** - Removes a pipeline from the system.

**SimulatePipeline(pipelineId: string, document: Record<string, unknown>)** - Tests a pipeline's transformation on sample data without actually indexing. Useful for validation and debugging.

**addWithPipeline(indexName: string, pipelineId: string, document: Record<string, unknown>)** - Indexes a document while applying a specified pipeline for data transformation.

**customPipelineExample()** - Demonstrates a multi-stage pipeline combining lowercase conversion with field addition and error handling.

**pipelineProcessorExample()** - Shows advanced pipeline with multiple processors: type conversion, field renaming, HTML stripping, case conversion, trimming, splitting, removal, and appending.

### Text Analysis

**htmlAnalyzer()** - Removes HTML tags and entities from text, useful for cleaning web content.

**mappings()** - Demonstrates character mapping for Unicode conversion (e.g., Arabic numerals to English digits).

**standardTokenizer()** - Tokenizes text using Elasticsearch's standard tokenizer, splitting on word boundaries and handling punctuation.

**lowercaseAnalyzer()** - Tokenizes and converts all text to lowercase for case-insensitive search.

**whitespaceAnalyzer()** - Simple tokenization that splits only on whitespace, preserving original case.

**apostropheTokenFilter()** - Removes possessive apostrophes, converting "dog's" to "dog".

**decimaldigitTokenFilter()** - Normalizes non-ASCII digits to ASCII equivalents.

**reverseTokenFilter()** - Reverses the characters in each token (advanced use cases like reverse index).

**standardAnalyzer()** - Built-in analyzer combining standard tokenization with lowercase conversion and stopword removal.

**stopAnalyzer()** - Standard analyzer variant that explicitly removes common words (the, a, is, etc.).

**keywordAnalyzer()** - Treats entire input as a single token with no tokenization, useful for exact matching.