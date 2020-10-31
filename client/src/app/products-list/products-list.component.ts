import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { IState } from '../app.module';
import { fetchProducts } from '../store/actions/products.actions';
import { IProduct } from 'src/models/product.model';
import { Observable } from 'rxjs';
import { shopping } from '../store/actions/bag.actions';
import { IUser } from 'src/models/user.model';
import { ICategory } from 'src/models/category.model';
import { ProductService } from '../services/product.service';
import { CreateProductComponent } from '../create-product/create-product.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.component.html',
  styleUrls: ['./products-list.component.css'],
})
export class ProductsListComponent implements OnInit {
  constructor(
    private store: Store<IState>,
    private productService: ProductService,
    private dialog: MatDialog
  ) {}
  @Output() onSelect = new EventEmitter();
  products$: Observable<IProduct[]>;
  categories: ICategory[];
  user: IUser;
  products: IProduct[];
  productsByCategory: IProduct[];
  category: ICategory;
  bagId: string;
  selectedProduct: IProduct;
  searchText: string ='';

  filterProducts() {
    if (!this.category || this.category._id === '-1') {
      this.productsByCategory = this.products.filter(
        (p) => p.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
    } else {
      this.productsByCategory = this.products.filter(
        (p) =>
          p.categoryId === this.category._id &&
          p.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1
      );
    }
  }

  search() {
 
    this.filterProducts();
  }
  clear() {
    this.searchText = '';
    this.category= {_id:'-1', name:'all'};
    this.filterProducts();
  }
  ngOnInit(): void {
    this.productService.getCategories().subscribe((categories) => {
      this.categories = categories;
      this.category = categories[0];
      this.store.dispatch(fetchProducts());
      this.store
        .select((state) => state.bag.bag?._id)
        .subscribe({ next: (bagId) => (this.bagId = bagId) });
      this.products$ = this.store.select((state) => state.items.products);
      this.products$.subscribe((productsList) => {
        if (productsList && productsList.length) {
          this.products = productsList;
          this.productsByCategory = this.products.filter(
            (p) => p.categoryId === this.category._id
          );
        }
      });
    });

    this.store
      .select((state) => state.user.user)
      .subscribe({ next: (user) => (this.user = user) });
  }

  changeCategory(e) {
    if (e.value === 'all') {
      this.category= {_id:'-1', name:'all'};
    } 
      this.filterProducts();
  }

  onProductClick(product) {
    const dialogRef = this.dialog.open(CreateProductComponent, {
      data: { selectedProduct: product },
    });
    dialogRef.afterClosed().subscribe((result) => {
      console.log(`Dialog result: ${result}`);
    });
    dialogRef.afterClosed().subscribe((result) => {});
  }

  addToCart(productId, qty) {
    if (!this.bagId) {
      this.store
        .select((state) => state.user.user._id)
        .subscribe({
          next: (userId) =>
            this.store.dispatch(
              shopping({ product: productId, qty, bagId: this.bagId, userId })
            ),
        });
    } else {
      this.store.dispatch(
        shopping({
          product: productId,
          qty,
          bagId: this.bagId,
          userId: undefined,
        })
      );
    }
  }
}
