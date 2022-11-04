export type ProductsDto = {
    name: string;
    stock: number;
    unit_price: number;
}

export class CompaniesDto {
    id: string;
    NIT: string | null;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    products: Array<ProductsDto>

    /**
     * 
     * @param props 
     */
    constructor(props: Partial<CompaniesDto>) {
        this.id = props.id;
        this.NIT = props.NIT;
        this.name = props.name;
        this.phone = props.phone;
        this.created_at = props.created_at;
        this.products = props.products;
    }
}
