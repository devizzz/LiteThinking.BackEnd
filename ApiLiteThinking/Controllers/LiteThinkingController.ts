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
            case "PUT":
                return await this.updateCompany(req);
            case "DELETE":
                return await this.deleteCompany(req);
            default:
                return ControllerResponse.notFound({ error: `${req.method} method not supported` });
        }
    }

    private async getCompanies(): Promise<ControllerResponse> {
        try {
            const response = await this.liteThinkingService.getCompanies();
            return ControllerResponse.success(response);
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Server Error" });
        }
    }

    private async saveCompany(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const companyDto = new CompaniesDto(req.body);
            companyDto.created_at = new Date().toString();
            const response = await this.liteThinkingService.saveCompany(companyDto);
            return ControllerResponse.success(response);
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }

    private async updateCompany(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const companyDto = new CompaniesDto(req.body);
            await this.liteThinkingService.updateCompany(companyDto);
            return ControllerResponse.success();
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }

    private async deleteCompany(req: HttpRequest): Promise<ControllerResponse> {
        try {
            const { id, partitionKey } = req.query;
            if(id && partitionKey){
                await this.liteThinkingService.deleteCompany(id, partitionKey);
                return ControllerResponse.success();
            }
            else {
                return ControllerResponse.notFound();
            }
        } catch (error) {
            if (error instanceof ValueError) {
                return ControllerResponse.badRequest({ error: error.message || "Bad Request" });
            }
            return ControllerResponse.serverError({ error: error.message || "Error interno" });
        }
    }
}

export default LiteThinkingController;
