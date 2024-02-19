import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { Product } from '../../../types';

@Component({
  selector: 'app-edit-popup',
  standalone: true,
  imports: [DialogModule, RatingModule, ButtonModule, ReactiveFormsModule],
  templateUrl: './edit-popup.component.html',
  styleUrl: './edit-popup.component.scss'
})
export class EditPopupComponent {
  constructor(private formBuilder: FormBuilder) { }

  @Input() display: boolean = true;
  @Input() header!: string;
  @Output() confirm: EventEmitter<any> = new EventEmitter<Product>();
  @Output() cancel: EventEmitter<any> = new EventEmitter<void>();
  @Output() displayChange = new EventEmitter<boolean>();

  @Input() product: Product = {
    id: 0,
    name: "",
    image: "",
    price: "",
    rating: 0
  };

  specialCharacterValidator(): ValidatorFn {
    return (control) => {
      const hasSpecialCharacters = /[!@#$%^&*()_+-={}\\\[\]|:";'<>,./?`~]+/.test(control.value)
      return hasSpecialCharacters ? { hasSpecialCharacters } : null
    }
  }

  priceValidator(): ValidatorFn {
    return (control) => {
      const nonNumericCharacters = !(/^[\d.]+$/.test(control.value))
      return nonNumericCharacters ? { nonNumericCharacters } : null
    }
  }

  imageValidator(): ValidatorFn {
    return (control) => {

      return control.value === '' ? null : { notEmmpy: true }
    }
  }

  productForm = this.formBuilder.group({
    name: ["", [Validators.required, this.specialCharacterValidator()]],
    image: [""],
    price: ["", [Validators.required, this.priceValidator()]],
    rating: [0]
  })

  ngOnChanges() {
    this.productForm.patchValue(this.product);
  }

  onConfrim() {
    const newProduct = {
      id: this.product.id || 0,
      name: this.productForm.value.name || '',
      image: this.productForm.value.image || '',
      price: this.productForm.value.price || '',
      rating: this.productForm.value.rating || 0,
    };

    this.confirm.emit(newProduct);
    this.display = false;
    this.displayChange.emit(this.display);
  }

  onCancel() {
    this.display = false;
    this.displayChange.emit(this.display);
  }

}
