import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CategoriesCrudComponent } from './pages/categories-crud/categories-crud';
import { Logout } from './pages/logout/logout';
import { ExpensesComponent } from './pages/expenses/expenses';
import { WishlistFormComponent } from './pages/wishlist/wishlist';
import { MonthlyIncome } from './pages/monthly-income/monthly-income';
  


    export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'categories', component: CategoriesCrudComponent},
    {path: 'expenses', component: ExpensesComponent},
    {path: 'logout', component: Logout},
        { path: 'categories-crud', component: CategoriesCrudComponent },
        { path: 'wishlist', component: WishlistFormComponent },
        { path: 'income', component: MonthlyIncome },
        


    ];
