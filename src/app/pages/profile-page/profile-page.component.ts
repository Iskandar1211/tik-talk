import {AsyncPipe, NgStyle} from '@angular/common';
import { Component, Signal, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { ProfileHeaderComponent } from '../../common-ui/profile-header/profile-header.component';
import { ProfileService } from '../../data/services/profile.service';
import { toObservable } from '../../helpers/toObservable';
import { CusotomInputComponent } from "../../common-ui/cusotom-input/cusotom-input.component";

@Component({
    selector: 'app-profile-page',
    standalone: true,
    templateUrl: './profile-page.component.html',
    styleUrl: './profile-page.component.scss',
  imports: [ProfileHeaderComponent, AsyncPipe, CusotomInputComponent, NgStyle]
})
export class ProfilePageComponent {
  profileService = inject(ProfileService);
  route = inject(ActivatedRoute);
  me$ = toObservable(this.profileService.me);
  stacks = ['JS', 'CSS', 'React', 'Next JS', 'Angular'];

  profile$ = this.route.params.pipe(
    switchMap(({ id }) => {
      if (id === 'me') return this.me$;
      return this.profileService.getAccount(id);
    })
  );
}
