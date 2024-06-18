import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { TokenResponse } from './auth.interface';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  http = inject(HttpClient);
  baseApiUrl = 'https://icherniakov.ru/yt-course/auth/';

  token: string | null = null;
  refreshToken: string | null = null;

  isAuth() {
    if (!this.token) {
      const token = localStorage.getItem('token');
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
        localStorage.setItem('token', data.access_token);
        localStorage.setItem('refreshToken', data.refresh_token);
      })
    );
  }
}
