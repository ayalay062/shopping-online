import { createReducer, on } from '@ngrx/store';
import { receiveProducts, receiveCreatedProduct, deletedProduct,editedProduct,fetchProductsByCategory,fetchProductsByName } from '../actions/products.actions';
import { IProduct } from '../../../models/product.model'
import { ping } from '../actions/user.actions';

export interface IProductsState {
    products: IProduct[] | null,
    isLoading: boolean,
    category: string,
    inform_msg: string,
    categories: string[],
    shopping_bag: IBagProduct[]
}

// export interface IProduct {
//     _id: string;
//     name: string;
//     category: string;
//     price: number;
//     img: string
// }

export interface IBagProduct {
    _id: string,
    name: string,
    price: number,
    total_price: number,
    qty: number
}


// export interface IAddedProduct {
//     name: string;
//     category: string;
//     price: number;
//     img: string

// }




export const initialState: IProductsState = {
    products: null,
    isLoading: false,
    category: '',
    inform_msg: "",
    categories: ['apparel', 'bath', 'bedtime', 'toys'],
    shopping_bag: [{
        _id: 'qwww',
        name: ' shirt',
        price: 50,
        total_price: 100,
        qty: 2,
    }, {
        _id: 'asdf',
        name: ' skirt',
        price: 35,
        total_price: 105,
        qty: 3,
    }
    ]
}

export const productsReducer = createReducer(initialState,
    on(receiveProducts, (state, { products }) => {
        return ({
            ...state,
            isLoading: true,
            products: products,
        })
    }),
    on(receiveCreatedProduct, (state, { product }) => {
        return ({
            ...state,
            products: state.products.concat(product),
        })
    }),
    on(deletedProduct, (state, { productId }) => {
        return ({
            ...state,
            products: state.products.filter(product => product._id !== productId),
        })
    }),
    on(editedProduct, (state, { product }) => {
        return ({
            ...state,
            products: state.products.map(p=> (product._id === p._id ? product: p )),
        })
    }),
    // on(fetchProductsByCategory, (state, { categoryName }) => {
    //     return ({
    //         ...state,
    //         isLoading: true,
    //         products: product,
    //     })
    // }), on(fetchProductsByName, (state, { productName }) => {
    //     return ({
    //         ...state,
    //         isLoading: true,
    //         products: product,
    //     })
    // })
)