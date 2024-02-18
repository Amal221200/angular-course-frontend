import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, FormsModule, RatingModule, ButtonModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  @Input() display: boolean = true;
  @Input() header!: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<void>();
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() product!: Product;

  ngOnInit() {
    this.product = {
      id: 0,
      name: "",
      image: "",
      price: "",
      rating: 0
    }
  }
  
  onConfrim() {
    this.confirm.emit(this.product);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
