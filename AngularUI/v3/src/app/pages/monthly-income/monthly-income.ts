import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-monthly-income',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './monthly-income.html',
  styleUrls: ['./monthly-income.scss']
})
export class MonthlyIncome {
  incomes: { id: number; source: string; amount: number }[] = [];
  source: string = '';
  amount: number | null = null;
  message: string = '';

  addIncome() {
    if (this.source && this.amount && this.amount > 0) {
      this.incomes.push({
        id: Date.now(),
        source: this.source,
        amount: this.amount
      });

      this.message = 'Income added successfully ✅';

      // Clear inputs
      this.source = '';
      this.amount = null;
    }
  }

  deleteIncome(id: number) {
    this.incomes = this.incomes.filter(income => income.id !== id);
    this.message = 'Income entry deleted 🗑️';
  }
}
