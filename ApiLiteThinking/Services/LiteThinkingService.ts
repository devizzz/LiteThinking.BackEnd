import { CompaniesDto } from "../Domain/Dtos/CompaniesDto";
import { CompaniesMapper } from "../Domain/Mappers/CompaniesMapper";
import CompaniesRepository, { Companies } from "../Dal/Repositories/CompaniesRepository";

type ConstructorProps = {
    companiesRepository: CompaniesRepository,
    companiesMapper: CompaniesMapper,
};

class LiteThinkingService {

  private readonly companiesRepository: CompaniesRepository; 
  private readonly companiesMapper: CompaniesMapper;

  constructor({companiesRepository, companiesMapper}: ConstructorProps) {
    this.companiesRepository = companiesRepository;
    this.companiesMapper = companiesMapper;
  }

  public async saveCompany(companyDto: CompaniesDto): Promise<CompaniesDto> {
    const company = this.companiesMapper.dtoToEntity(companyDto);
    const createdItem = await this.companiesRepository.createCompany(company);
    return this.companiesMapper.entityToDto(createdItem);
  }

  public async getCompanies(): Promise<CompaniesDto[]> {
    const items = await this.companiesRepository.getCompanies();
    const companiesDto = items.map(x => this.companiesMapper.entityToDto(new Companies(x, false)));
    return companiesDto;
  }
}

export default LiteThinkingService;
