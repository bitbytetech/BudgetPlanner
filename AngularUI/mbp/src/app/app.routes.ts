import { Routes } from '@angular/router';
import { Categories } from './pages/categories/categories';
import { Home } from './pages/home/home';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { CategoriesCrudComponent } from './pages/categories-crud/categories-crud';

	export const routes: Routes = [
    {path: '', component: Home},
    {path: 'home', component: Home},
    {path: 'login', component: Login},
    {path: 'register', component: Register},
    {path: 'categories', component: Categories},
    {path: 'categories-crud', component: CategoriesCrudComponent}
	];
