import { Component } from '@angular/core';
import { SvgIconComponent } from '../svg-icon/svg-icon.component';

type MenuItems = {
  label: string;
  icon: string;
  link: string;
};

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss',
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
