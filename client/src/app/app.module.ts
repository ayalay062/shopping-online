import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { IProductsState, productsReducer } from './store/reducers/products.reducer'
import { EffectsModule } from '@ngrx/effects';
import { userReducer, IUserState } from './store/reducers/user.reducer'


import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { HttpClientModule } from '@angular/common/http';
import { UserEffects } from 'src/app/store/effects/user.effects';
import { ProductEffects } from 'src/app/store/effects/products.effects';
import { BagEffects } from 'src/app/store/effects/bag.effects';
import { OrderEffects } from 'src/app/store/effects/order.effects';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ShoppingBagComponent } from './shopping-bag/shopping-bag.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductComponent } from './product/product.component';
import { BagProductComponent } from './bag-product/bag-product.component';
import { LoginComponent } from './login/login.component';
import { CreateProductComponent } from './create-product/create-product.component';
import { RegisterComponent } from './register/register.component';
import { IBagState, bagReducer } from '../app/store/reducers/bag.reducer';
import { OrderComponent } from './order/order.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
// import { SignupPageComponent } from './pages/signup-page/signup-page.component';
import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { RecieptComponent } from './reciept/reciept.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeDetailsComponent } from './home-details/home-details.component';
import { AboutComponent } from './about/about.component';
import { IOrderState, orderReducer } from '../app/store/reducers/order.reducers';
import { LoginWrapperComponent } from './login-wrapper/login-wrapper.component';
import { AdminActionsComponent } from './admin-actions/admin-actions.component';
import { CommonModule } from '@angular/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { CookieService } from 'ngx-cookie-service';
import { OrderCreatedModalComponent } from './order-created-modal/order-created-modal.component';

// import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { HighlightDirective } from './highlight.directive';


export interface IState {
  items: IProductsState,
  user: IUserState,
  bag: IBagState,
  order: IOrderState,
}

@NgModule({
  declarations: [
    AppComponent,
    ShoppingBagComponent,
    ProductsListComponent,
    ProductComponent,
    BagProductComponent,
    LoginComponent,
    CreateProductComponent,
    RegisterComponent,
    OrderComponent,
    HomePageComponent,
    // SignupPageComponent,
    ShoppingPageComponent,
    OrderPageComponent,
    RecieptComponent,
    HomeDetailsComponent,
    AboutComponent,
    LoginWrapperComponent,
    AdminActionsComponent,
    OrderCreatedModalComponent,
    HighlightDirective,
    // BrowserModule,
    // BrowserAnimationsModule,
    // MDBBootstrapModule.forRoot(),
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    StoreModule.forRoot<IState>({ user: userReducer, items: productsReducer, bag: bagReducer, order: orderReducer }),
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot([UserEffects, ProductEffects, BagEffects, OrderEffects]),
    BrowserAnimationsModule,
  ],
  providers: [AuthGuard, AuthService, CookieService],
  bootstrap: [AppComponent],
  entryComponents: [OrderCreatedModalComponent]

})
export class AppModule { }
