import { Component, Input } from '@angular/core';
import { Profile } from '../../../data/services/interfaces/profile.interface';
import { ImgUrlPipe } from '../../../helpers/pipes/img-url.pipe';
import { RouterLink } from '@angular/router';
import { SvgIconComponent } from '../../svg-icon/svg-icon.component';

@Component({
  selector: 'app-subscriber-card',
  standalone: true,
  templateUrl: './subscriber-card.component.html',
  styleUrl: './subscriber-card.component.scss',
  imports: [ImgUrlPipe],
})
export class SubscriberCardComponent {
  @Input() profile!: Profile;
}
