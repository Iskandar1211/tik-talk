import { Component, inject } from '@angular/core';
import { ProfileService } from '../../data/services/profile.service';
import { Profile } from '../../data/services/interfaces/profile.interface';
import { ProfileCardComponent } from "../../common-ui/profile-card/profile-card.component";

@Component({
    selector: 'app-search-page',
    standalone: true,
    templateUrl: './search-page.component.html',
    styleUrl: './search-page.component.scss',
    imports: [ProfileCardComponent]
})
export class SearchPageComponent {
  profileService = inject(ProfileService);
  profiles: Profile[] = [];

  constructor() {
    this.profileService.getTestAccounts().subscribe((profiles) => {
      this.profiles = profiles;
    });
  }
}
