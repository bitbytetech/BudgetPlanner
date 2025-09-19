import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'add-income-component',
  imports: [ReactiveFormsModule],
  templateUrl: './add-income-component.html',
  styleUrl: './add-income-component.scss'
})
export class AddIncomeComponent {

  incomeForm = new FormGroup({
    sourceName: new FormControl('', Validators.required),
    incomeAmount: new FormControl(0, [Validators.required, Validators.min(1)])
  });

  constructor(private fb: FormBuilder) {
    this.incomeForm = this.fb.group({
      sourceName: ['', Validators.required],
      incomeAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }

  onSubmit() {
    if (this.incomeForm.valid) {
      const formData = this.incomeForm.value;
      console.log('Form Submitted:', formData);
      // Here you can handle the form submission, e.g., send the data to a server
    } else {
      console.log('Form is invalid');
    }
  }

}



