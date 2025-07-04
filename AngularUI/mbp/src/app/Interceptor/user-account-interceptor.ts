import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class UserAccoutServiceInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Get token from localStorage
    const tokenData = localStorage.getItem('userTokenData');
    let token: string | null = null;
    if (tokenData) {
      try {
        const parsed = JSON.parse(tokenData);
        token = parsed?.token || parsed?.accessToken || parsed;
      } catch {
        token = tokenData;
      }
    }

    // Clone the request and set the Authorization header if token exists
    if (token) {
      const authReq = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq);
    }
    return next.handle(req);
  }
}
