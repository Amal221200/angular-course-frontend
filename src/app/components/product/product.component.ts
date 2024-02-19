import { Component, Input, EventEmitter, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RatingModule } from 'primeng/rating';
import { ButtonModule, Button } from 'primeng/button';
import { ToastModule } from "primeng/toast";
import { ConfirmPopupModule } from "primeng/confirmpopup";
import { ConfirmationService } from "primeng/api"
import { Product } from '../../../types';
import { TruncatePipe } from '../../pipes/truncate.pipe';
import { PricePipe } from '../../pipes/price.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RatingModule, FormsModule, ButtonModule, ToastModule, ConfirmPopupModule, TruncatePipe, PricePipe],
  providers: [ConfirmationService],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss'
})
export class ProductComponent {

  constructor(private confirmationService: ConfirmationService) {

  }
  // This is how component accepts a prop from a parent component.
  @Input() product!: Product;
  @Output() edit: EventEmitter<Product> = new EventEmitter<Product>();
  @Output() delete: EventEmitter<Product> = new EventEmitter<Product>();

  @ViewChild("deleteButton") deleteButton: Button | undefined;

  editProduct() {
    this.edit.emit(this.product);
  }

  confirmDelete() {
    this.confirmationService.confirm({
      message: `Are you sure you want to delete ${this.product.name}?`,
      accept: () => {
        this.deleteProduct()
      },
      target: this.deleteButton?.el.nativeElement
      })
    }

  deleteProduct() {
    this.delete.emit(this.product)
  }
}
