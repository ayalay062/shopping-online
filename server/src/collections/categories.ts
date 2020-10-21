
import { model, Schema, SchemaTypes, Document } from 'mongoose';

export interface ICategory extends Document {
    name: string;
}


export const CategorySchema = new Schema<ICategory>({
    name: String,
   
});

export const Category = model<ICategory>('category', CategorySchema);