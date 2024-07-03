import {Component, inject} from '@angular/core';
import {SvgIconComponent} from '../svg-icon/svg-icon.component';
import {SubscriberCardComponent} from './subscriber-card/subscriber-card.component';
import {Router, RouterLink, RouterLinkActive} from '@angular/router';
import {ProfileService} from '../../data/services/profile.service';
import {AsyncPipe, JsonPipe} from '@angular/common';
import { firstValueFrom} from 'rxjs';
import {ImgUrlPipe} from '../../helpers/pipes/img-url.pipe';

type MenuItems = {
  label: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
  imports: [
    SvgIconComponent,
    SubscriberCardComponent,
    RouterLink,
    AsyncPipe,
    JsonPipe,
    ImgUrlPipe,
    RouterLinkActive,
  ],
})
export class SidebarComponent {
  profileService = inject(ProfileService);
  subscribers$ = this.profileService.getSubscribersShortList();
  me = this.profileService.me;
  router = inject(Router)

  menuItems: MenuItems[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '/profile',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/chats',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];

  ngOnInit() {
    firstValueFrom(this.profileService.getMe());
  }
}
