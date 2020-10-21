import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../../models/product.model';
import { IBag } from '../../../models/bag.model';
import { IOrder } from '../../../models/order.model';


export const createOrder = createAction('CREATE_ORDER', props<{ order: IOrder }>());
export const createdOrder = createAction('CREATED_ORDER', props<{ order: IOrder }>());
export const countOrders = createAction('COUNT_ORDERS');
export const countedOrders = createAction('COUNT_ORDERS_SUCCESS', props<{ count }>());
export const countDates = createAction('COUNTED_ORDERS', props<{ date }>());
export const countedDates = createAction('COUNTED_ORDERS_SUCCESS', props<{ countDate }>());

export const getOrder = createAction('FIND_ORDER', props<{ userId: string }>());
export const gotOrder = createAction('FOUND_ORDER', props<{ order: IOrder | null }>());