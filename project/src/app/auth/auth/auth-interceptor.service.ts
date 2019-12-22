import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { take, exhaustMap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private service: AuthService,
  ) { }

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.service.user.pipe(
      take(1),
      exhaustMap(res => {

        if (!res) {
          return next.handle(req);
        }

        const modifiedReq = req.clone({
          params: new HttpParams().set('auth', res.token)
        });
        return next.handle(modifiedReq);
      })
    );
  }
}
