import { CosmosClient, Container } from "@azure/cosmos";

const DbContext = async (containerId, partitionKey = null) : Promise<Container> => {
    const databaseId = process.env['databaseId'];
    const endpoint = process.env['ENDPOINT'];
    const key = process.env['key'];

    const client = new CosmosClient({ endpoint, key });

    /**
     * Create the database if it does not exist
     */
    const { database } = await client.databases.createIfNotExists({
        id: databaseId
    });
    console.log(`Created database:\n${database.id}\n`);

    /**
     * Create the container if it does not exist
     */
    const { container } = await client
        .database(databaseId)
        .containers.createIfNotExists(
            { id: containerId, partitionKey },
            { offerThroughput: 400 }
        );

    console.log(`Created container:\n${container.id}\n`);

    return container;
}

export default DbContext
