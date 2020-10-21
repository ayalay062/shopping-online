export interface IOrder {
    _id?: string;
    customerId: string;
    bagId: string,
    totalPrice: number;
    city:string;
    street:string;
    deliveryDate: Date;
    orderDate:Date;
    LastDigitsCreditCard:number,
}
