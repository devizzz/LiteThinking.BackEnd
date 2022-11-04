import { CompaniesDto } from "../Dtos/CompaniesDto";
import { Companies } from "../Entities/Companies";

export class CompaniesMapper {

  entityToDto(entity: Companies): CompaniesDto {
    return new CompaniesDto(entity);
  }

  dtoToEntity(dto: CompaniesDto): Companies { 
    return new Companies(dto);
  }

}
