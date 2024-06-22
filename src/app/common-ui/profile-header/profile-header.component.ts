import { Component, input } from '@angular/core';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';

@Component({
  selector: 'app-profile-header',
  standalone: true,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  imports: [ImgUrlPipe],
})
export class ProfileHeaderComponent {
  profile = input<Profile>();

  ngOnInit() {
    console.log('profile', this.profile());
  }
}
