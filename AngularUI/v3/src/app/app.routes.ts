import { Home } from './pages/home/home'; 
import { Register } from './pages/register/register';
import { Login } from './pages/login/login'; 
import { MonthlyIncome } from './pages/monthly-income/monthly-income';
import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';
import { WishlistFormComponent } from './pages/wishlist/wishlist';
import { ExpensesComponent } from './pages/expenses/expenses';
import { Logout } from './pages/logout/logout';


export const routes: Routes = [
  { path: '', component: Login, pathMatch: 'full' },  // Default route
  { path: 'home', component: Home },
  { path: 'register', component: Register  },
  { path: 'login', component: Login },
  { path: 'logout', component: Logout },
  { path: 'categories', component:  Categories },
  {path: 'expenses', component: ExpensesComponent},
  { path: 'wishlist', component: WishlistFormComponent },
  { path: 'income', component: MonthlyIncome },
        

  { path: '**', redirectTo: 'login' }  // Wildcard route for 404
];