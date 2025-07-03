// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor } from './app/interceptor/auth-token.interceptor';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';  // create this file next


bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    provideRouter(routes) // ✅ Required for RouterLink, router-outlet, ActivatedRoute, etc.

  ]
}).catch(err => console.error(err));