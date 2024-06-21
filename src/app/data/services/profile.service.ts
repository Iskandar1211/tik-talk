import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Profile } from './interfaces/profile.interface';
import { Pagable } from './interfaces/pageble.interface';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);

  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http.get<Profile>(`${this.baseApiUrl}account/me`);
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList() {
    return this.http.get<Pagable<Profile>>(
      `${this.baseApiUrl}account/subscribers`
    );
  }
}
