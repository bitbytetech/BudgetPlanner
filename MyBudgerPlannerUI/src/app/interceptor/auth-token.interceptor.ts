// auth.interceptor.ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs'; 
import { AuthTokenService } from '../services/auth-token.service'; // Import your AuthTokenService if needed

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authTokenService: AuthTokenService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.authTokenService.getToken();

    if (token) {
      const cloned = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`  // ✅ Add token to headers
        }
      });
      return next.handle(cloned);
    }

    return next.handle(req);
  }
}
