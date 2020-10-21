
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ISelectedProducts } from 'src/models/selectedProducts.model';
import { IProduct } from 'src/models/product.model';
import { IBag } from 'src/models/bag.model';
import { IOrder } from 'src/models/order.model';
import { ICount } from 'src/models/count.model';


const ORDER_API_URL = 'http://localhost:4000/order';


@Injectable({
  providedIn: 'root'
})

export class OrderService {

  constructor(private http: HttpClient) { }

  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  createOrder(order: IOrder): Observable<IOrder> {
    return this.http.post<IOrder>(ORDER_API_URL, { order },
      {
        headers: this.getHeaders(),
        //  responseType: 'object',
      });
  }
  countOrders(): Observable<ICount> {
    return this.http.get<ICount >(ORDER_API_URL,
      {
        headers: this.getHeaders(),
        //  responseType: 'object',
      });
  }
  countDates(date: Date): Observable<{count: number}> {
    return this.http.get<{ count: number}>(`${ORDER_API_URL}/${date}`,
      {
        headers: this.getHeaders(),
      });
  }

  getOrder(userId: string): Observable<IOrder> {
    return this.http.get<IOrder>(`${ORDER_API_URL}/getOrder/${userId}`,
      {
        headers: this.getHeaders(),
      });
  }
}
