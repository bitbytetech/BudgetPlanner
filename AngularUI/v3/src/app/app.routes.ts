import { Register } from './pages/register/register';
import { Login } from './pages/login/login';
import { MonthlyIncome } from './pages/monthly-income/monthly-income';
import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';
import { WishlistFormComponent } from './pages/wishlist/wishlist';
import { ExpensesComponent } from './pages/expenses/expenses';
import { Logout } from './pages/logout/logout';
import { Dashboard } from './pages/dashboard/dashboard';
import { Reports } from './pages/reports/reports';
import { Goals } from './pages/goals/goals';

export const routes: Routes = [
  { path: '', component: Login, pathMatch: 'full' },  // Default route
  { path: 'home', component: Dashboard },
  { path: 'dashboard', component: Dashboard },
  { path: 'register', component: Register },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'categories', component: Categories },
  { path: 'expenses', component: ExpensesComponent },
  { path: 'wishlist', component: WishlistFormComponent },
  { path: 'income', component: MonthlyIncome },
  { path: 'reports', component: Reports },
  { path: 'goals', component: Goals },


  { path: '**', redirectTo: 'login' }  // Wildcard route for 404
];