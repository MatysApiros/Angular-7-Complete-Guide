import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  loacalId: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

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
    );
  }
}
