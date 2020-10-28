import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IProduct } from '../../models/product.model';
import { ICount } from '../../models/count.model';
import { map } from 'rxjs/operators';
import { ICategory } from '../../models/category.model';

const PRODUCTS_API_URL = 'http://localhost:4000/products';
const UPLOAD_API_URL = 'http://localhost:4000/upload';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }


  private getHeaders() {
    const token = localStorage.getItem('token');
    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(PRODUCTS_API_URL , {
      headers: this.getHeaders(),
    });
  }

  createProduct(details: Omit<IProduct, '_id' >): Observable<IProduct> {
    return this.http.post<{ product: IProduct }>(PRODUCTS_API_URL , details,
      {
        headers: this.getHeaders(),
      }).pipe(map(({ product }) => product));
  }
  
  deleteProduct(productId: string): Observable<string> {
    return this.http.delete(`${PRODUCTS_API_URL}/${productId}`,
      {
        headers: this.getHeaders(),
        responseType: 'text',
      });
  }

  editProduct(productId: string,update): Observable<IProduct> {
    return this.http.put<IProduct>(`${PRODUCTS_API_URL}/${productId}`, { update },
    {
      headers: this.getHeaders(),
    });
  }
  getProductsByCategory(categoryName): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${PRODUCTS_API_URL}/category/${categoryName}`,  {
      headers: this.getHeaders(),
    });
  }

  getProductByName(productName): Observable<IProduct> {
    return this.http.get<IProduct>(`${PRODUCTS_API_URL}/${productName}` , {
      headers: this.getHeaders(),
    });
  }

  getProductsCount(): Observable<ICount> {
    return this.http.get<ICount>(`${PRODUCTS_API_URL}/count` , {
      headers: this.getHeaders(),
    });
  }

  getImage(image: string): Observable<Blob> {
    return this.http.get(`${UPLOAD_API_URL}/${image}`, {responseType: 'blob'});
  }
  
  uploadImage(image: File): Observable<{ uploadedFile: { filename: string } }> {
    const formData = new FormData();
    formData.append('uploadedImage', image);
    formData.append('agentId', '007');
    return this.http.post<{ uploadedFile: { filename: string } }>(UPLOAD_API_URL, formData, {
      headers: this.getHeaders(),
    });
  }
  getCategories(): Observable<ICategory[]> {
    return this.http.get<ICategory[]>(`${PRODUCTS_API_URL}/category`,  {
      headers: this.getHeaders(),
    });
  }

}