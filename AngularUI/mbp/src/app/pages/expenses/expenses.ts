import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ExpenseService } from '../../services/expense.service';
import { ExpenseModel } from '../../models/ExpenseModel';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../models/CategoryModel';

@Component({
  selector: 'app-expenses',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './expenses.html',
  styleUrl: './expenses.scss'
})
export class ExpensesComponent {
  expensesForm: FormGroup;
  notification = signal<string | null>(null);
  categories = signal<CategoryModel[]>([]);
  flatCategories: { id: number, label: string, parentId: number | null }[] = [];
  isLoading = signal(false);
  expenses = signal<ExpenseModel[]>([]);
  isEditMode = signal(false);
  selectedExpenseId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private expenseService: ExpenseService,
    private categoryService: CategoryService
  ) {
    const today = new Date().toISOString().split('T')[0];

    this.expensesForm = this.fb.group({
      uniqueId: [0],
      categoryId: [null, Validators.required],
      title: ['', Validators.required],
      description: [''],
      amount: [0, [Validators.required, Validators.min(1)]],
      expenseDate: [today, Validators.required]
    });

    this.loadCategories();
    this.loadExpenses();
  }

  loadCategories() {
    this.categoryService.getCategories().subscribe({
      next: (data) => {
        console.log('Categories loaded:', data);
        const array = Array.isArray(data) ? data : (data ?? []);
        this.categories.set(array);
        this.flatCategories = this.flattenCategories(array);
        console.log('Flattened Categories:', this.flatCategories);
      },
      error: (_error) => {
        this.notification.set('Failed to load categories');
      }
    });
  }

  flattenCategories(categories: CategoryModel[]): { id: number, label: string, parentId: number | null }[] {
    const result: { id: number, label: string, parentId: number | null }[] = [];
    for (const cat of categories) {
      result.push({ id: cat.uniqueId!, label: cat.name, parentId: null });
      if (cat.subCategories && cat.subCategories.length > 0) {
        for (const sub of cat.subCategories) {
          result.push({ id: sub.uniqueId!, label: sub.name, parentId: cat.uniqueId! });
        }
      }
    }
    return result;
  }

  loadExpenses() {
    this.expenseService.getExpenses().subscribe({
      next: (data) => {
        this.expenses.set(Array.isArray(data) ? data : (data ?? []));
      },
      error: () => {
        this.notification.set('Failed to load expenses');
      }
    });
  }

  submit() {
    if (this.expensesForm.invalid) return;
    this.isLoading.set(true);
    const expense: ExpenseModel = this.expensesForm.value;
    this.expenseService.createOrEditExpense(expense).subscribe({
      next: () => {
        this.notification.set(this.isEditMode() ? 'Expense updated successfully!' : 'Expense saved successfully!');
        this.expensesForm.reset({ amount: 0 });
        this.isLoading.set(false);
        this.isEditMode.set(false);
        this.selectedExpenseId = null;
        this.loadExpenses();
      },
      error: (_error) => {
        this.notification.set('Failed to save expense');
        this.isLoading.set(false);
      }
    });
  }

  editExpense(expense: ExpenseModel) {
    this.expensesForm.patchValue(expense);
    this.isEditMode.set(true);
    this.selectedExpenseId = expense.uniqueId!;
  }

  deleteExpense(id: number) {
    if (!confirm('Delete this expense?')) return;
    this.expenseService.deleteExpense(id).subscribe({
      next: () => {
        this.notification.set('Expense deleted!');
        this.loadExpenses();
        if (this.selectedExpenseId === id) {
          this.clearForm();
        }
      },
      error: () => this.notification.set('Delete failed')
    });
  }

  clearForm() {
  const today = new Date().toISOString().split('T')[0];
  this.expensesForm.reset({ amount: 0, expenseDate: today });
}

getCategoryLabel(categoryId: number): string {
  const found = this.flatCategories.find(c => c.id === categoryId);
  return found ? found.label : '';
}

}
