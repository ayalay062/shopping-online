import { IProduct } from './product.model';

export interface ISelectedProducts {
    _id: string;
    productId: IProduct,
    qty: number,
    totalPrice: number,
    bagId:string,
}



