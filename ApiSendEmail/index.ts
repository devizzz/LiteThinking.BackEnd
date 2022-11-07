import { AzureFunction, Context, HttpRequest } from "@azure/functions"
import * as dotenv from 'dotenv';
import * as SendGrid from '@sendgrid/mail'

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    dotenv.config();
    try {
        SendGrid.setApiKey(process.env.SENDGRID_API_KEY);

        const { email } = req.query;
        const base64string = req.body.toString('base64');

        const msg = {
            to: email,
            from: process.env.EMAIL,
            subject: 'Dodumento',
            html: '<strong>Documento solicitado</strong>',
            attachments: [
                {
                    content: base64string,
                    filename: "attachment.pdf",
                    type: "application/pdf",
                    disposition: "attachment"
                }
            ]
        };

        SendGrid
            .send(msg)
            .then((response) => {
                console.log(response[0].statusCode)
                console.log(response[0].headers)
            })
            .catch((error) => {
                console.error(error)
            })

        context.res = {
            status: 200
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