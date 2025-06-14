import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Item } from '../models/item';
import { map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BackendService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http
      .get<any[]>('https://neondb-maxkyy72aa-uc.a.run.app', {
        responseType: 'json',
      })
      .pipe(
        map((products) =>
          products.map(
            (prod) =>
              new Item(
                prod.id,
                prod.name,
                prod.grade,
                prod.size,
                prod.release,
                prod.pbandai,
                prod.price,
                prod.thumbnail,
                prod.model
              )
          )
        )
      );
  }

  getSearchProducts(searchTerm: String) {
    return this.http
      .get<Item[]>(
        `https://neondb-maxkyy72aa-uc.a.run.app?search=${searchTerm}`,
        {
          responseType: 'json',
        }
      )
      .pipe(
        map((products) =>
          products.map(
            (prod) =>
              new Item(
                prod.id,
                prod.name,
                prod.grade,
                prod.size,
                prod.release,
                prod.pbandai,
                prod.price,
                prod.thumbnail,
                prod.model
              )
          )
        )
      );
  }

  getProduct(productID: number) {
    return this.http
      .get<Item>(
        `https://neondb-maxkyy72aa-uc.a.run.app?productID=${productID}`,
        {
          responseType: 'json',
        }
      )
      .pipe(
        map(
          (prod) =>
            new Item(
              prod.id,
              prod.name,
              prod.grade,
              prod.size,
              prod.release,
              prod.pbandai,
              prod.price,
              prod.thumbnail,
              prod.model
            )
        )
      );
  }
}
