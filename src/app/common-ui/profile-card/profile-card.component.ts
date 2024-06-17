import { Component, Input } from '@angular/core';
import { Profile } from '../../data/services/interfaces/profile.interface';

@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [],
  templateUrl: './profile-card.component.html',
  styleUrl: './profile-card.component.scss',
})
export class ProfileCardComponent {
  imgUrl = 'https://icherniakov.ru/yt-course/';
  @Input() profile?: Profile;
}
