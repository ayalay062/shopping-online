
import { model, Schema, SchemaTypes, Document } from 'mongoose';


export interface IProduct extends Document {
    
   name: string;
    categoryId: string;
    price: number;
    image: string;
}

export const ProductSchema = new Schema<IProduct>({
    name: String,
    categoryId: String,
    price: Number,
    image: String,
});


export const Product = model<IProduct>('product', ProductSchema);