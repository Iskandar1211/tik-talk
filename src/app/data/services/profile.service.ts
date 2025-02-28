import {HttpClient} from '@angular/common/http';
import {Injectable, inject, signal} from '@angular/core';
import {Profile} from './interfaces/profile.interface';
import {Pagable} from './interfaces/pageble.interface';
import {map, tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  http = inject(HttpClient);
  me = signal<Profile | null>(null);
  baseApiUrl = 'https://icherniakov.ru/yt-course/';

  getTestAccounts() {
    return this.http.get<Profile[]>(`${this.baseApiUrl}account/test_accounts`);
  }

  getMe() {
    return this.http
      .get<Profile>(`${this.baseApiUrl}account/me`)
      .pipe(tap((res) => this.me.set(res)));
  }

  getAccount(id: string) {
    return this.http.get<Profile>(`${this.baseApiUrl}account/${id}`);
  }

  getSubscribersShortList(subsAmount: number = 3) {
    return this.http
      .get<Pagable<Profile>>(
        `${this.baseApiUrl}account/subscribers/?page=1&size=50`
      )
      .pipe(map((res) => res.items.slice(0, subsAmount)));
  }

  pathProfile(profile: Partial<Profile>) {
    return this.http.patch(`${this.baseApiUrl}account/me`, profile)
  }

  uploadAvatar(file: File | null) {
    const formData = new FormData();
    formData.append('image', file!);
    return this.http.post(`${this.baseApiUrl}account/upload_image`,formData)
  }
}
