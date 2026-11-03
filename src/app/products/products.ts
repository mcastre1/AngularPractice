import { Component, inject } from '@angular/core';
import { Product } from '../models/product';
import { ProductService } from '../services/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-products',    // This is the custom html element/block everything in this component will live.
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class ProductsComponent {

  products: Product[] = [];
  selectedProduct: Product | null = null;
  showCreate : boolean = false;
  newProduct: Product = {id:0, name:"", price:0};

  constructor(private productService: ProductService) { }

  ngOnInit() {
    this.loadProducts();
  }

  public showCreateProduct() {
    this.showCreate = !this.showCreate;
  }

  public createProduct(){
    console.log("creating product");
  }

  public loadProducts() {
    this.productService.getProducts()
      .subscribe(data => {
        this.products = data;
      });
  }

  public getProduct(id: number) {
    this.productService.getProduct(id)
      .subscribe(data => {
        console.log(data);
      })
  }

  public onDeleteClick(id: number) {
  }

  public selectProduct(product: Product) {
    this.selectedProduct = { ...product };
  }

  public saveProduct() {
    if (!this.selectedProduct) return;

    console.log(`Saving product ${this.selectedProduct?.id}`);
    this.productService.updateProduct(this.selectedProduct)
    .subscribe({
      next: ()=> {
        this.loadProducts();
      }
    });
  }
}
