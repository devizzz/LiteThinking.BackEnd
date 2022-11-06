import { Container } from '@azure/cosmos';
import { ValueProvider } from '../ValueProvider';

export { Companies } from '../../Domain/Entities/Companies';

type ConstructorProps = {
    companiesContainerProvider: ValueProvider<Container>,
};

class CompaniesRepository {

    private readonly companiesContainerProvider: ValueProvider<Container>;

    constructor({ companiesContainerProvider }: ConstructorProps) {
        this.companiesContainerProvider = companiesContainerProvider;
    }

    async getCompanies() {

        const querySpec = {
            query: 'SELECT * from c'
        };

        // read all items in the Items container
        const container = await this.companiesContainerProvider.provide();
        const { resources: items } = await container.items
            .query(querySpec)
            .fetchAll();

        return items;
    }

    async getUsersById(NIT: string) {

        const querySpec = {
            query: 'SELECT * from c'
        };

        const container = await this.companiesContainerProvider.provide();
        const { resources: items } = await container.items.query(querySpec, { partitionKey: NIT }).fetchAll();

        return items;
    }

    async createCompany(item) {
        const container = await this.companiesContainerProvider.provide();
        const { resource: createdItem } = await container.items.create(item)

        return createdItem;
    }

    async updateCompany(item) {
        const container = await this.companiesContainerProvider.provide();
        await container.item(item.id).replace(item);
    }
}

export default CompaniesRepository;
