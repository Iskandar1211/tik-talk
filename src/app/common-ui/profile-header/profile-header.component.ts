import {Component, Input, input} from '@angular/core';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ImgUrlPipe } from '../../helpers/pipes/img-url.pipe';
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-profile-header',
  standalone: true,
  templateUrl: './profile-header.component.html',
  styleUrl: './profile-header.component.scss',
  imports: [ImgUrlPipe, NgClass],
})
export class ProfileHeaderComponent {
  profile = input<Profile>();
  @Input() headerType: "profile" | 'profile-settings' = 'profile-settings'

  ngOnInit() {

  }
}
