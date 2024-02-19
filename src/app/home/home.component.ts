import { Component, ViewChild } from '@angular/core';
import { environment } from '../../environments/environment';
import { ProductsService } from '../services/products.service';
import { PaginatorModule, Paginator } from 'primeng/paginator';
import { ButtonModule } from 'primeng/button';
import { ToastModule, Toast } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { ProductComponent } from '../components/product/product.component';
import { EditPopupComponent } from '../components/edit-popup/edit-popup.component';
import { Product, Products } from '../../types';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ProductComponent, PaginatorModule, EditPopupComponent, ButtonModule, ToastModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  providers: [MessageService]
})
export class HomeComponent {
  constructor(private productsService: ProductsService) { }
  // This is like a variables that can be passed to the template
  products: Array<Product> = [];

  // VieChild is like ref in React, it is used to access a specific component which has a ref name prefixed with #.
  @ViewChild("paginator") paginator: Paginator | undefined;
  @ViewChild("toast") toast: Toast | undefined;

  // Pagination props
  totalRecords: number = 0;
  page: number = 0;
  rows: number = 5;
  first: number = 1;
  rowsPerPageOptions: Array<number> = [5, 10, 20]

  // Popup display state
  displayEditPopup = false;
  displayAddPopup = false;

  selectedProduct!: Product

  resetPaginator() {
    this.paginator?.changePage(0);
  }

  
  // Methods for components
  onPageChange(event: any) {
    this.page = event.page;
    this.rows = event.rows;
    this.fetchProducts(event.page, event.rows);
  }

  toggleEditPopup(product: Product) {
    this.selectedProduct = product;
    this.displayEditPopup = true;
  }

  toggleAddPopup() {
    this.displayAddPopup = true;
  }

  toggleDeletePopup(product: Product) {
    this.deleteProduct(product.id);
  }

  onConfirmAdd(product: Product) {
    this.addProduct(product);
    this.displayAddPopup = false;
  }

  onConfirmEdit(product: Product) {
    this.editProduct(product, product.id);
    this.displayEditPopup = false;
  }

  fetchProducts(page: number, perPage: number) {
    this.productsService.getProducts(`${environment.apiUrl}/api/clothes`, { page, perPage }).subscribe({
      next: (products: Products) => { // The next method takes the response data as the first argument.
        this.products = products.items;
        this.totalRecords = products.total
      },
      error: (error) => {
        console.log(error, 'Add Product')
      }
    })
  }

  addProduct(product: Product) {
    this.productsService.addProduct(`${environment.apiUrl}/api/clothes`, product).subscribe({
      next: (_product: Product) => {
        this.fetchProducts(this.page, this.rows);
        this.toast?.messageService.add({ severity: 'success', summary: 'Success', detail: 'Product Added', life: 3000 });
      },
      error: (error) => {
        console.log(error, 'Add Product')
      }
    })
  }

  editProduct(product: Product, id: number) {
    this.productsService.updateProduct(`${environment.apiUrl}/api/clothes/${id}`, product).subscribe({
      next: (_product: Product) => {
        this.fetchProducts(this.page, this.rows);
        this.toast?.messageService.add({ severity: 'success', summary: 'Edited', detail: 'Product Edited', life: 3000 });
      },
      error: (error) => {
        console.log(error, 'Edit Product')
      }
    })
  }

  deleteProduct(id: number) {
    this.productsService.deleteProduct(`${environment.apiUrl}/api/clothes/${id}`).subscribe({
      next: () => {
        this.fetchProducts(this.page, this.rows);
        this.toast?.messageService.add({ severity: "error", summary: 'Deleted', detail: 'Product Deleted', life: 3000 });
      },
      error: (error) => {
        console.log(error, 'Delete Product')
      }

    })
  }

  // Method for whenever the component is rendered/mounted
  ngOnInit() {
    this.fetchProducts(0, this.rows);
  }
}
