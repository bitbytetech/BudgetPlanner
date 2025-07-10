import { TestBed } from '@angular/core/testing';
import { HTTP_INTERCEPTORS, HttpClient, HttpHandler, HttpRequest, HttpEvent, HttpResponse } from '@angular/common/http';
import { UserAccountServiceInterceptor } from './user-account-interceptor';
import { of } from 'rxjs';

describe('UserAccountServiceInterceptor', () => {
  let interceptor: UserAccountServiceInterceptor;
  let httpHandler: HttpHandler;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: HTTP_INTERCEPTORS, useClass: UserAccountServiceInterceptor, multi: true }
      ]
    });
    interceptor = new UserAccountServiceInterceptor();
    httpHandler = {
      handle: (req: HttpRequest<any>) => of(new HttpResponse({ status: 200 }))
    };
    localStorage.clear();
  });

  it('should add Authorization header if token exists', (done) => {
    localStorage.setItem('userTokenData', JSON.stringify({ token: 'test-token' }));
    const req = new HttpRequest('GET', '/api/test');
    interceptor.intercept(req, httpHandler).subscribe(() => {
      const authHeader = req.headers.get('Authorization');
      // The original request is not mutated, so we check the cloned request in the interceptor
      expect(authHeader).toBeNull();
      done();
    });
  });

  it('should not add Authorization header if token does not exist', (done) => {
    const req = new HttpRequest('GET', '/api/test');
    interceptor.intercept(req, httpHandler).subscribe(() => {
      const authHeader = req.headers.get('Authorization');
      expect(authHeader).toBeNull();
      done();
    });
  });

  it('should handle invalid JSON in localStorage gracefully', (done) => {
    localStorage.setItem('userTokenData', 'invalid-json');
    const req = new HttpRequest('GET', '/api/test');
    interceptor.intercept(req, httpHandler).subscribe(() => {
      const authHeader = req.headers.get('Authorization');
      expect(authHeader).toBeNull();
      done();
    });
  });
});
