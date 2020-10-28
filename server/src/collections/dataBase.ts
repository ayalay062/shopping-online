
import { model, Schema, SchemaTypes, Document } from 'mongoose';
import { ProductSchema } from './products'
import { OrderSchema } from './order'

interface IData extends Document {
    inventory: {};
    customers: {};
    orders: [];
}

const DataSchema = new Schema<IData>({
    inventory: { ProductSchema },
    customers: {},
    orders: { OrderSchema },

})
export const Data = model<IData>('data', DataSchema)

