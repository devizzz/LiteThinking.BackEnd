import { HttpRequest } from "@azure/functions";
import { ControllerResponse } from "./ControllerResponse";
import LiteThinkingService from "../Services/LiteThinkingService";
import { CompaniesDto } from "../Domain/Dtos/CompaniesDto";
import { ValueError } from "../Domain/Entities/errors";

type ConstructorProps = {
    liteThinkingService: LiteThinkingService
};

class LiteThinkingController {

    private readonly liteThinkingService: LiteThinkingService;

    constructor({ liteThinkingService }: ConstructorProps) {
        this.liteThinkingService = liteThinkingService;
    }

    public async handleReqest(req: HttpRequest): Promise<ControllerResponse> {
        switch (req.method) {
            case "GET":
                return await this.getCompanies();
            case "POST":
                return await this.saveCompany(req);
            default:
                return ControllerResponse.notFound({error: `${req.method} method not supported`});
        }
    }

    private async getCompanies(): Promise<ControllerResponse> {
        try {
            const response = await this.liteThinkingService.getCompanies();
            return ControllerResponse.success(response);
        } catch(error) {
            if(error instanceof ValueError){
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Server Error"});
        }
    }

    private async saveCompany(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const companyDto = new CompaniesDto(req.body);
            const response = await this.liteThinkingService.saveCompany(companyDto);
            return ControllerResponse.success(response);
        } catch(error){
            if(error instanceof ValueError){
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno"});
        }
    }
}

export default LiteThinkingController;
