import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryModel } from '../models/CategoryModel';
import { ApiEndpoints } from '../core/constants/api-endpoints';
    

@Injectable({  providedIn: 'root'})

export class CategoryService {
  private apiUrl = ApiEndpoints.Categories.getAllCategories;

  constructor(private http: HttpClient) {}

  getCategories(): Observable<CategoryModel[]> {
    return this.http.get<CategoryModel[]>(ApiEndpoints.Categories.getAllCategories);
  }

  getCategory(id: number): Observable<CategoryModel> {
    return this.http.get<CategoryModel>(ApiEndpoints.Categories.getCategoriesById(id));
  }

  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.http.post<CategoryModel>(ApiEndpoints.Categories.SaveCategories, category);
  }

  updateCategory(id: number, category: CategoryModel): Observable<CategoryModel> {
    return this.http.put<CategoryModel>(`${this.apiUrl}/${id}`, category);
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
