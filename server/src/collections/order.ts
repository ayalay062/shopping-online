
import { model, Schema, SchemaTypes, Document } from 'mongoose';




export interface IOrder extends Document {
    customerId: string;
    bagId: string,
    totalPrice: number;
    city:string;
    street:string;
    deliveryDate: Date;
    orderDate:Date;
    LastDigitsCreditCard:number,
}
export const OrderSchema = new Schema<IOrder>({
    customerId: String,
    bagId: String,
    totalPrice: Number,
    city:String,
    street:String,
    deliveryDate: Date,
    orderDate:Date,
    LastDigitsCreditCard: Number,
});


export const Order = model<IOrder>('Order', OrderSchema);