import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { catchError, tap, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  router = inject(Router);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  isAuth() {
    if (!this.token) {
      const token = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      this.token = token;
      return !!token;
    }
    return !!this.token;
  }

  onLogin({ username, password }: { username: string; password: string }) {
    const fd = new FormData();
    fd.append('username', username);
    fd.append('password', password);

    return this.http.post<TokenResponse>(`${this.baseApiUrl}token`, fd).pipe(
      tap((data) => {
        this.saveTokens(data);
      })
    );
  }

  refrefAuthToken() {
    return this.http
      .post<TokenResponse>(`${this.baseApiUrl}refresh`, {
        refref_token: this.refreshToken,
      })
      .pipe(
        tap((res) => {
          this.saveTokens(res);
        }),
        catchError((error) => {
          this.logout();
          return throwError(error);
        })
      );
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    this.token = null;
    this.refreshToken = null;
    this.router.navigate(['/login']);
  }

  saveTokens(res: TokenResponse) {
    this.token = res.access_token;
    this.refreshToken = res.refresh_token;

    localStorage.setItem('token', res.access_token);
    localStorage.setItem('refreshToken', res.refresh_token);
  }
}
