import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { IProduct } from 'src/models/product.model';
import { IBag } from 'src/models/bag.model';
import { IOrder } from 'src/models/order.model';


const SELECTED_PRODUCTS_API_URL = 'http://localhost:4000/selectedProducts';
const BAG_API_URL = 'http://localhost:4000/bag'

@Injectable({
  providedIn: 'root'
})

export class BagService {

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  changeQty(product: ISelectedProducts): Observable<ISelectedProducts> {
    return this.http.put<ISelectedProducts>(`${SELECTED_PRODUCTS_API_URL}/changeQty`, { product },
      {
        headers: this.getHeaders(),
        // responseType: 'text',
      });
  }

  shopping(product: string,qty,bagId, userId): Observable<{bag: IBag, products: ISelectedProducts[]}> {
    return this.http.post<{bag: IBag, products: ISelectedProducts[]}>(`${BAG_API_URL}/shopping`, { product,qty,bagId, userId },
      {
        headers: this.getHeaders(),
      });
  }

    getBag(userId: string): Observable<IBag> {
      return this.http.get<IBag>(`${BAG_API_URL}/getBag/${userId}`,
        {
          headers: this.getHeaders(),
        });
    }
    
  
  closeBag(bagId: string) {
    return this.http.put(`${BAG_API_URL}/close/${bagId}`, {},
      {
        headers: this.getHeaders(),
      });
  }

  

  removeFromBag(bagId: string, productIds: string[]): Observable<string[]> {
    const options =  {
      headers: this.getHeaders(),
      body: { productIds },
    };
    return this.http.delete<string[]>(`${BAG_API_URL}/removeFromBag`, options);
     
  }



  // findBagOrOrder(userId: string): Observable<{bag:IBag, order:IOrder}> {
  //   return this.http.get<{bag:IBag, order:IOrder}>(`${BAG_API_URL}/findBagOrOrder/${userId}`,
  //     {
  //       headers: this.getHeaders(),
  //     });
  // }

}
