import { MonthlyIncomeService } from '../../../../services/monthly-income-service';
import { Component, signal } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { single, tap } from 'rxjs';
import { IncomeSourceModel } from '../../../../models/IncomeSourceModel';

@Component({
  selector: 'add-income-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-income-component.html',
  styleUrl: './add-income-component.scss'
})
export class AddIncomeComponent {

  editableIncomeSources = signal<IncomeSourceModel | null>(null);
  incomeForm = new FormGroup({
    sourceName: new FormControl('', Validators.required),
    incomeAmount: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private fb: FormBuilder, private monthlyIncomeService: MonthlyIncomeService) { }





  onSubmit() {
    if (this.incomeForm.valid) {
      const formValue = this.incomeForm.value;
      console.log('Form Submitted!', formValue);
      // Build IncomeSourceModel cleanly
      const newIncome: IncomeSourceModel = {
        uniqueId: this.editableIncomeSources()?.uniqueId ?? 0, // 0 means new
        userId: this.editableIncomeSources()?.userId ?? 1,     // put current userId here
        sourceName: formValue.sourceName!,
        incomeAmount: formValue.incomeAmount!,
        createdDate: this.editableIncomeSources()?.createdDate ?? new Date(),
        lastUpdatedDate: new Date(),
      };

      this.monthlyIncomeService.addIncomeSource(newIncome).pipe(
        tap(response => {
          console.log('Income added:', response);
          //         this.editIncomeSources.set(newIncome);
        })
      ).subscribe();
    } else {
      console.log('Form is invalid');
    }
  }




}



