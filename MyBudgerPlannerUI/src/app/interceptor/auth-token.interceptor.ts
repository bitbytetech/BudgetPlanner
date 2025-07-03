
// auth.interceptor.ts
import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthTokenService } from '../services/auth-token.service'; // Import your AuthTokenService if needed

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthTokenService);
  const token = authService.getToken();
  alert('Token: ' + token); // ✅ Debugging line to check the token

  if (token) {
    const cloned = req.clone({
      setHeaders: { Authorization: `Bearer ${token}` }
    });
    return next(cloned);
  }

  return next(req);
};










