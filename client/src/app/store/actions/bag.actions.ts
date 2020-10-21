import { createAction, props } from '@ngrx/store';
import { IProduct } from '../../../models/product.model';
import { IBag } from '../../../models/bag.model';
import { IOrder } from '../../../models/order.model';
import { ISelectedProducts } from 'src/models/selectedProducts.model';

//------selectedProduct actions:-------
export const changeQty = createAction('CHANGE_QTY', props<{ product: ISelectedProducts; }>());
export const changedQty = createAction('CHANGED_QTY', props<{ product: ISelectedProducts }>());
export const shopping = createAction('SHOPPING', props<{ product: string ,qty,bagId, userId: string}>());
export const bought = createAction('SHOPPED', props<{ bag: IBag, products: ISelectedProducts[] }>());
export const getBag = createAction('GET_BAG', props<{ userId: string }>());
export const gotBag = createAction('GOT_BAG', props<{ bag: IBag  | null}>());
export const removeFromBag = createAction('REMOVE_FROM_BAG', props<{ bagId: string, productIds: string[] }>());
export const removedFromBag = createAction('REMOVED_FROM_BAG', props<{ productIds: string[] }>());
export const closeBag = createAction('CLOSE_BAG', props<{ bagId: string }>());
export const closedBag = createAction('CLOSED_BAG');