import { Component } from '@angular/core';

@Component({
  selector: 'app-monthly-income',
  imports: [],
  templateUrl: './monthly-income.html',
  styleUrl: './monthly-income.scss'
})


 export class MonthlyIncome {
  incomes: any[] = []; // Add this if not already present

  deleteIncome(id: number) {
    this.incomes = this.incomes.filter(income => income.id !== id);
  }
}
