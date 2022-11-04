import { asClass, createContainer, asValue } from 'awilix';
import LiteThinkingService from '../Services/LiteThinkingService';
import { ValueProvider } from '../Dal/ValueProvider';
import LiteThinkingController from '../Controllers/LiteThinkingController';
import { Container as CosmosDbContainer } from '@azure/cosmos';
import DbContext from '../Dal/dbContext';
import { CompaniesMapper } from '../Domain/Mappers/CompaniesMapper';
import CompaniesRepository from '../Dal/Repositories/CompaniesRepository';

type ContainerProps = {
    liteThinkingService: LiteThinkingService,
    liteThinkingController: LiteThinkingController,
    companiesRepository: CompaniesRepository,
    companiesContainerProvider: ValueProvider<CosmosDbContainer>,
    companiesMapper: CompaniesMapper,
};

const container = createContainer<ContainerProps, any>();

container
    .register({
        liteThinkingController: asClass(LiteThinkingController).singleton(),
    })
    .register({
        liteThinkingService: asClass(LiteThinkingService).singleton()
    })
    .register({
        companiesMapper: asClass(CompaniesMapper).singleton()
    })
    .register({
        companiesRepository: asClass(CompaniesRepository).singleton(),
    })
    .register({
        companiesContainerProvider: asValue(new ValueProvider( async () => await DbContext('Companies', 'NIT')))
    });

export default container;
