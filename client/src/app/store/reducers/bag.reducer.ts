import { createReducer, on } from '@ngrx/store';
import { IBag } from '../../../models/bag.model'
import { IOrder } from '../../../models/order.model'
import { changedQty, bought, gotBag, removedFromBag, closedBag } from '../actions/bag.actions';

export interface IBagState {
    bag: IBag | null;
    // 2 func order: IOrder | null;

}


export const initialState: IBagState = {
    bag: null,
    // 2 func order: null,

}

export const bagReducer = createReducer(initialState,
    on(changedQty, (state, { product }) => {
        const { bag } = state;
        const modifiedProducts = bag.products.slice();
        const index = modifiedProducts.findIndex(p => p._id === product._id);
        modifiedProducts[index] = product;
        return ({
            ...state,
            bag: { ...state.bag, products: modifiedProducts },
        })
    }),

    on(closedBag, (state, {}) => {
        return ({
            ...state,
            bag: undefined,
        })
    }),

    on(bought, (state, { bag: newBag, products }) => {
        const { bag } = state;
        const bagState = {
            ...newBag,
            products,
        }
        return ({
            ...state,
            bag: bagState,
        })
    }),




    on(gotBag, (state, { bag }) => {
        return ({
            ...state,
            bag: bag,
        })
    }),

    on(removedFromBag, (state, { productIds }) => {

        return ({
            ...state,
            bag: { ...state.bag, products: state.bag.products.filter(p => !productIds.includes(p._id)) },
        })
    }),



// 2 functions
    // on(foundBagOrOrder, (state, { bag, order }) => {
    //     return ({
    //         ...state,
    //         bag,
    //         order,
    //     })
    // }),



    // ^4[0-9]{12}(?:[0-9]{3})?$
)