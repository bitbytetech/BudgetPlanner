import { Component, signal, Signal, NgModule } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CategoryModel } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';


@Component({
  selector: 'app-category',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss'
})

export class CategoryComponent {

  categoryForm: FormGroup;
  categories = signal<CategoryModel[]>([]);

  constructor(private fb: FormBuilder, private categoryService: CategoryService) {
    this.categoryForm = this.fb.group({
      id: [null],
      categoryName: ['', Validators.required],
      description: [''],
      allocatedAmount: ['', [Validators.required, Validators.min(0)]],
      parentId: [''],
      isSubCategory: [false]
    });
    // Fetch categories from the service
    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        console.log('Fetched categories:', data);
        // Set the categories signal with the fetched data
        // If data is null, set it to an empty array
        if (data == null || data == "undefined") {
          data = [];
        }
        console.log('Setting categories:', data);
        // Ensure categories is set to an empty array if data is null
        console.log('Setting categories to:', data);
        this.categories.set(data);
        console.log('Categories after setting:', this.categories());
        // If data is null, set it to an empty array
        // this.categories.set(data || []); // Ensure categories is set to an empty array if data is null
        // this.categories.set(data || []); // Ensure categories is set to an empty array if data is null
        // this.categories.set(data || []); // Ensure categories is set to an empty array if data is null
        this.categories.set(data || []); // Ensure categories is set to an empty array if data is null
      },
      error: (err) => {
        console.error('Failed to fetch categories', err);
      }
    });

    this.categoryService.getAllCategories().subscribe({
      next: (data) => {
        this.categories.set(data);
      },
      error: (err) => {
        console.error('Failed to fetch categories', err);
      }
    });
    this.loadCategoriesFromLocalStorage();
    // Optionally, you can fetch categories from a service if needed
    // this.fetchCategories();
  }
  // fetchCategories() {
  //   this.categoryService.getAllCategories().subscribe({
  //     next: (response) => {
  //       console.log('Fetched categories:', response);
  //       this.categories.set(response || []);
  //     },
  //     error: (error) => {
  //       console.error('Error fetching categories:', error);
  //     }
  //   });
  // }
  loadCategoriesFromLocalStorage() {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories == "undefined" || storedCategories == null || storedCategories == '')
      return;
    else {
      this.categories.set(JSON.parse(storedCategories));
      console.log('Categories loaded from local storage:', this.categories);
    }
  }

  onSubmit() {
    if (this.categoryForm.valid) {
      const categoryData: CategoryModel = this.categoryForm.value;
      const currentCategories = this.categories(); // Get the current categories from the signal
      const index = this.categories().findIndex(cat => cat.id === categoryData.id);
      if (index > -1)
        currentCategories[index] = categoryData;
      else {
        categoryData.id = this.categories.length + 1; // Simple ID generation logic 
        this.categories.set([...currentCategories, categoryData]); // Add new category
      }
      localStorage.setItem('categories', JSON.stringify(this.categories));      // Save to local storage
      this.categoryForm.reset();      // Reset the form 
    }
  }

  onDelete(categoryId: number) {
    if (confirm(`Are you sure you want to delete this category: ${this.categories().find(cat => cat.id === categoryId)?.categoryName}?`)) {
      const index = this.categories().findIndex(cat => cat.id === categoryId);
      if (index !== -1) {
        this.categories().splice(index, 1);
        localStorage.setItem('categories', JSON.stringify(this.categories));
      }
    }
  }
  editCategory(_category: CategoryModel) {
    this.categoryForm = this.fb.group({
      categoryName: [_category.categoryName, Validators.required],
      description: [_category.description, ''],
      allocatedAmount: [_category.allocatedAmount, [Validators.required, Validators.min(0)]],
      parentId: [_category.parentId || ''],
      isSubCategory: [(_category.parentId ?? 0) > 0],
      id: [_category.id]
    });
  }
  onReset() {
    this.categoryForm.reset();
    console.log('Form has been reset.');
  }
  onSubmitCategory() {
    if (this.categoryForm.valid) {
      // Here you can handle the form submission logic
      // For example, you can log the form data or send it to a server  
      // Log the form data
    }
  }
  get topLevelCategories(): CategoryModel[] {
    return this.categories().filter(cat => !cat.parentId || cat.parentId === 0);
  }
}
