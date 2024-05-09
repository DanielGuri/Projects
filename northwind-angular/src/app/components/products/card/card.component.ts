import { Component, Input } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ CurrencyPipe ],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css',
})
export class CardComponent {

    @Input() public product?: ProductModel;
}
