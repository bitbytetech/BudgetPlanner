
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { About } from './pages/about/about';
import { ExpenseCategories } from './pages/expense-categories/expense-categories';
import { MonthlyExpensePlan } from './pages/monthly-expense-plan/monthly-expense-plan';
import { MonthlyExpenses } from './pages/monthly-expenses/monthly-expenses';
import { MonthlyIncome } from './pages/monthly-income/monthly-income';
import { NotFound } from './pages/not-found/not-found';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: Home },
    { path: 'about', component: About },
    { path: 'monthly-income', component: MonthlyIncome },
    { path: 'monthly-expense-plan', component: MonthlyExpensePlan },
    { path: 'monthly-expenses', component: MonthlyExpenses },
    { path: 'expense-categories', component: ExpenseCategories },
    { path: 'login', component: Login },
    { path: 'register', component: Register },
    { path: '**', component: NotFound },
];
