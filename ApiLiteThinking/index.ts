import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import container from "./Container/LiteThinkingContainer";
import * as dotenv from 'dotenv';

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    dotenv.config();
    try {
        const controller = container.cradle.liteThinkingController;
        const response = await controller.handleReqest(req);

        context.res = {
            status: response.httpStatus,
            body: response.body,
        };
    } catch (error) {
        context.log(`*** Error throw: ${JSON.stringify(error)}`);
        context.res = {
            status: 500,
            body: { error: error.message || "Error inesperado" },
        };
    }
};

export default httpTrigger;