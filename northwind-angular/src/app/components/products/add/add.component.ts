import { Component } from '@angular/core';
import { ProductModel } from '../../../models/product.model';
import { FormsModule } from '@angular/forms';
import { ProductService } from '../../../services/product.service';
import { Router } from '@angular/router';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [ FormsModule, NgIf ],
  templateUrl: './add.component.html',
  styleUrl: './add.component.css'
})
export class AddComponent {
    public constructor (
        private productService: ProductService, 
        private router: Router
    ) {}

    public product = new ProductModel();
    
    public async submitForm(imageInput: HTMLInputElement) {
        // console.log(imageInput.files)
        // console.log(this.product);
        if (imageInput.files) {
            this.product.image = imageInput.files[0];
        }
        console.log(this.product)
        const newProduct = await this.productService.add(this.product);
        alert(`added a new product with id ${newProduct.id}`);
        this.router.navigateByUrl('/products');
    }
}
