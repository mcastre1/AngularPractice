import { Component } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-products',    // This is the custom html element/block everything in this component will live.
  standalone: true,
  imports: [CommonModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {

  products: Product[] = [];
  selectedProduct: Product | null = null;

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });

    this.getProduct(2);
  }

  public getProduct(id:number){
    this.productService.getProduct(id)
    .subscribe(data => {
      console.log(data);
    })
  }

  public onDeleteClick(id:number) {
    console.log(id);
  }

  public selectProduct(product:object){
    console.log(product);
  }
}
