import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../../models/product.model';

export const fetchProducts = createAction('GET_PRODUCTS_PENDING');
export const receiveProducts = createAction('GET_PRODUCTS_SUCCESS', props<{ products: IProduct[] }>());

export const createProduct = createAction('CREATE_PRODUCT_PENDING', props<Omit<IProduct, '_id'>>());
export const receiveCreatedProduct = createAction('CREATE_PRODUCT_SUCCESS', props<{ product: IProduct }>());

export const deleteProduct = createAction('DELETE_PRODUCT_PENDING', props<{ productId: string }>());
export const deletedProduct = createAction('DELETE_PRODUCT_SUCCESS', props<{ productId: string }>());

export const editProduct = createAction('EDIT_PRODUCT_PENDING', props<{ productId: string, update: {} }>());
export const editedProduct = createAction('EDIT_PRODUCT_SUCCESS', props<{ product: IProduct}>());

export const fetchProductsByCategory = createAction('GET_PRODUCTS_BY_CATEGORY_PENDING', props<{ categoryName: string }>())
export const fetchedProductsByCategory = createAction('GET_PRODUCTS_BY_CATEGORY_SUCCESS', props<{ products: IProduct[] }>())

export const fetchProductsByName = createAction('GET_PRODUCTS_BY_NAME_PENDING', props<{ productName: string }>())
export const fetchedProductsByName = createAction('GET_PRODUCTS_BY_NAME_SUCCESS', props<{ product: IProduct }>())





