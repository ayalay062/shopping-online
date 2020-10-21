import { Injectable, ɵConsole } from '@angular/core';
import { act, Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { fetchProducts, receiveProducts, createProduct, receiveCreatedProduct, deleteProduct, deletedProduct, editProduct, editedProduct, fetchProductsByCategory, fetchedProductsByCategory, fetchProductsByName, fetchedProductsByName } from '../actions/products.actions';
import { BagService } from '../../services/bag.service'
import { changeQty, changedQty, bought, shopping, getBag, gotBag, removeFromBag, removedFromBag, closeBag, closedBag } from '../actions/bag.actions';


@Injectable()
export class BagEffects {
    constructor(private actions$: Actions, private selectedProductService: BagService) { }

    changeQty$ = createEffect(() =>
        this.actions$.pipe(
            ofType(changeQty),
            mergeMap((action) =>
                this.selectedProductService.changeQty(action.product)
                    .pipe(
                        map((product) => {
                            return changedQty({ product });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    closeBag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(closeBag),
            mergeMap((action) => {
                return this.selectedProductService.closeBag(action.bagId)
                    .pipe(
                        map(() => {
                            return closedBag();
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )}
            )
        )
    );

    shopping$ = createEffect(() =>
        this.actions$.pipe(
            ofType(shopping),
            mergeMap((action) =>
                this.selectedProductService.shopping(action.product ,action.qty, action.bagId, action.userId)
                    .pipe(
                        map((response) => {
                            return bought(response);
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    getBag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getBag),
            mergeMap((action) => {
                return this.selectedProductService.getBag(action.userId)
                    .pipe(
                        map((bag) => {
                            return gotBag({ bag });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )}
            )
        )
    );

    removeFromBag$ = createEffect(() =>
        this.actions$.pipe(
            ofType(removeFromBag),
            mergeMap((action) =>
                this.selectedProductService.removeFromBag(action.bagId,action.productIds)
                    .pipe(
                        map((productIds) => {
                            return removedFromBag({ productIds });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    // findBagOrOrder$ = createEffect(() =>
    //     this.actions$.pipe(
    //         ofType(findBagOrOrder),
    //         mergeMap((action) =>
    //             this.selectedProductService.findBagOrOrder(action.userId)
    //                 .pipe(
    //                     map((response) => {
    //                         return foundBagOrOrder(response);
    //                     }),
    //                     catchError((error: Error) => {
    //                         return of({ type: 'error' });
    //                     })
    //                 )
    //         )
    //     )
    // );
};


