import { ISelectedProducts } from "./selectedProducts.model";

export interface IBag {
    _id: string;
    id_customer: string;
    date?: Date;
    is_open?: boolean;
    products:ISelectedProducts[];
}


