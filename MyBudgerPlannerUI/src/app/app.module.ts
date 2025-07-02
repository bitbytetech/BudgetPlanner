// app.module.ts
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from  './interceptor/auth-token.interceptor';
import { NgModule } from '@angular/core';
 
@NgModule({
  // ...
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class AppModule { }
