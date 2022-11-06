import { ValueError } from "./errors";

export type Products = {
    name: string;
    stock: number;
    unit_price: number;
}

export class Companies {
    id: string;
    NIT: string | null;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    products: Array<Products>

    /**
     * 
     * @param props 
     * @param validate 
     */
    constructor(props: Partial<Companies>, validate = true) {
        this.id = props.id;
        this.NIT = props.NIT;
        this.name = props.name;
        this.address = props.address;
        this.phone = props.phone;
        this.created_at = props.created_at;
        this.products = props.products;
        if (validate) this.validate();
    }

    /**
     * validate company properties
     */
    validate() {
        const createdDateFromString = new Date(this.created_at);

        if (typeof (this.NIT) != "string" || !this.NIT)
            throw new ValueError("NIT should be not empty string");

        if (typeof (this.name) != "string" || !this.name)
            throw new ValueError("name should be not empty string");

        if (typeof (this.address) != "string" || !this.name)
            throw new ValueError("address should be not empty string");

        if (typeof (this.phone) != "string" || !this.phone)
            throw new ValueError("phone should be not empty string");

        if (typeof (this.created_at) != "string" || isNaN(createdDateFromString.getTime()))
            throw new ValueError("created_at should be a valid datetime format");
    }
}
