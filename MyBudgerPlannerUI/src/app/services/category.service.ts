import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { UserRegistrationModel, RegistrationResponseModel } from '../models/UserRegistrationModel';

import { ApiEndpoints } from '../core/constants/api-endpoints';
@Injectable({ providedIn: 'root' })

export class CategoryService {
  constructor(private http: HttpClient) { }


  getAllCategories(): Observable<any> {
    return this.http.get<any>(ApiEndpoints.Categories.getAllCategories).pipe(
      tap(response => {
        console.log('Fetched categories:', response);
        // Handle the response if needed
      })
    );
  }
}
