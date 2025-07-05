import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/CategoryModel';

@Component({
  selector: 'app-categories-crud',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './categories-crud.html',
  styleUrl: './categories-crud.scss'
})
export class CategoriesCrudComponent {
  categories = signal<CategoryModel[]>([]);
  selectedCategory = signal<CategoryModel | null>(null);
  form: FormGroup;
  isEditMode = signal(false);
  notification = signal<string | null>(null);

  constructor(private categoryService: CategoryService, private fb: FormBuilder) {
    this.form = this.fb.group({
      uniqueId: [0],
      name: ['', Validators.required],
      description: [''],
      allocatedAmount: ['', [Validators.required, Validators.min(0)]],
      parentId: [0],
      isSubCategory: [false]
    });
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log(data);
        this.categories.set(data);
      },
      error: (_error) => { console.log(_error);
         this.notification.set('Failed to load categories'); }
    });
  }

  editCategory(category: CategoryModel) {
    this.form.patchValue(category);
    this.isEditMode.set(true); 
    this.form.patchValue({ isSubCategory: !!category.parentId && category.parentId !== 0 });
    this.form.patchValue(category);  
  }

  clearForm() {
    this.form.reset({ allocatedAmount: 0 });
    this.selectedCategory.set(null);
    this.form.patchValue({uniqueId:0,parentId:0});
    this.isEditMode.set(false);
  }

  submit() {
    if (this.form.invalid) return;
    const category = this.form.value as CategoryModel;
    if (!category.parentId)
      {
        category.parentId = 0;
      }
      this.categoryService.createCategory(category).subscribe({
        next: () => {
          this.notification.set('Category created!');
          this.loadCategories();
          this.clearForm();
        },
        error: () => this.notification.set('Create failed')
      });
    
  }

  deleteCategory(id: number) {
    if (!confirm('Delete this category?')) return;
    this.categoryService.deleteCategory(id).subscribe({
      next: () => {
        this.notification.set('Category deleted!');
        this.loadCategories();
        this.clearForm();
      },
      error: () => this.notification.set('Delete failed')
    });
  }

   get getParentCategories(): CategoryModel[] {
    return this.categories().filter(cat => !cat.parentId || cat.parentId === 0);
  }
}
