import { createReducer, on } from '@ngrx/store';
import { IBag } from '../../../models/bag.model'
import { IOrder } from '../../../models/order.model'
import { createOrder, countedOrders, countedDates, gotOrder } from '../actions/order.actions';

export interface IOrderState {
    order: IOrder,
}

export const initialState: IOrderState = {
    order: null,
}

export const orderReducer = createReducer(initialState,
    on(createOrder, (state, { order }) => {
        return ({
            ...state,
            order,
        })
    }),


    on(countedOrders, (state, { count }) => {
        return ({
            ...state,
            countOrders: count,
        })
    }),



    on(countedDates, (state, { countDate }) => {
        return ({
            ...state,
            countDate,
        })
    }),

    on(gotOrder, (state, { order }) => {
        return ({
            ...state,
            order: order,
        })
    }),
)