import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { User } from '../user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  loacalId: string;
  registeraed?: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user = new Subject<User>();

  constructor(
    private http: HttpClient,
  ) { }

  signup(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBN9Ul9-5rvwaY8XNMEdabR4tNPbpz-VpM',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap(res => {
        this.handleAuthentication(res.email, res.loacalId, res.idToken, +res.expiresIn);
      })
    );
  }

  login(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBN9Ul9-5rvwaY8XNMEdabR4tNPbpz-VpM',
      {
        email,
        password,
        returnSecureToken: true,
      }
    ).pipe(
      catchError(this.handleError),
      tap(res => {
        this.handleAuthentication(res.email, res.loacalId, res.idToken, +res.expiresIn);
      })
    );
  }

  handleError(errorRes: HttpErrorResponse) {
    let error = 'An unknown error occurred!';
    if (!errorRes.error || !errorRes.error.error) {
      return throwError(error);
    }
    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        error = 'This email exists already';
        break;
      case 'EMAIL_NOT_FOUND':
        error = 'There is no user record corresponding to this identifier';
        break;
      case 'INVALID_PASSWORD':
        error = 'Invalid Password';
        break;
      default:
        break;
    }
    return throwError(error);
  }

  handleAuthentication(email: string, userId: string, token: string, expiresIn: number) {
    const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);
    const user = new User(
      userId,
      email,
      token,
      expirationDate,
    );
    this.user.next(user);
  }
}
