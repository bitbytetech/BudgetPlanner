import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { tap } from 'rxjs';

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

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.incomeForm = this.fb.group({
      sourceName: ['', Validators.required],
      incomeAmount: [0, [Validators.required, Validators.min(1)]]
    });
  }




  onSubmit() {
    if (this.incomeForm.valid) {
      var data = this.http.post<any>("https://localhost:7255/api/IncomeSource/CreateOrEdit", this.incomeForm.value).pipe(
        tap(response => {
          console.log(response);
        })
      );
      data.subscribe();
    } else {
      console.log('Form is invalid');
    }
  }


  // SaveIncome(credentials: { loginName: string; password: string }): Observable<LoginResponseModel> {
  //   return this.http.post<LoginResponseModel>(ApiEndpoints.userAccount.login, credentials).pipe(
  //     tap(response => {
  //       if (response?.isLoginSuccess) {
  //         this.setUser(response);
  //       }
  //     })
  //   );
  // }

}



