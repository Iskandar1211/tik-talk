import { Component, Input } from '@angular/core';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ImgUrlPipe } from "../../helpers/pipes/img-url.pipe";

@Component({
    selector: 'app-profile-card',
    standalone: true,
    templateUrl: './profile-card.component.html',
    styleUrl: './profile-card.component.scss',
    imports: [ImgUrlPipe]
})
export class ProfileCardComponent {
  @Input() profile?: Profile;
}
