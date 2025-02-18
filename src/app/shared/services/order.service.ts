import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {ProductOrderType} from "../types/product.type";

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  productId: string = '';
  productTitle: string = '';

  constructor(private http: HttpClient) { }

  sendOrder(product: ProductOrderType) {
    return this.http.post<{success: number, message?: string}>(`https://testologia.ru/order-tea`, product)
  }

}
