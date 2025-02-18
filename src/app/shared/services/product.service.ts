import { Injectable } from '@angular/core';
import {ProductType} from "../types/product.type";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable()
export class ProductService {


  constructor(private http: HttpClient) { }

  getProducts(): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea')
  }

  searchProducts(searchString: string): Observable<ProductType[]> {
    return this.http.get<ProductType[]>('https://testologia.ru/tea', {params: {search: searchString}})
  }

  getProduct(id: number): Observable<ProductType> {
    return this.http.get<ProductType>(`https://testologia.ru/tea`, {params: {id: id}})
  }

}
