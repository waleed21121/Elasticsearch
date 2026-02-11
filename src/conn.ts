import { Client } from '@elastic/elasticsearch';

const EsClient = new Client({
    node: 'http://localhost:9200',
});

// EsClient.ping();

export default EsClient;