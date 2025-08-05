import { Home } from './pages/home/home'; 
import { Register } from './pages/register/register';
import { Login } from './pages/login/login'; 
import { MonthlyIncome } from './pages/monthly-income/monthly-income';
import { MonthlyExpensePlan } from './pages/monthly-expense-plan/monthly-expense-plan';
import { MonthlyExpenses } from './pages/monthly-expenses/monthly-expenses';
import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';


export const routes: Routes = [
  { path: '', component:Home ,pathMatch: 'full'},  // Default route
  { path: 'home', component: Home },
  { path: 'register', component: Register  },
  { path: 'login', component: Login },
  { path: 'categories', component:  Categories },
  { path: 'monthly-income', component: MonthlyIncome },
  { path: 'monthly-expense-plan', component: MonthlyExpensePlan },
  { path: 'monthly-expenses', component: MonthlyExpenses },
  { path: '**', redirectTo: 'home' }  // Wildcard route for 404
];