import { MonthlyIncomeService } from '../../../../services/monthly-income-service';
import { Component, Input, signal, effect } from '@angular/core';
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

  @Input() editableIncomeSources = signal<IncomeSourceModel | null>(null);
  @Input({ required: true }) incomeSources = signal<IncomeSourceModel[]>([]);

  incomeForm = new FormGroup({
    sourceName: new FormControl(this.editableIncomeSources()?.sourceName, Validators.required),
    incomeAmount: new FormControl(this.editableIncomeSources()?.incomeAmount, [Validators.required, Validators.min(1)]),
    uniqueId: new FormControl(this.editableIncomeSources()?.uniqueId),
    userId: new FormControl(this.editableIncomeSources()?.userId)
  });
  constructor(private fb: FormBuilder, private monthlyIncomeService: MonthlyIncomeService) {
    effect(() => {
      const income = this.editableIncomeSources();
      if (income) {
        this.incomeForm.patchValue({
          sourceName: income.sourceName,
          incomeAmount: income.incomeAmount,
          uniqueId: income?.uniqueId,
          userId: income?.userId
        });
      } else {
        this.incomeForm.reset();
      }
    });
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const formValue = this.incomeForm.value;
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
          this.incomeSources.set([response, ...this.incomeSources()]);
          this.incomeForm.reset();
          this.editableIncomeSources.set(null);
        })
      ).subscribe();
    } else {
      console.log('Form is invalid');
    }
  }




}



