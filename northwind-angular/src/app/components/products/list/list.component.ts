import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ProductService } from '../../../services/product.service';
import { ProductModel } from '../../../models/product.model';
import { CurrencyPipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [ 
    NgIf,
    NgFor,
    CurrencyPipe,
    RouterLink,
    CardComponent
  ],
  templateUrl: './list.component.html',
  styleUrl: './list.component.css',
})
export class ListComponent implements OnInit{

    public products?: ProductModel[];

    public constructor (
        private title: Title,
        private productService: ProductService
    ) {}

    public async ngOnInit() {
        this.title.setTitle('NW Products List');
        console.log(this.productService.test())
        this.products = await this.productService.getAll()
    }

    // public formatPrice(price: number | undefined): string {
    //     return `$${price?.toFixed(2)}`
    // }


}
