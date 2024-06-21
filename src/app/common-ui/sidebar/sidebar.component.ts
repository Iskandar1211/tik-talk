import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';
import { SubscriberCardComponent } from './subscriber-card/subscriber-card.component';
import { RouterLink } from '@angular/router';

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
  imports: [SvgIconComponent, SubscriberCardComponent, RouterLink],
})
export class SidebarComponent {
  menuItems: MenuItems[] = [
    {
      label: 'Моя страница',
      icon: 'home',
      link: '',
    },
    {
      label: 'Чаты',
      icon: 'chat',
      link: '/chat',
    },
    {
      label: 'Поиск',
      icon: 'search',
      link: '/search',
    },
  ];
}
