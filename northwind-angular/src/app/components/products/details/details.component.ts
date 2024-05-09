import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { CurrencyPipe, NgIf } from '@angular/common';
import { ProductService } from '../../../services/product.service';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [ CurrencyPipe, NgIf, RouterLink ],
  templateUrl: './details.component.html',
  styleUrl: './details.component.css'
})
export class DetailsComponent implements OnInit {
    public product?: ProductModel;

    public constructor (
        private productService: ProductService,
        private activatedRoute: ActivatedRoute
    ) {}

    public async ngOnInit(): Promise<void> {
        const id = this.activatedRoute.snapshot.paramMap.get('id');
        if (id) {
            this.product = await this.productService.getOne(+id);
        }
    }
}
