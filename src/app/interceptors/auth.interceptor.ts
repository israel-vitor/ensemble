import { HTTP_INTERCEPTORS, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, filter, switchMap, take } from 'rxjs/operators';
import {SessionService} from "../services/session/session.service";
import {AuthService} from "../services/auth/auth.service";
import {Router} from "@angular/router";
export const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  private isRefreshing = false;
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private sessionService: SessionService, private authService: AuthService, private router: Router) {}

  intercept(req: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let request = req;
    const token = this.sessionService.getToken();
    if (token != null && !request.url.includes('auth/refresh')) {
      request = this.addTokenHeader(req, token);
    }
    return next.handle(request).pipe(catchError(error => {
      if (error instanceof HttpErrorResponse && !request.url.includes('auth/login') && error.status === 401) {
        return this.handle401Error(request, next);
      }
      return throwError(error);
    }));
  }

  private handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      this.refreshTokenSubject.next(null);
      const token = this.sessionService.getRefreshToken();
      if (token)
        return this.authService.refreshToken(token).pipe(
          switchMap((response: any) => {
            this.isRefreshing = false;
            this.sessionService.saveToken(response.token);
            this.sessionService.saveRefreshToken(response.refreshToken);
            this.refreshTokenSubject.next(response.token);

            return next.handle(this.addTokenHeader(request, response.token));
          }),
          catchError((err) => {
            this.isRefreshing = false;

            this.router.navigate(['/login'])
            this.sessionService.signOut();
            return throwError(err);
          })
        );
    }
    return this.refreshTokenSubject.pipe(
      filter(token => token !== null),
      take(1),
      switchMap((token) => next.handle(this.addTokenHeader(request, token)))
    );
  }

  private addTokenHeader(request: HttpRequest<any>, token: string) {
    return request.clone({ headers: request.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token) });
  }
}


export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
];
