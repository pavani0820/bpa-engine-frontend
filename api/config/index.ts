import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try {
        // context.log('HTTP trigger function processed a request.');
        // const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
        // context.log(`body : ${JSON.stringify(req.body)}`)

        // const database = client.database(process.env.COSMOS_DB_DB);
        // const container = database.container(process.env.COSMOS_DB_CONTAINER);
        // await container.item(id, category).delete();
        // const item = await container.item("1")
        // await item.delete()
        const out = create(context, req)
        context.res = {
            body: out
        }
    } catch (err) {
        context.log(err)
        context.res = {
            body: err
        }
    } finally {
        // const out = await create(context, req)
        // context.res = {
        //     // status: 200, /* Defaults to 200 */
        //     body: out
        // };
    }


};

const create = async function (context: Context, req: HttpRequest): Promise<void> {

    context.log('HTTP trigger function processed a request.');
    const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
    context.log(`body : ${JSON.stringify(req.body)}`)

    const database = client.database(process.env.COSMOS_DB_DB);
    const container = database.container(process.env.COSMOS_DB_CONTAINER);
    const newBody = req.body
    container.delete()
    const { resource: createdItem } = await container.items.create(newBody);
    return createdItem

};

export default httpTrigger;
