import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { WishlistService } from '../../services/wishlist.service';

@Component({
  selector: 'app-wishlist-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './wishlist.html',   // ✅ fixed template URL
  styleUrl: './wishlist.scss',      // ✅ consistent SCSS filename
  providers: [WishlistService]
})
export class WishlistFormComponent {
  form: FormGroup;
  notification = signal<string | null>(null);
  isLoading = signal(false);
  isSuccess = signal(false);
  constructor(private fb: FormBuilder,
    private wishlistService: WishlistService
   ) {
    this.form = this.fb.group({
      uniqueId: [0],
      item: ['', Validators.required],
      amount: [0, Validators.required],
      description: [''],});
  }

submit() {
  if (this.form.invalid) return;

  this.isLoading.set(true);
  this.notification.set(null);

  const wishlistData = this.form.value;
  console.log('Submitting:', wishlistData);

  this.wishlistService.saveWishListItem(wishlistData).subscribe({
    next: () => {
      this.isLoading.set(false);
      this.notification.set('Wish item saved successfully!');
      this.isSuccess.set(true);

      setTimeout(() => {
        this.form.reset();
        // optionally navigate
        // this.router.navigate(['/wishlist-list']);
      }, 1000);
    },
    error: () => {
      this.isLoading.set(false);
      this.notification.set('Something went wrong. Please try again.');
      this.isSuccess.set(false);
    }
  });
}

}
