import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ProductsListComponent } from './products-list/products-list.component';
import {ShoppingBagComponent} from './shopping-bag/shopping-bag.component'
import { PrivateRoute } from './privateRoute';
import { HomePageComponent } from './pages/home-page/home-page.component';

import { ShoppingPageComponent } from './pages/shopping-page/shopping-page.component';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { AuthGuard } from './auth.guard';
import { AboutComponent } from './about/about.component';


const routes: Routes = [
  {
    path: '', component: AboutComponent,

  },
  {
     path: 'register', component: RegisterComponent,
    children:[
      {path:"", component: RegisterComponent},
      {path:"next-step", component: RegisterComponent},
    ]
  },
  {
    path: 'products', component: ShoppingPageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'login', component: LoginComponent
  },
  {
    path: 'order', component: OrderPageComponent, 
  },
  {
    path: 'home', component: HomePageComponent, canActivate: [AuthGuard]
  },
  {
    path: 'about', component: AboutComponent, 
  },
  {
    path: '**', redirectTo: 'products-list'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

