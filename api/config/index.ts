import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import { CosmosClient } from "@azure/cosmos";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    try{
        context.log('HTTP trigger function processed a request.');
        const client = new CosmosClient(process.env.COSMOS_DB_CONNECTION_STRING);
    
        const database = client.database(process.env.COSMOS_DB_DB);
        const container = database.container(process.env.COSMOS_DB_CONTAINER);
        const { resource: createdItem } = await container.items.create(req.body);
        context.res = {
            // status: 200, /* Defaults to 200 */
            body: createdItem
        };
    } catch(err){
        context.log(err)
        context.res = {
            body : err
        }
    }
    
    
};

export default httpTrigger;
