import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { ProductService } from '../../services/product.service';
import { fetchProducts, receiveProducts, createProduct, receiveCreatedProduct, deleteProduct, deletedProduct, editProduct, editedProduct, fetchProductsByCategory, fetchedProductsByCategory, fetchProductsByName, fetchedProductsByName } from '../actions/products.actions';

@Injectable()
export class ProductEffects {
    constructor(private actions$: Actions, private productService: ProductService) { }

    fetchProducts$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProducts),
            mergeMap(() => {
                return this.productService.getProducts()
                    .pipe(
                        map((products) => {
                            return receiveProducts({ products });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            }
            )

        )
    );

    createProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(createProduct),
            mergeMap(action =>
                this.productService.createProduct({ name: action.name, categoryId: action.categoryId, price: action.price, image: action.image })
                    .pipe(
                        map((product) => {
                            return receiveCreatedProduct({ product });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    deleteProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(deleteProduct),
            mergeMap(action =>
                this.productService.deleteProduct(action.productId)
                    .pipe(
                        map(() => {
                            return deletedProduct({ productId: action.productId });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    editProduct$ = createEffect(() =>
        this.actions$.pipe(
            ofType(editProduct),
            mergeMap(action =>
                this.productService.editProduct(action.productId, action.update)
                    .pipe(
                        map((updatedProduct) => {
                            return editedProduct({ product: updatedProduct });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    fetchProductsByCategory$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductsByCategory),
            mergeMap((action) =>
                this.productService.getProductsByCategory(action.categoryName)
                    .pipe(
                        map((products) => {
                            return fetchedProductsByCategory({ products });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );

    fetchProductsByName$ = createEffect(() =>
        this.actions$.pipe(
            ofType(fetchProductsByName),
            mergeMap((action) =>
                this.productService.getProductByName(action.productName)
                    .pipe(
                        map((product) => {
                            return fetchedProductsByName({ product });
                        }),
                        catchError((error: Error) => {
                            return of({ type: 'error' });
                        })
                    )
            )
        )
    );
}
