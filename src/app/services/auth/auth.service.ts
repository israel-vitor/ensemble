import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../../interfaces/user';
import { Observable } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import {SessionService} from "../session/session.service";
import {CommonService} from "../common/common.service";
import {TOKEN_HEADER_KEY} from "../../interceptors/auth.interceptor";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = `${environment.apiUrl}/auth`
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(
    private http: HttpClient,
    private sessionService: SessionService,
    private commonService: CommonService
    ) { }

  login(user: User): Promise<any> {
    const { email, password } = user
    return this.http
      .post<User>(this.BASE_URL + '/login', JSON.stringify({ email, password }), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  signUp(user: User): Promise<any> {
    return this.http
      .post<User>(this.BASE_URL + '/signup', JSON.stringify(user), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  activate(token: string): Promise<any> {
    return this.http
      .patch<any>(this.BASE_URL + '/activate/' + token, {}, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  refreshToken(refreshToken: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        [TOKEN_HEADER_KEY]: 'Bearer '+ refreshToken
      }),
    };
    return this.http
      .post<any>(this.BASE_URL + '/refresh',{}, httpOptions )
      .pipe(retry(1), catchError(this.commonService.handleError));
  }

  getUserInfo(): Promise<any> {
    return this.http
      .get<any>(`${environment.apiUrl}/users/logged`, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  getInfo(): Promise<any> {
    return this.http
      .get<any>(`${this.BASE_URL}/info`, this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  updateUser(user: User): Promise<any> {
    return this.http
      .patch<any>(`${environment.apiUrl}/users/update`, JSON.stringify(user), this.httpOptions)
      .pipe(retry(1), catchError(this.commonService.handleError)).toPromise();
  }

  public isAuthenticated() {
    const token = this.sessionService.getToken();
    return token !== null;
  }

  public logout() {
    this.sessionService.signOut();
  }
}
