import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-wishlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wishlist.html',   // ✅ fixed template URL
  styleUrl: './wishlist.scss'       // ✅ consistent SCSS filename
})
export class WishlistFormComponent {
  form: FormGroup;
  notification = signal<string | null>(null);

  constructor(private fb: FormBuilder) {
    this.form = this.fb.group({
      uniqueId: [0],
      item: ['', Validators.required],
      url: [''],
      purpose: [''],
    });
  }

  submit() {
    if (this.form.invalid) return;

    const wishlistData = this.form.value;
    console.log('Submitting:', wishlistData);

    // TODO: Call WishlistService to POST this to API

    this.notification.set('Wish item saved!');
    this.form.reset();
  }
}
