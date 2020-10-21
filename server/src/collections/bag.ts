
import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { User } from './user';


export interface IBag extends Document {
    customerId: string;
    date?: Date;
    is_open?: boolean;
    
}


export interface ISelected_Product extends Document  {
    productId: string;
    qty: number;
    bagId:string;
}

export const SelectedProductSchema = new Schema<ISelected_Product>({
    productId: { type: Schema.Types.ObjectId, ref: 'product' },
    qty: Number,
    bagId:String,
});

export const BagSchema = new Schema<IBag>({
    customerId: { type: String, ref: 'users' },
    date: { type: Date, default: new Date() },
    bagId: String,
    is_open: { type: Boolean, default: true },
});

export const Bag = model<IBag>('bag', BagSchema);

export const SelectedProduct = model<ISelected_Product>('Selected_product', SelectedProductSchema);
