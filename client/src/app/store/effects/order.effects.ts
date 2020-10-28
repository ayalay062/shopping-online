import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { OrderService } from '../../services/order.service';
import { createOrder, createdOrder, countOrders, countedOrders, countedDates, countDates,getOrder, gotOrder } from '../actions/order.actions'
@Injectable()
export class OrderEffects {
    constructor(private actions$: Actions, private orderService: OrderService) { }

    createOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createOrder),
            mergeMap((actions) =>
                this.orderService.createOrder(actions.order)
                    .pipe(
                        map((order) => {
                            return createdOrder({ order });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    )

    countOrders$ = createEffect(() =>
        this.actions$.pipe(
            ofType(countOrders),
            mergeMap(() =>
                this.orderService.countOrders()
                    .pipe(
                        map((count) => {
                            return countedOrders({ count });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    )

    getOrder$ = createEffect(() =>
        this.actions$.pipe(
            ofType(getOrder),
            mergeMap((action) => {
                return this.orderService.getOrder(action.userId)
                    .pipe(
                        map((order) => {
                            return gotOrder({ order });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                )}
            )
        )
    );

}