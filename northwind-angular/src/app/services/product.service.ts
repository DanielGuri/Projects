import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private httpClient: HttpClient) { }

  public test(): number {
    return 123;
  }

  public async getAll(): Promise<ProductModel[]> {
    const observable = this.httpClient.get<ProductModel[]>(environment.productsUrl);
    const products = await firstValueFrom(observable);
    return products;
  }

  public async getOne(id: number): Promise<ProductModel> {
    const observable = this.httpClient.get<ProductModel>(`${environment.productsUrl}/${id}`);
    const product = await firstValueFrom(observable);
    return product;
  }

  public async add(product: ProductModel): Promise<ProductModel> {

    const formData = new FormData();
    if(product.name) formData.append('name', product.name)
    if(product.price) formData.append('price', product.price.toString())
    if(product.stock) formData.append('stock', product.stock.toString())
    if(product.image) formData.append('image', product.image)

    const observable = this.httpClient.post<ProductModel>(environment.productsUrl, formData);
    const newProduct = await firstValueFrom(observable);
    return newProduct;
  }
  


}
