import { Routes } from '@angular/router';

import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { CategoryComponent } from './pages/category/category.component';
import { IncomeComponent } from './pages/income/income.component';
import { ExpensePlanComponent } from './pages/expense-plan/expense-plan.component';
import { ExpenseComponent } from './pages/expense/expense.component';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'category', component: CategoryComponent },
  { path: 'income', component: IncomeComponent },
  { path: 'expense-plan', component: ExpensePlanComponent },
  { path: 'expense', component: ExpenseComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
